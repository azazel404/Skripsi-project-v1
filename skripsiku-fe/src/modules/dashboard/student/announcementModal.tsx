import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AnnouncementAPI from "~/src/api/AnnouncementAPI";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { openErrorToast } from "../../../actions";
import Helpers from "../../../helpers";
import { useDispatch } from "react-redux"

interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any
}


const AbstractSubmissionModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal } = props;
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({})
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        if (detail) {
            setIsFetching(true);
            AnnouncementAPI.getById(detail).then((res: any) => {
                let initial = {
                    ...res.data,
                }
                setInitialValues(initial);
            })
                .catch(err => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsFetching(false);
                })
        }
    }, [detail])




    const getAttachment = initialValues && initialValues.attachment ? initialValues.attachment.file_name : "";

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{`${initialValues.title}`}</Typography>
                            {initialValues && <Typography style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontStyle: 'italic' }}>Dibuat pada tanggal {`${Helpers.changeDateFormat(initialValues.created_at)}`}</Typography>}
                        </div>
                        <div onClick={() => handleClose()} style={{ cursor: 'pointer' }}>
                            <CloseIcon />
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    {initialValues && initialValues.attachment ? <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                        rel="noopener noreferrer">
                        <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                        <Typography style={{ fontSize: '16px', fontWeight: '600' }} color="primary">{`${initialValues && initialValues.attachment.document}`}</Typography>
                    </a> : null}

                    {initialValues && <div style={{ marginTop: '18px' }}>{initialValues.description}</div>}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AbstractSubmissionModal;