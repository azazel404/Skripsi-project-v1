import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton, Grid, Paper, Typography, Card, CardHeader } from "@mui/material";
import TableDynamic from "../../../components/table/tableComponent";
import { DashboardFilter } from "./dashboardFilter";
import { DashboardLayout } from "../../../layout/dashboard/dashboard-layout";
import Progress from "../../../components/progress";
import UserAPI from "~/src/api/UserAPI";
import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";
import MajorAPI from "~/src/api/MajorAPI";


import { useRouter } from "next/router";

import Helpers from "../../../helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../../actions"



const DashboardLecturer = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);

    const [submissionPeriodOptions, setSubmissionPeriodOptions] = useState([])
    const [majorOptions, setMajorOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [userCount, setUserCount] = useState(0)

    const [progressRate, setProgressRate] = useState(0)
    const [dataSource, setDataSource] = useState({
        data: [],
        count: 0
    })
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        submission_period_id: "",
        major_id: ""
    })


    const retrieveUserCount = () => {
        setIsLoading(true)
        UserAPI.userCount().then((res: any) => {

            let filtered: any = res?.data.find(item => item.major_id === query.major_id);

            if (filtered) {
                setUserCount(filtered.major_student_count);
            }

        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }




    const retrieveSubmissionPeriodOptions = () => {
        setIsLoading(true);
        let payload = {
            page: 1,
            limit: 99999999,
            major: ""
        }

        if (profile && profile.roleInString === "LECTURER") {
            payload.major = profile.major.id
        }
        else if (profile && profile.roleInString === "KETUA_PRODI") {
            payload.major = profile.major.id
        }

        SubmissionPeriodAPI.get(payload)
            .then((res: any) => {
                let options = res?.data.data.map((item: any) => {
                    return { label: item.class_of, value: item.id }
                })
                setSubmissionPeriodOptions(options)
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const retrieveMajorOptions = () => {
        let major;
        if (profile && profile.roleInString === "LECTURER") {
            major = profile.major.id
        }
        else if (profile && profile.roleInString === "KETUA_PRODI") {
            major = profile.major.id
        }
        MajorAPI.dataSource().then(res => {
            let option = res?.data.filter(item => item.id === major).map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setMajorOptions(option)
        })
    }

    useEffect(() => {
        retrieveSubmissionPeriodOptions()
        retrieveMajorOptions()
    }, [])


    // const retrieveDetail = () => {
    //     setIsLoading(true)
    //     if (id) {
    //         SubmissionPeriodAPI.getById(id).then((res: any) => {
    //             setDetail(res.data);
    //         })
    //             .catch((err) => {
    //                 let error = Helpers.ErrorHandler(err)
    //                 dispatch(openErrorToast(error.message));
    //             })
    //             .finally(() => {
    //                 setIsLoading(false)
    //             })
    //     }
    // }

    // useEffect(() => {
    //     retrieveDetail();
    // }, [id])

    const retrieveSubmissionList = () => {
        setIsLoading(true)
        AbstractSubmissionAPI.get(query).then((res: any) => {
            setDataSource(res.data);
        })
            .catch((err) => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const retrieveSubmissionRate = () => {
        setIsLoading(true)
        let payload = {
            majorId: query.major_id,
            submissionPeriodId: query.submission_period_id
        }
        AbstractSubmissionAPI.getRate(payload).then((res: any) => {
            setProgressRate(res?.data.rate);
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
        retrieveSubmissionList();
        retrieveUserCount();
        retrieveSubmissionRate();
    }, [query])




    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
        }));
    }

    const onSearchUpdated = (event: any, name: string) => {
        setQuery((prevState) => ({
            ...prevState,
            [name]: event,
        }));
    }



    const columns = [
        {
            displayName: 'NIM',
            name: 'registration_number',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.user.registration_number}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Nama',
            name: 'name',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.user.first_name} ${rowData.user.last_name}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Judul  T.A',
            name: 'title',
            customRender: (rowData: any) => {
                if (rowData.title.length > 20)
                    return (
                        <span>
                            {rowData.title.substring(0, 20) + "..."}
                        </span>
                    )
            }
        },
        {
            displayName: 'Tanggal Pengajuan',
            name: 'created_at',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${Helpers.changeDateFormat(rowData.created_at)}`}
                    </span>
                )
            }
        },
        {
            displayName: 'status',
            name: 'status',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {Helpers.renderStatus(rowData.status)}
                    </span>
                )
            }
        },
    ];




    let formFilterType = [
        {
            label: "Tahun Ajaran",
            name: "submission_period_id",
            filter: {
                type: "dropdown",
                dataSource: submissionPeriodOptions
            },
        },
        {
            label: "Program Studi",
            name: "major_id",
            filter: {
                type: "dropdown",
                dataSource: majorOptions
            },
        },

    ];


    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '24px',
 paddingBottom:'24px'
                }}
            >
                <Container maxWidth={false}>
                    {/* <ToolbarComponent
                        isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType}
                        useLabel={false}
                    /> */}
                    <Grid container spacing={2} style={{ marginTop: '12px' }}>
                        <Grid item xs={6}>
                            <Paper elevation={3} style={{ padding: '20px', minHeight: '130px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography style={{ fontSize: '14px', }}>{`Jumlah Mahasiswa`}</Typography>
                                    <Typography style={{ fontSize: '32px', fontWeight: '600' }}>{userCount}</Typography>

                                </div>

                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={3} style={{ padding: '20px', minHeight: '130px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography style={{ fontSize: '14px', }}>{`Pengumpulan Tugas Akhir`}</Typography>
                                    <Typography style={{ fontSize: '32px', fontWeight: '600' }}>{`${progressRate}%`}</Typography>
                                    <div style={{ marginTop: '4px' }}>
                                        <Progress value={Math.ceil(progressRate)} />
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <DashboardFilter
                        isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType}
                        useLabel={true}
                    />
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <CardHeader
                                title="Pengumpulan Draft Proposal"

                            />
                            <TableDynamic
                                data={dataSource.data}
                                count={dataSource.count}
                                columns={columns}
                                onPaginationUpdate={(pagination: any) => onPaginationUpdate(pagination)}
                            />
                        </Card>
                    </Box>
                </Container>

            </Box>
        </>
    )
}
DashboardLecturer.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardLecturer;
