import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, } from "@mui/material";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import SubmissionAPI from "~/src/api/SubmissionAPI";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Chip from '@mui/material/Chip';
import BasicTable from "./tableScore";
import { Loader } from "~/src/components/loader";
import EmptyState from "~/src/components/emptyState";
import { useRouter } from "next/router";

import Helpers from "../../helpers";

import EvaluationModal from "./evaluation/evaluationModal";
import EvaluationStatusModal from "./evaluation/evaluationStatusModal";
import UpdateScheduleModal from "./scheduleModal/updateScheduleModal";
import ScheduleSeminarModal from "./scheduleModal/scheduleModal";
import GraduationModal from "./scheduleModal/graduationModal";
import HistoryModal from "./HistoryModal";

const FinalAssessment = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);
    const { detailSubmission, submissions, refreshSubmission } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenGraduationModal, setIsOpenGraduationModal] = useState(false);
    const [isHaveFinalSidang, setIsHaveFinalSidang] = useState(false);
    const [data, setData] = useState({})
    const [submissionApproval, setSubmissionApproval] = useState([]);
    const [submissionSeminarApproval, setSubmissionSeminarApproval] = useState([]);
    const [approvers, setApprovers] = useState([])
    const [historyApprover, setHistoryApprover] = useState([])
    const [detailApprover, setDetailApprover] = useState({})
    const [isOpenScheduleSeminar, setIsOpenScheduleSeminar] = useState(false);
    const [isOpenScheduleFinal, setIsOpenScheduleFinal] = useState(false);
    const [isOpenEvaluationStatus, setIsOpenEvaluationStatus] = useState(false);
    const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        if (submissions.length > 0) {
            setData(submissions[submissions.length - 1]);
            setIsLoading(false);
        }

        if (detailSubmission && detailSubmission.latest_stage === 3) {
            setIsHaveFinalSidang(true);
        }
    }, [submissions, detailSubmission])


    useEffect(() => {
        if (!Helpers.IsEmptyObject(data) && data.stage === 2) {
            let query = {
                //state final
                stage: 2,
                submission_attachment_id: data.id
            }
            SubmissionAPI.getSubmissionApproval(query).then(res => {
                setSubmissionApproval(res?.data.data)
            })
                .catch((err) => {
                    console.log("err", err);
                })
        }
    }, [data])

    useEffect(() => {
        if (!Helpers.IsEmptyObject(data) && data.stage === 2) {
            let query = {
                //state seminar
                stage: 1,
                status: 1,
            }
            SubmissionAPI.getSubmissionApproval(query).then(res => {
                setSubmissionSeminarApproval(res?.data.data)
            })
                .catch((err) => {
                    console.log("err", err);
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
                    console.log("err", err);
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
                    console.log("err", err);
                })
        }
    }, [submissionApproval])


    useEffect(() => {
        if (profile) {
            let filter = approvers.find(item => item.lecturer.id === profile.id);
            if (filter) {
                setDetailApprover(filter)
            }
        }
    }, [approvers])


    const onUpdateFinal = (values: any) => {
        setIsLoading(true);

        let payload = {
            ...values,
        }
        SubmissionAPI.updateFinalByLecturer(payload, data.id)
            .then(res => {
                dispatch(openNotificationToast("Berhasil Ubah Jadwal Seminar"));
                setIsOpenScheduleSeminar(false);
                refreshSubmission()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const onSubmitFinal = (values: any) => {
        setIsLoading(true);

        let payload = {
            ...values,
            submission_id: detailSubmission.id
        }
        SubmissionAPI.createFinal(payload)
            .then(res => {
                dispatch(openNotificationToast("Berhasil Buat Jadwal Final"));
                setIsOpenScheduleFinal(false);
                refreshSubmission()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const onSubmitGraduation = (values: any) => {
        setIsLoading(true);

        let payload = {
            ...values,
            submission_id: detailSubmission.id
        }
        SubmissionAPI.createGraduation(payload)
            .then(res => {
                dispatch(openNotificationToast("Berhasil Selesai Ujian Sidang"));
                setIsOpenGraduationModal(false);
                refreshSubmission()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const takeActionEvaluationStatus = (values: any) => {
        setIsLoading(true);
        let payload = {
            status: values.status,
        }
        SubmissionAPI.updateSubmissionStatus(payload, submissionApproval[0].id).then(res => {
            dispatch(openNotificationToast("Berhasil memberikan tindakan"));
            setIsOpenEvaluationStatus(false);
            refreshSubmission()
        })
            .catch((err) => {
                console.log("err", err);
            })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    const takeActionProposal = (values: any) => {
        setIsLoading(true)
        let payload = {
            ...values
        }
        let submissionApprovalId = detailApprover ? detailApprover.id : "";
        SubmissionAPI.updateSubmissionApproval(payload, submissionApprovalId).then((res: any) => {
            dispatch(openNotificationToast("Berhasil memberikan penilaian"));
            setIsOpen(false);
            refreshSubmission()
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
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


    const showButtonEvaluation = () => {
        if (profile) {
            let find = approvers.find(item => item.lecturer.id === profile.id);
            if (find) {
                return (
                    <Button size="small" color="primary" variant="contained"
                        onClick={() => {
                            setIsOpen(true);
                        }}>
                        Penilaian
                    </Button>
                )
            }
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

    const renderActionStatus = () => {
        let profileId = profile && profile.id;
        let thesis_id = detailSubmission && detailSubmission.user ? detailSubmission.user.thesis_advisor_id : "";
        if (profileId === thesis_id) {
            return (
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() => setIsOpenEvaluationStatus(true)}
                    >
                        Ambil Keputusan
                    </Button>
                </div>
            )
        }
    }

    const renderActionButton = () => {
        let profileId = profile && profile.id;
        let thesis_id = detailSubmission && detailSubmission.user ? detailSubmission.user.thesis_advisor_id : "";
        if (submissionApproval.length > 0 && submissionApproval[0].average_score !== 0) {
            if (profileId === thesis_id && !isHaveFinalSidang) {
                if (data.status === 2 || data.status === 3) {
                    return (
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                sx={{ mr: 2 }}
                                onClick={() => setIsOpenScheduleSeminar(true)}
                            >
                                Buat Jadwal Seminar
                            </Button>
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => setIsOpenGraduationModal(true)}
                            >
                                Konfirmasi Kelulusan
                            </Button>
                        </div>
                    )
                }
            }
        }

    }


    const renderButtonUpdateSchedule = () => {
        let profileId = profile && profile.id;
        let thesis_id = detailSubmission && detailSubmission.user ? detailSubmission.user.thesis_advisor_id : "";
        if (profileId === thesis_id) {
            return (
                <Typography onClick={() => setIsOpenScheduleSeminar(true)} color="primary" style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer' }}>Ubah Jadwal</Typography>
            )
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
                        {data.status !== 0 ? renderStatus(data.status) : checkScore ? null : showButtonEvaluation()}
                    </div>
                </>
            )

        }
        else {
            render = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', cursor: 'pointer', textDecoration: 'none' }} >
                        <WarningAmberIcon color="warning" style={{ marginRight: '8px' }} />
                        <Typography style={{ fontSize: '14px', fontWeight: '600' }} color="warning">{`Draft  T.A Tidak Ditemukan`}</Typography>
                    </div>
                </div>
            )
        }

        return (
            <Paper variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', minHeight: '100px', padding: '16px' }}>
                {render}
            </Paper>
        )
    }

    let checkScore = submissionApproval.length > 0 && submissionApproval[0].average_score !== 0

    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '320px' }}>
                <div style={{ padding: '14px', marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tahap 3 - Ujian Sidang</Typography>

                        {!isLoading ? <>{checkScore && data.status === 0 ? renderActionStatus() : data.status !== 0 ? renderActionButton() : null}</> : null}
                    </div>
                    {isLoading ? <>  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '340px' }}>
                        <Loader />
                    </div></> : <>
                        <div style={{ display: 'flex', marginTop: '12px', flexDirection: 'column' }}>
                            <Typography style={{ fontSize: '14px' }}>Judul Proposal:</Typography>
                            <Typography style={{ fontSize: '14px', marginTop: '8px' }}>{detailSubmission.title}</Typography>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            {renderAttachment()}
                        </div>
                        <div style={{ display: 'flex', marginTop: '24px', marginBottom: '16px', flexDirection: 'column' }}>
                            <div style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '14px', fontWeight: 'bold' }}>Jadwal Ujian Sidang</Typography>
                                {renderButtonUpdateSchedule()}

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
                        </div></>}
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
                            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Nilai Ujian</Typography>
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

                        <CardContent sx={{ width: '100%', height: '340px', padding: '14px', overflow: 'auto' }}>
                            {approvers.length > 0 ?
                                <>
                                    <BasicTable isFinalSection={true} data={approvers} submissionApproval={submissionApproval} submissionSeminarApproval={submissionSeminarApproval} />
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

                <GraduationModal isLoading={isLoading} open={isOpenGraduationModal} handleClose={() => setIsOpenGraduationModal(false)} onSubmitModal={(payload: any) => onSubmitGraduation(payload)} />
                <ScheduleSeminarModal isLoading={isLoading} type="final" open={isOpenScheduleFinal} handleClose={() => setIsOpenScheduleFinal(false)} onSubmitModal={(payload: any) => onSubmitFinal(payload)} />
                <UpdateScheduleModal isLoading={isLoading} open={isOpenScheduleSeminar} handleClose={() => setIsOpenScheduleSeminar(false)} onSubmitModal={(payload: any) => onUpdateFinal(payload)} />
                <EvaluationModal isLoading={isLoading} open={isOpen} handleClose={() => setIsOpen(false)} onSubmitModal={(values: any) => takeActionProposal(values)} />
                <EvaluationStatusModal isLoading={isLoading} open={isOpenEvaluationStatus} handleClose={() => setIsOpenEvaluationStatus(false)} onSubmitModal={(values: any) => takeActionEvaluationStatus(values)} />
                <HistoryModal handleClose={() => setIsOpenHistoryModal(false)} isLoading={isLoading} open={isOpenHistoryModal} historyApprover={historyApprover} />
            </Grid>
        </>
    )
}

export default FinalAssessment;
