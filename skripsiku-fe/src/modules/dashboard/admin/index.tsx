import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton, Grid, Paper, Typography, Card, CardHeader } from "@mui/material";
import TableDynamic from "../../../components/table/tableComponent";
import { ToolbarComponent } from "../../../components/toolbar";
import { DashboardLayout } from "../../../layout/dashboard/dashboard-layout";
import moment from "moment";
import Progress from "../../../components/progress";

import UserAPI from "~/src/api/UserAPI";
import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";
import MajorAPI from "~/src/api/MajorAPI";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PreviewIcon from '@mui/icons-material/Preview';
import Helpers from "../../../helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../../actions"



const DashboardAdmin = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);

    const [isLoading, setIsLoading] = useState(false);
    const [submissionPeriodOptions, setSubmissionPeriodOptions] = useState([])
    const [userCount, setUserCount] = useState([])


    const retrieveUserCount = () => {
        setIsLoading(true)
        UserAPI.userCount().then((res: any) => {
            setUserCount(res.data);
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
        retrieveUserCount();
    }, [])



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
                    <Grid container spacing={2} style={{ marginTop: '12px' }}>
                        {userCount.map(item => {
                            return (
                                <Grid item xs={4}>
                                    <Paper elevation={3} style={{ padding: '20px', minHeight: '130px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography style={{ fontSize: '14px', }}>{`Jumlah Mahasiswa ${item.major_name}`}</Typography>
                                            <Typography style={{ fontSize: '32px', fontWeight: '600' }}>{`${item.major_student_count}`}</Typography>

                                        </div>

                                    </Paper>
                                </Grid>
                            )
                        })}



                    </Grid>

                </Container>

            </Box>
        </>
    )
}
DashboardAdmin.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardAdmin;
