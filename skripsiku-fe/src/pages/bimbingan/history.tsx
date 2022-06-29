import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Paper, Button, IconButton, Input, Typography } from "@mui/material";
import { ToolbarComponent } from "../../components/toolbar";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useSelector } from "react-redux";
import GuideAPI from "~/src/api/GuideAPI";
import UploadAPI from "~/src/api/UploadAPI";
import AttachmentAPI from "~/src/api/AttachmentAPI";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Helpers from "~/src/helpers";
import moment from "moment";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

const HistoryBimbingan = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("")
    const [file, setFile] = useState("")


    const { userId, lecturerId } = router.query;


    console.log(profile)
    const retrieveHistory = () => {
        setIsLoading(true);
        let user = userId ? userId : profile.id;
        let lecturer = lecturerId ? lecturerId : profile && profile.thesis_advisor ? profile.thesis_advisor.id : "";

        if (user && lecturer) {
            GuideAPI.history(user, lecturer).then(res => {
                let data = res?.data
                let history = data.map((item: any) => {
                    return {
                        ...item,
                        fileName: `Proposal-TA-${new Date(item.created_at).valueOf()}`
                    }
                })
                setHistory(history);
            })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const uploadFile = (event: any) => {
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





    useEffect(() => {
        if (profile) {
            retrieveHistory();
        }
    }, [profile])


    const sendCommentToThesis = () => {
        setIsLoading(true);
        const payload = {
            "file_name": file,
            "note": message
        }

        GuideAPI.sendCommentToThesis(payload).then(res => {
            retrieveHistory();
            setMessage("")
            setFile("")
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const sendCommentToStudent = () => {
        setIsLoading(true);
        const payload = {
            "file_name": file,
            "note": message
        }
        GuideAPI.sendCommentToStudent(userId, payload).then(res => {
            retrieveHistory();
            setMessage("")
            setFile("")
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    let readOnly;
    if (Helpers.IsEmptyObject(profile.thesis_advisor)) {
        readOnly = true;
    }
    else {
        readOnly = false
    }


    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '24px',
                    paddingBottom: '24px'
                }}
            >
                <Container maxWidth={false}>
                    <ToolbarComponent title="Bimbingan" />
                    <Paper elevation={3} style={{ padding: '12px', height: 'calc(100vh - 64px - 126px)' }}>
                        <div style={{ height: 'calc(100% - 120px)', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '16px', paddingRight: '16px' }}>
                                {history ? history.map((item: any, index) => {
                                    let mahasiswa = item && item.user ? `${item.user.first_name} ${item.user.last_name}` : "";
                                    let dosen = item && item.lecturer ? `${item.lecturer.first_name} ${item.lecturer.last_name}` : "";
                                    let name = item.sender === 1 ? mahasiswa : dosen;

                                    let isToday = moment(moment.unix(item.created_at)).isSame(moment(), "day");
                                    let dateTimeString;

                                    if (isToday) {
                                        dateTimeString = `Today, ${moment(item.created_at).format("h:mm A")}`;
                                    } else {
                                        dateTimeString = moment(item.created_at).format("DD MMM yyyy, h:mm A");

                                    }
                                    const getAttachment = item && item.attachment ? item.attachment.file_name : "";
                                    return (
                                        <div key={index} style={{
                                            display: 'flex',
                                            justifyContent: item.sender === 1 ? "flex-start" : "flex-end"
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                marginBottom: '16px',
                                            }}>
                                                <Paper elevation={3} key={index} variant="outlined"
                                                    style={{
                                                        marginBottom: '4px',
                                                        padding: '8px',
                                                        width: '480px',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}>
                                                    <Typography color="primary" variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>{name}</Typography>
                                                    <Typography variant="body1" >{item.note}</Typography>
                                                    {getAttachment ? <div style={{ display: 'flex', marginTop: '12px', cursor: 'pointer' }}>
                                                        <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                                                            rel="noopener noreferrer">
                                                            <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                                                            <Typography style={{ fontSize: '16px', color: 'black' }} >{`${item.fileName}`}</Typography>
                                                        </a>
                                                    </div> : null}
                                                </Paper>
                                                <span style={{ fontSize: '12px', display: 'flex', justifyContent: 'flex-end', color: '#0b0c26' }}>{dateTimeString}</span>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                            </div>
                        </div>
                        <Paper variant="outlined" style={{ padding: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ flexGrow: '1', marginRight: '12px' }}>
                                    <TextField
                                        disabled={readOnly}
                                        size="small"
                                        placeholder="write post"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <Button disabled={readOnly} size="small" color="primary" variant="contained" onClick={() => {
                                        if (userId) {
                                            sendCommentToStudent()
                                        }
                                        else {
                                            sendCommentToThesis()
                                        }
                                    }}>
                                        Send
                                    </Button>
                                </div>
                            </div>
                            <label htmlFor="icon-button-file">
                                <Input disabled={readOnly} style={{ display: 'none' }} id="icon-button-file" type="file" accept="application/msword,application/pdf" onChange={(event) => uploadFile(event)} />
                                <Button disabled={loadingUpload || readOnly} size="small" color="primary" aria-label="upload picture" component="span" >Upload File</Button>
                            </label>
                        </Paper>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}
HistoryBimbingan.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default HistoryBimbingan;
