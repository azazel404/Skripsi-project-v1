import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Paper, Tabs, Tab, Box, Avatar } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import ERepositoryAPI from '~/src/api/ERepositoryAPI';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EmptyState from "~/src/components/emptyState";
import { Loader } from "~/src/components/loader";
import Helpers from '~/src/helpers';

const HistoryModal = (props: any) => {
    const { open, handleClose, historyApprover, isLoading } = props;

    const renderStatusInString = (status: number) => {
        if (status === 1) {
            return (
                <div style={{ display: 'flex' }}>
                    <Typography style={{ fontSize: '12px', marginRight: '4px' }}>Status pengajuan proposal judul TA diubah menjadi</Typography>
                    <Typography style={{ fontSize: '12px', fontWeight: 'bold' }} color="primary">DITERIMA.</Typography>
                </div>
            )
        }
        else if (status === 2) {
            return (
                <div style={{ display: 'flex' }}>
                    <Typography style={{ fontSize: '12px', marginRight: '4px' }}>Status diubah menjadi</Typography>
                    <Typography style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFB020' }}>DIREVISI.</Typography>
                </div>
            )
        }
        else if (status === 3) {
            return (
                <div style={{ display: 'flex' }}>
                    <Typography style={{ fontSize: '12px', marginRight: '4px' }}>Status diubah menjadi</Typography>
                    <Typography style={{ fontSize: '12px', fontWeight: 'bold', color: '#D14242' }}>DITOLAK.</Typography>
                </div>
            )
        }
    }
    return (
        <div>
            <Dialog

                maxWidth={"md"}
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '40px' }}>
                    Riwayat Aksi
                </DialogTitle>
                <DialogContent sx={{ minHeight: '360px', paddingLeft: '40px', paddingRight: '40px' }}>
                    {isLoading ?
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Loader />
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {historyApprover.length > 0 ?
                                <>
                                    {historyApprover.map((item, index) => {
                                        let profileImg = item && item.lecturer && item.lecturer.profile_picture ? item.lecturer.profile_picture.file_name : "";
                                        return (
                                            <div style={{ marginBottom: '20px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                                    {renderStatusInString(item.status)}
                                                    <Typography style={{ fontSize: '14px', }}>Catatan: {`${item.remarks ? item.remarks : "-"} `}</Typography>
                                                    <Typography style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{`${Helpers.changeDateFormat(item.updated_at, "DD MMM YYYY HH:mm")}`}</Typography>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', justifyContent: 'space-between' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }} >
                                                            <Avatar sx={{ width: 38, height: 38 }} src={profileImg} />
                                                            <div style={{ marginLeft: '12px' }}>
                                                                <Typography style={{ fontSize: '14px', fontWeight: '500' }}>{`${item.lecturer?.first_name} ${item.lecturer?.last_name}`}</Typography>
                                                                <Typography style={{ fontSize: '14px', fontStyle: 'italic', color: '#7A7A7A' }}>{item.lecturer?.major.name}</Typography>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* <Divider /> */}
                                            </div>
                                        )
                                    })}
                                </> :
                                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <EmptyState text="No Data" />
                                </div>}
                        </div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HistoryModal;
