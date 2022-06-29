import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent } from "@mui/material";
import { ToolbarComponent } from "../../../../components/toolbar";
import EmptyState from "~/src/components/emptyState";
import { Loader } from "~/src/components/loader";
import { DashboardLayout } from "../../../../layout/dashboard/dashboard-layout";

import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Chip from '@mui/material/Chip';

import AbstractSubmissionApprovalAPI from "~/src/api/AbstractSubmissionApprovalAPI";
import AbstractSubmissionApprovalDetailAPI from "~/src/api/AbstractSubmissionApprovalDetailAPI";
// import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";


import { useRouter } from "next/router";

import Helpers from "../../../../helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../../../actions"
import EvaluationAbstractModal from "../../../../modules/abstract-submission/evaluation-abstract-modal"


const DetailSubmission = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query
    const profile = useSelector((state: any) => state.general.profile);
    const [submissionApproval, setSubmissionApproval] = useState({})
    const [approvers, setApprovers] = useState([])
    const [historyApprover, setHistoryApprover] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({})



    const toggleIsOpenAbstractSubmission = () => {
        setIsOpen(!isOpen);
    }



    const retrieveDetail = () => {
        setIsLoading(true)
        if (id) {
            AbstractSubmissionAPI.getById(id).then((res: any) => {
                setDetail(res.data);
            })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const retrieveSubmissionApproval = () => {
        setIsLoading(true)
        let payload = {
            abstractSubmissionId: id
        }
        AbstractSubmissionApprovalAPI.get(payload).then((res: any) => {
            setSubmissionApproval(res.data.data[0]);
            retrieveSubmissionApprovalDetail(res.data.data[0].id);
            retrieveSubmissionApprovalHistory(res.data.data[0].id);
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const retrieveSubmissionApprovalDetail = (id: string | string[] | undefined) => {
        setIsLoading(true)
        let payload = {
            isActionTaken: ""
        }
        AbstractSubmissionApprovalAPI.getApproval(id, payload).then((res: any) => {
            setApprovers(res.data);
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const retrieveSubmissionApprovalHistory = (id: string | string[] | undefined) => {
        setIsLoading(true)
        let payload = {
            isActionTaken: true
        }
        AbstractSubmissionApprovalAPI.getApproval(id, payload).then((res: any) => {
            setHistoryApprover(res.data);
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        retrieveDetail();
        retrieveSubmissionApproval();
    }, [id])



    const takeActionProposal = (values: any) => {
        setIsLoading(true)
        let payload = {
            status: values.status,
            remarks: values.remarks,
            abstract_submission_approval_id: submissionApproval.id
        }
        AbstractSubmissionApprovalDetailAPI.update(payload).then((res: any) => {
            retrieveDetail();
            retrieveSubmissionApproval();
            toggleIsOpenAbstractSubmission();
            dispatch(openNotificationToast("Berhasil memberikan penilaian"));
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }




    const renderImage = () => {
        if (detail && detail.user) {
            let img = detail.user && detail.user.profile_picture ? detail.user.profile_picture.file_name : ""
            return (
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={img} sx={{ width: 48, height: 48 }} />
                    <div style={{ marginLeft: '14px' }}>
                        <Typography style={{ fontWeight: '500' }}>{`${detail.user.first_name} ${detail.user.last_name}`}</Typography>
                        <Typography style={{ fontSize: '14px', color: '#7A7A7A', fontStyle: 'italic' }}>Teknik Perangkat Lunak</Typography>
                    </div>
                </div>
            )
        }
    }

    const renderStatus = (status: number) => {
        if (status === 1) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#4FB8A5', color: '#fff' }} label={"DITERIMA"} size="small" />
        }
        else if (status === 2) {
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
                    <Typography style={{ fontSize: '12px', fontWeight: 'bold', color: '#D14242' }}>DITOLAK.</Typography>
                </div>
            )
        }
    }

    const getAttachment = detail && detail.attachment ? detail.attachment.file_name : "";


    const showButtonEvaluation = () => {
        if (profile) {
            let find = approvers.find(item => item.lecturer_id === profile.id);

            if (find) {
                return (
                    <Button size="small" color="primary" variant="contained"
                        onClick={() => {
                            toggleIsOpenAbstractSubmission()
                        }}>
                        Penilaian
                    </Button>
                )
            }
        }
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
                <Container >
                    <ToolbarComponent title={"Detail Pengajuan T.A"} />
                    <div>
                        {renderImage()}
                    </div>
                    <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '230px', padding: '14px' }}>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Pengajuan Judul T.A</Typography>
                        <div style={{ display: 'flex', marginTop: '12px', flexDirection: 'column' }}>
                            <Typography style={{ fontSize: '14px' }}>Judul Proposal:</Typography>
                            <Typography style={{ fontSize: '14px', marginTop: '8px' }}>{detail.title}</Typography>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <Paper variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', minHeight: '100px', padding: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <a style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} href={`${getAttachment}`} target="_blank"
                                        rel="noopener noreferrer">
                                        <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                                        <Typography style={{ fontSize: '16px', fontWeight: '600' }} color="primary">{`File Draft T.A `}</Typography>
                                    </a>
                                    <Typography style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{`Dikumpulkan ${Helpers.changeDateFormat(detail.created_at, "DD MMM YYYY HH:mm")}`}</Typography>
                                </div>
                                <div>
                                    {detail.status !== 0 ? renderStatus(detail.status) : showButtonEvaluation()}
                                </div>
                            </Paper>
                        </div>
                    </Paper>
                    <Grid container spacing={2} style={{ marginTop: '8px' }}>
                        <Grid item xs={6}>
                            <Card>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 2
                                    }}
                                >
                                    <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Daftar Penguji</Typography>
                                </Box>
                                <Divider />

                                <CardContent sx={{ width: '100%', height: '300px', padding: '14px', overflow: 'auto' }}>
                                    {isLoading ?
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Loader />
                                        </div>
                                        :
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {approvers.map((item, index) => {
                                                let profileImg = item && item.lecturer && item.lecturer.profile_picture ? item.lecturer.profile_picture.file_name : "";
                                                return (
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }} key={index}>
                                                        <Avatar sx={{ width: 38, height: 38 }} src={profileImg} />
                                                        <div style={{ marginLeft: '12px' }}>
                                                            <Typography style={{ fontSize: '14px', fontWeight: '500' }}>{`${item.lecturer?.first_name} ${item.lecturer?.last_name}`}</Typography>
                                                            <Typography style={{ fontSize: '14px', fontStyle: 'italic', color: '#7A7A7A' }}>{item.lecturer?.major.name}</Typography>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 2
                                    }}
                                >
                                    <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Riwayat Aksi</Typography>
                                </Box>
                                <Divider />

                                <CardContent sx={{ width: '100%', height: '300px', padding: '14px', overflow: 'auto' }}>
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
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <EmptyState text="No Data" />
                                                </div>}
                                        </div>}

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <EvaluationAbstractModal open={isOpen} handleClose={toggleIsOpenAbstractSubmission} onSubmitModal={(values: any) => takeActionProposal(values)} />
            </Box>
        </>
    )
}
DetailSubmission.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DetailSubmission;
