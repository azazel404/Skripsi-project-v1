import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../../components/table/tableComponent";
import { ToolbarComponent } from "../../../components/toolbar";
import { DashboardLayout } from "../../../layout/dashboard/dashboard-layout";



import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PreviewIcon from '@mui/icons-material/Preview';

import Helpers from "../../../helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../../actions"

const ConfirmationModal = dynamic(() => import("../../../components/dialogConfirmation"));



const SubmissionList = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query
    const profile = useSelector((state: any) => state.general.profile);
    const [submissionPeriodOptions, setSubmissionPeriodOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({
        major: {},
        class_of: ""
    })
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        submission_period_id: id ? id : "",
        name: "",
        registration_number: "",
        transaction_date: null
    })


    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }


    const retrieveDetail = () => {
        setIsLoading(true)
        if (id) {
            SubmissionPeriodAPI.getById(id).then((res: any) => {
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

    useEffect(() => {
        retrieveDetail();
    }, [id])

    const retrieveSubmissionList = () => {
        setIsLoading(true)
        if (id) {
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
    }

    useEffect(() => {
        retrieveSubmissionList();
    }, [query, id])

    const retrieveSubmissionPeriodOptions = () => {
        setIsLoading(true);
        let payload = {
            page: 1,
            limit: 99999999,
            major: ""
        }
        if (profile) {
            payload.major = profile.major_id
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


    useEffect(() => {
        retrieveSubmissionPeriodOptions()

    }, [])

    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
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
                if (rowData.title.length > 20) {
                    return (
                        <span>
                            {rowData.title.substring(0, 20) + "..."}
                        </span>
                    )
                }
                else {
                    return (
                        <span>
                            {rowData.title}
                        </span>
                    )
                }
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
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        <IconButton size="small" onClick={() => router.push(`/abstract-submission/submission-list/detail/${rowData.id}`)} >
                            <PreviewIcon />
                        </IconButton>
                    </div>
                )
            }
        }
    ];



    const onSearchUpdated = (event: any, name: string) => {
        setQuery((prevState) => ({
            ...prevState,
            [name]: event,
        }));
    }



    let formFilterType = [
        {
            label: "NIM",
            name: "registration_number",
            filter: {
                type: "text",

            },
        },
        {
            label: "Nama",
            name: "name",
            filter: {
                type: "text",

            },
        },
        {
            label: "Tanggal Pengajuan",
            name: "transaction_date",
            initialValue: query.transaction_date,
            filter: {
                type: "date",

            },
        },
    ];


    let title;
    if (detail) {
        title = `${detail.major && detail.major.name !== undefined ? detail.major.name : ""}`
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
                    <ToolbarComponent title={title}
                        isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType}
                    />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} />
            </Box>
        </>
    )
}
SubmissionList.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default SubmissionList;
