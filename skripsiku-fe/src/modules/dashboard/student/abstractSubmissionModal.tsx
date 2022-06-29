import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Helpers from "../../../helpers";
import UploadAPI from "../../../api/UploadAPI";
import { openErrorToast } from "../../../actions";
import { useDispatch } from "react-redux";

interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any
}

interface IFormInputs {
    title: string;
    sequence: string;
    file_name: string;
}

const AbstractSubmissionModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal } = props;
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({})
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [file, setFile] = useState(null)

    const schema = yup.object({
        title: yup.string().required("Judul wajib diisi"),
        // name: yup.string().required("Nama wajib diisi"),

    })

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    });

    useEffect(() => {
        setInitialValues(detail);
        reset(detail)
    }, [detail, reset])


    const uploadAbstract = (event: any) => {
        event.preventDefault();
        setLoadingUpload(true)
        var formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadAPI.attachDoc(formData).then(res => {
            setFile(res?.data.file_name);
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setLoadingUpload(false);
            })
    }


    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        let payload = {
            ...data,
            file_name: file
        }
        onSubmitModal(payload);
    };


    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Pengajuan Judul T.A
                </DialogTitle>
                <DialogContent>
                    <span>Judul</span>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                error={!!errors.title}
                                helperText={errors.title ? errors.title?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    {/* <span>Nama</span>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    /> */}
                    <div style={{ marginBottom: '6px' }}>Upload Proposal</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="contained-button-file">
                            <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={uploadAbstract} />
                            <Button disabled={loadingUpload} size="small" variant="contained" component="span" >
                                Upload File
                            </Button>
                        </label>
                        {file && <span style={{ marginLeft: '12px' }}>{file.length > 25 ? file.substring(0, 25) + "..." : file}</span>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={handleClose}>Batal</Button>
                    <Button variant="contained" size="small" onClick={handleSubmit(onSubmit)} autoFocus>
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AbstractSubmissionModal;