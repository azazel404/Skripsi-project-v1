import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, Tabs, Tab } from "@mui/material";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import SubmissionAPI from "~/src/api/SubmissionAPI";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Chip from '@mui/material/Chip';

import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

import { useRouter } from "next/router";

import Helpers from "../../helpers";
import { StatusSubmission } from "~/src/helpers/enums";

import HomeAssessment from "~/src/modules/submission/home";
import SeminarAssessment from "~/src/modules/submission/seminar";
import FinalAssessment from "~/src/modules/submission/final";
import SummaryAssessment from "~/src/modules/submission/summary";



const DetailSubmissionMahasiswa = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query
    const profile = useSelector((state: any) => state.general.profile);


    const [latestSubmission, setLatestSubmission] = useState({})
    const [detail, setDetail] = useState({})
    const [submissions, setSubmissions] = useState([])
    const [value, setValue] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const retrieveData = () => {
        setIsLoading(true);
        if (profile && profile.id) {
            SubmissionAPI.getByUser(profile.id)
                .then((res: any) => {
                    let data = res.data.data.filter((item: any) => item.status === StatusSubmission.SUBMITTED);
                    if (data) {
                        setLatestSubmission(data[data.length - 1])
                    }
                })
                .catch(err => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }

    }

    useEffect(() => {
        retrieveData();
    }, [profile])


    const retrieveDataById = () => {
        setIsLoading(true);
        SubmissionAPI.getById(latestSubmission.id)
            .then((res: any) => {

                setDetail(res.data);
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    useEffect(() => {
        if (latestSubmission && latestSubmission.id !== undefined) {
            retrieveDataById();
        }
    }, [latestSubmission])



    const getSubmissionMahasiswa = () => {
        let query = {
            submission_id: detail.id,
            stage: value
        }
        SubmissionAPI.getSubmission(query)
            .then((res: any) => {
                setSubmissions(res.data.data);
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    useEffect(() => {
        if (detail) {
            getSubmissionMahasiswa()
        }
    }, [detail, value])





    const renderImage = (detail: any) => {

        if (detail && detail.user) {
            let img = detail.user && detail.user.profile_picture ? detail.user.profile_picture.file_name : ""
            return (
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={img} sx={{ width: 48, height: 48 }} />
                    <div style={{ marginLeft: '12px' }}>
                        <Typography>{`${detail.user.first_name} ${detail.user.last_name}`}</Typography>
                        <Typography style={{ fontSize: '12px' }}>Teknik Perangkat Lunak</Typography>
                    </div>
                </div>
            )
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
                    <ToolbarComponent title={"Detail Pengajuan  T.A"} />
                    <div>
                        {renderImage(detail)}
                    </div>

                    <Paper elevation={3} sx={{ width: '100%', marginTop: '24px' }}>
                        <Tabs sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none'
                            },
                        }} aria-label="basic tabs example" variant="fullWidth" value={value}
                            onChange={handleChange}>
                            <Tab label="Pengumpulan Proposal TA" disabled={detail.latest_stage < 0} />
                            <Tab label="Seminar Proposal" disabled={detail.latest_stage < 1 || latestSubmission === undefined} />
                            <Tab label="Ujian Sidang" disabled={detail.latest_stage < 2 || latestSubmission === undefined} />
                            <Tab label="Selesai" disabled={detail.latest_stage < 3 || latestSubmission === undefined} />
                        </Tabs>
                    </Paper>
                    {value === 0 &&
                        <HomeAssessment
                            detailSubmission={detail}
                            submissions={submissions}
                            refreshSubmission={() => {
                                retrieveData();
                            }}
                        />}
                    {value === 1 &&
                        <SeminarAssessment
                            detailSubmission={detail}
                            submissions={submissions}
                            refreshSubmission={() => {
                                retrieveData();
                            }}
                        />}
                    {value === 2 &&
                        <FinalAssessment
                            detailSubmission={detail}
                            submissions={submissions}
                            refreshSubmission={() => {
                                retrieveData();
                            }}
                        />}
                    {value === 3 &&
                        <SummaryAssessment
                            detailSubmission={detail}
                            submissions={submissions}
                            refreshSubmission={() => {
                                retrieveData();
                            }}
                        />}
                </Container>

            </Box>
        </>
    )
}
DetailSubmissionMahasiswa.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DetailSubmissionMahasiswa;
