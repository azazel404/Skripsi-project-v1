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

const DetailModal = (props: any) => {
    const { open, handleClose, repositoryId } = props;

    const [isLoading, setIsLoading] = React.useState(false);
    const [detail, setDetail] = React.useState(null);
    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        if (repositoryId) {
            setIsLoading(true);
            ERepositoryAPI.getById(repositoryId)
                .then(res => {
                    setDetail(res?.data);
                })
                .catch(() => {

                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [repositoryId])



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getAttachment = detail && detail.attachment ? detail.attachment.file_name : "";
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ fontSize: "16px" }} component="div">{detail && detail.name}</Typography>
                        <div style={{
                            display: "flex",
                            alignItems: 'center',
                            paddingTop: '12px',
                            paddingBottom: '12px'
                        }}>
                            <Avatar sx={{ width: 40, height: 40 }} src={"/static/user-placeholder.png"} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '14px', paddingLeft: '8px', fontWeight: 'bold' }}>
                                    {detail && detail.publisher}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', paddingLeft: '8px' }} color="text.secondary">
                                    {detail && detail.major.name}
                                </Typography>
                            </div>
                        </div>
                        <Tabs sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none'
                            },
                        }} aria-label="basic tabs example" value={value}
                            onChange={handleChange}>
                            <Tab label="Abstrak" />
                            <Tab label="File Dokumen" />
                        </Tabs>
                    </div>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '360px', paddingLeft: '40px', paddingRight: '40px' }}>
                    {value === 0 &&
                        <>
                            <Typography sx={{ fontSize: '14px' }}>
                                {detail && detail.description}
                            </Typography>
                        </>}
                    {value === 1 &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px', border: '1px solid #D3D3D3', padding: '16px 24px 16px 24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                                        rel="noopener noreferrer">
                                        <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                                        <Typography style={{ fontSize: '16px', fontWeight: '600' }} color="primary">{detail.attachment ? detail.attachment.name : ""}</Typography>
                                    </a>
                                </div>
                                <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                                    rel="noopener noreferrer">
                                    <IconButton size="small"  >
                                        <DownloadIcon color="primary" />
                                    </IconButton>
                                </a>
                            </div>
                        </>}
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

export default DetailModal;
