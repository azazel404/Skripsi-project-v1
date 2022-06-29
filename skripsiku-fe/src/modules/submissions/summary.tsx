import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, } from "@mui/material";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import SubmissionAPI from "~/src/api/SubmissionAPI";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Chip from '@mui/material/Chip';
import SummaryTable from "./tableScore/summaryTable";
import { Loader } from "~/src/components/loader";
import EmptyState from "~/src/components/emptyState";
import { useRouter } from "next/router";

import Helpers from "../../helpers";



const SummaryAssessment = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);
    const { detailSubmission, submissions, refreshSubmission } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({})
    const [submissionApproval, setSubmissionApproval] = useState([]);
    const [submissionSeminarApproval, setSubmissionSeminarApproval] = useState([]);
    const [approvers, setApprovers] = useState([])
    const [historyApprover, setHistoryApprover] = useState([])
    const [detailApprover, setDetailApprover] = useState({})

    useEffect(() => {
        setIsLoading(true)
        if (submissions.length > 0) {
            setData(submissions[submissions.length - 1]);
            setIsLoading(false);
        }

    }, [submissions, detailSubmission])



    useEffect(() => {
        if (!Helpers.IsEmptyObject(data) && data.stage === 3) {
            let query = {
                //state final
                stage: 2,
                status: 1,
                // submission_attachment_id: data.id
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
        if (!Helpers.IsEmptyObject(data) && data.stage === 3) {
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



    console.log("submissionApproval", submissionApproval)






    const renderStatus = (status: number) => {
        if (status === 1) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#4FB8A5', color: '#fff' }} label={"DINYATAKAN LULUS"} size="small" />
        }
        else if (status === 2) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#FFB020', color: '#fff' }} label={"DIREVISI"} size="small" />
        }
        else if (status === 3) {
            return <Chip style={{ fontWeight: 'bold', backgroundColor: '#D14242', color: '#fff' }} label={"DITOLAK"} size="small" />
        }
    }








    const getAttachment = data && data.attachment ? data.attachment.file_name : "";

    const renderAttachment = () => {
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
                        {data.status !== 0 ? renderStatus(data.status) : null}
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


    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '400px' }}>
                <div style={{ padding: '14px', marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tahap 4 - Selesai</Typography>

                        {/* {!isLoading && renderActionButton()} */}
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
                        <div style={{ display: 'flex', marginTop: '12px', flexDirection: 'column' }}>
                            <div style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '14px', fontWeight: 'bold' }}>Tanggal Penyelesaian</Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: "8px" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarMonthIcon style={{ marginRight: '6px', fontSize: '16px' }} />
                                        <Typography style={{ fontSize: '14px', }}>  Tanggal:</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography style={{ fontSize: '14px' }}>{Helpers.changeDateFormat(data.date, "DD MMMM YYYY")}</Typography>
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
                            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Rekap Nilai Tugas Akhir</Typography>
                        </Box>
                        <Divider />

                        <CardContent sx={{ width: '100%', height: '340px', padding: '14px', overflow: 'auto' }}>
                            {getAttachment ?
                                <>
                                    <SummaryTable data={approvers} submissionApproval={submissionApproval} submissionSeminarApproval={submissionSeminarApproval} />
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
        </>
    )
}

export default SummaryAssessment;
