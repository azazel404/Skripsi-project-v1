import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton, Tabs, Tab, Paper } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";

import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import Helpers from "~/src/helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

const FormAbstractSubmission = dynamic(() => import('../../modules/abstract-submission/formModal'));
const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));



const AbstractSubmission = (props: any) => {
    const router = useRouter();
    const profile = useSelector((state: any) => state.general.profile);
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        major: "",
        startDate: null,
        endDate: null,
        class_of: "",
        status: 0
    })

    const toggleOpenModal = () => {
        setIsOpen(!isOpen);
    }

    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }

    const retrieveData = () => {
        setIsLoading(true);
        let payload = {
            ...query
        }
        if (profile) {
            payload.major = profile.major_id
        }

        SubmissionPeriodAPI.get(payload)
            .then((res: any) => {
                setDataSource({
                    data: res.data.data,
                    count: res.data.count
                });

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
        retrieveData()
    }, [query, profile])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setQuery((prevState) => ({
            ...prevState,
            status: newValue
        }));
    };

    const saveData = (values: any) => {
        setIsLoading(true);
        let payload = {
            ...values,
            major_id: parseInt(values.major_id)
        }
        let fetch = SubmissionPeriodAPI.create(payload)
        fetch
            .then((res: any) => {
                toggleOpenModal();
                retrieveData()
                dispatch(openNotificationToast("Berhasil menambahkan jadwal"));
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const closeSubmissionPeriod = (detail: any) => {
        SubmissionPeriodAPI.close(detail.id)
            .then((res: any) => {
                toggleOpenConfirmation();
                retrieveData()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }




    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
        }));
    }



    const columns = [
        {
            displayName: 'Tahun Ajaran',
            name: 'class_of',

        },
        {
            displayName: 'Program Studi',
            name: 'major',
            customRender: (rowData: any) => {
                if (rowData.major) {
                    return rowData.major.name;
                }
                else {
                    return null
                }
            }
        },
        {
            displayName: 'Tanggal Mulai',
            name: 'start_date',
            customRender: (rowData: any) => {
                if (rowData.start_date) {
                    return Helpers.changeDateFormat(rowData.start_date)
                }
                else {
                    return null
                }
            }
        },
        {
            displayName: 'Tanggal Berakhir',
            name: 'end_date',
            customRender: (rowData: any) => {
                if (rowData.end_date) {
                    return Helpers.changeDateFormat(rowData.end_date)
                }
                else {
                    return null
                }
            }
        },
        // {
        //     displayName: 'Status',
        //     name: 'status',
        //     customRender: (rowData: any) => {
        //         if (rowData.status == 0) {
        //             return "Pendaftaran Dibuka"
        //         }
        //         else {
        //             return "Pendaftaran Ditutup"
        //         }
        //     }
        // },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                let profilePermission;
                if (profile) {
                    profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
                }
                return (
                    <div>
                        <IconButton size="small"
                            onClick={() => router.push(`/abstract-submission/submission-list/${rowData.id}`)}
                        >
                            <GroupIcon />
                        </IconButton>
                        {rowData.status === 0 && <Helpers.restrictUI profile={profilePermission} accessPermission={['dekan', "ketua_prodi"]}>
                            <IconButton size="small" onClick={() => {
                                setDetail(rowData);
                                toggleOpenConfirmation();
                            }} >
                                <CloseIcon />
                            </IconButton>
                        </Helpers.restrictUI>}


                    </div>
                )
            }
        }
    ];



    const customToolbarActions = () => {
        let profilePermission;
        if (profile) {
            profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
        }
        return (
            <>
                <Helpers.restrictUI profile={profilePermission} accessPermission={['dekan', "ketua_prodi"]}>
                    <Button onClick={() => toggleOpenModal()} size="small" color="primary" variant="contained">
                        Buat Jadwal Pengajuan Proposal
                    </Button>
                </Helpers.restrictUI>

            </>

        )
    }

    const onSearchUpdated = (event: any, name: string) => {
        setQuery((prevState) => ({
            ...prevState,
            [name]: event,
        }));
    }



    let formFilterType = [
        {
            label: "Tahun Ajaran",
            name: "class_of",
            filter: {
                type: "text",
            },
        },

        {
            label: "Tanggal Mulai",
            name: "startDate",
            initialValue: query.startDate,
            filter: {
                type: "date",

            },
        },
        {
            label: "Tanggal Berakhir",
            name: "endDate",
            initialValue: query.endDate,
            filter: {
                type: "date",

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
                    paddingBottom: '24px'
                }}
            >
                <Container maxWidth={false}>
                    <ToolbarComponent title="Pengajuan T.A" customRender={customToolbarActions}
                        isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType}
                    />
                    <Paper elevation={3} sx={{ width: '100%' }}>
                        <Tabs sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none'
                            },
                            mt: 3
                        }} aria-label="basic tabs example" value={value}
                            onChange={handleChange}>
                            <Tab label="Pendaftaran Dibuka" />
                            <Tab label="Pendaftaran Ditutup" />
                        </Tabs>
                    </Paper>
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={(pagination: any) => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <FormAbstractSubmission open={isOpen} handleClose={toggleOpenModal} onSubmitModal={saveData} profile={profile} />
                <ConfirmationModal description="Apakah ingin menutup pendaftaran pengajuan T.A" open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => closeSubmissionPeriod(detail)} />
            </Box>
        </>
    )
}
AbstractSubmission.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default AbstractSubmission;
