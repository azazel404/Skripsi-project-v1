import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, CircularProgress } from "@mui/material";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import SubmissionAPI from "~/src/api/SubmissionAPI";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Chip from '@mui/material/Chip';
import BasicTable from "./tableScore";
import EmptyState from "~/src/components/emptyState";
import { useRouter } from "next/router";
import UploadAPI from "~/src/api/UploadAPI";
import HistoryModal from "./HistoryModal";
import Helpers from "../../helpers";


const SeminarAssessment = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);
    const { detailSubmission, submissions, refreshSubmission } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({})
    const [submissionApproval, setSubmissionApproval] = useState([]);
    const [approvers, setApprovers] = useState([])
    const [historyApprover, setHistoryApprover] = useState([])
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [document, setDocument] = useState({})
    const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        if (submissions.length > 0) {
            setData(submissions[submissions.length - 1]);
            setIsLoading(false);
        }
    }, [submissions, detailSubmission])


    useEffect(() => {
        if (!Helpers.IsEmptyObject(data) && data.stage === 1) {
            let query = {
                //state seminar
                stage: 1,
                submission_attachment_id: data.id
            }
            SubmissionAPI.getSubmissionApproval(query).then(res => {
                setSubmissionApproval(res?.data.data)
            })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
        }
    }, [data])

    useEffect(() => {
        if (submissionApproval.length > 0) {
            let query = {
                isActionTaken: false,
                submission_approval_id: submissionApproval[0].id
            }
            SubmissionAPI.getSubmissionApprovalDetail(query).then(res => {
                setApprovers(res?.data.data)
            })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
        }
    }, [submissionApproval])


    useEffect(() => {
        if (submissionApproval.length > 0) {
            let query = {
                isActionTaken: true,
                submission_approval_id: submissionApproval[0].id
            }
            SubmissionAPI.getSubmissionApprovalDetail(query).then(res => {
                setHistoryApprover(res?.data.data)
            })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
        }
    }, [submissionApproval])




    const uploadDocument = (event: any) => {
        event.preventDefault();
        setLoadingUpload(true)
        var formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadAPI.attachDoc(formData).then(res => {
            setDocument(res?.data.file_name);
            setIsLoading(true);
            let payload = {
                file_name: res?.data.file_name
            }
            SubmissionAPI.updateSeminarByStudent(payload, data.id)
                .then(res => {
                    dispatch(openNotificationToast("Berhasil Menambahkan File"));
                    refreshSubmission()
                })
                .catch(err => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsLoading(false);
                })
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setLoadingUpload(false);
            })
    }






    const renderStatus = (status: number) => {
        if (status === 1) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#4FB8A5', color: '#fff' }} label={"DITERIMA"} size="small" />
        }
        else if (status === 2) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#FFB020', color: '#fff' }} label={"DIREVISI"} size="small" />
        }
        else if (status === 3) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#D14242', color: '#fff' }} label={"DITOLAK"} size="small" />
        }
    }


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

    const renderActionButton = () => {
        // NOTE status transaksi revisi
        if (data) {
            if (data.status === 2 || data.status === 3) {
                return (
                    <div>
                        <Button
                            color="primary"
                            variant="outlined"
                            size="small"
                            onClick={() => router.push("/bimbingan/history")}
                        >
                            Lakukan Bimbingan
                        </Button>
                    </div>
                )
            }
        }
    }


    const renderAttachment = () => {
        const getAttachment = data && data.attachment ? data.attachment.file_name : "";
        let render;
        if (getAttachment) {
            render = (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                            rel="noopener noreferrer">
                            <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                            <Typography style={{ fontSize: '16px', fontWeight: '600' }} color="primary">{`File Tugas Akhir `}</Typography>
                        </a>
                        <Typography style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{`Dikumpulkan ${Helpers.changeDateFormat(data.updated_at, "DD MMM YYYY HH:mm")}`}</Typography>
                    </div>
                    <div>
                        {data.status !== 0 ? renderStatus(data.status) : ""}
                    </div>
                </>
            )

        }
        else {
            render = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {loadingUpload ? <><CircularProgress /></> : <label htmlFor="contained-button-file" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}>
                        <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={uploadDocument} />
                        {/* <Button disabled={loadingUpload} size="small" variant="contained" component="span" >
                            Upload File
                        </Button> */}
                        <UploadFileIcon color="primary" style={{ fontSize: '68px', marginBottom: '8px' }} />
                        <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#7A7A7A' }} >{`Masukkan file yang mau kamu kumpulkan disini`}</Typography>
                    </label>}
                </div>
            )
        }

        return (
            <Paper variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', minHeight: '100px', padding: '16px' }}>
                {render}
            </Paper>
        )
    }
    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '320px' }}>
                <div style={{ padding: '14px', marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tahap 2 - Seminar Proposal</Typography>
                        {renderActionButton()}
                    </div>
                    <div style={{ display: 'flex', marginTop: '24px', marginBottom: '16px', flexDirection: 'column' }}>
                        <Typography style={{ fontSize: '14px' }}>Judul Proposal:</Typography>
                        <Typography style={{ fontSize: '14px', marginTop: '8px' }}>{detailSubmission.title}</Typography>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        {renderAttachment()}
                    </div>
                    <div style={{ display: 'flex', marginTop: '24px', marginBottom: '16px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <Typography style={{ fontSize: '14px', fontWeight: 'bold' }}>Jadwal Seminar Proposal</Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: "16px" }}>
                            <div style={{ display: 'flex', marginRight: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarMonthOutlinedIcon style={{ marginRight: '8px', fontSize: '24px' }} />
                                    <Typography style={{ fontSize: '14px', }}>{Helpers.changeDateFormat(data.date, "DD MMMM YYYY")}</Typography>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'black', marginLeft: '6px', marginRight: '6px' }} />
                                    <div style={{ display: 'flex' }}>
                                        <Typography style={{ fontSize: '14px' }}>{data.start_time}</Typography>
                                        <Typography style={{ fontSize: '14px', paddingLeft: '4px', paddingRight: '4px' }}>{" - "}</Typography>
                                        <Typography style={{ fontSize: '14px' }}>{data.end_time} WIB</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                    <LocationOnIcon style={{ marginRight: '8px', fontSize: '24px' }} />
                                    <Typography style={{ fontSize: '14px', }}>{data.location}</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <Grid container spacing={2} style={{ marginTop: '8px' }}>
                <Grid item xs={12}>
                    <Card>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 2
                            }}
                        >
                            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Nilai Seminar Proposal</Typography>
                            <Button
                                color="primary"
                                variant="outlined"
                                size="small"
                                onClick={() => setIsOpenHistoryModal(true)}
                            >
                                Lihat Riwayat Aksi
                            </Button>
                        </Box>
                        <Divider />

                        <CardContent sx={{ width: '100%', minHeight: '120px', padding: '14px', overflow: 'auto' }}>
                            {approvers.length > 0 ?
                                <>
                                    <BasicTable data={approvers} submissionApproval={submissionApproval} />
                                </> :
                                <>
                                    <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <EmptyState text="No Data" />
                                    </div>
                                </>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <HistoryModal handleClose={() => setIsOpenHistoryModal(false)} isLoading={isLoading} open={isOpenHistoryModal} historyApprover={historyApprover} />
        </>
    )
}

export default SeminarAssessment;
