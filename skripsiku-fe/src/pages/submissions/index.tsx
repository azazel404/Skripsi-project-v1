import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";

import SubmissionAPI from "~/src/api/SubmissionAPI";
import MajorAPI from "~/src/api/MajorAPI";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import PreviewIcon from '@mui/icons-material/Preview';
import { Router } from "next/router";
import Helpers from "~/src/helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"




const Submissions = (props: any) => {
    const router = useRouter();
    const profile = useSelector((state: any) => state.general.profile);
    const dispatch = useDispatch();


    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        registration_number: "",
        first_name: ""
    })



    const retrieveData = () => {
        setIsLoading(true);
        let payload = {
            ...query
        }
        if (profile) {
            payload.major = profile.major_id
        }

        SubmissionAPI.get(payload)
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
            name: 'name',
            customRender: (rowData: any) => {
                if (rowData.user) {
                    return (
                        <span>
                            {`${rowData.user.registration_number}`}
                        </span>
                    )
                }
            }
        },
        {
            displayName: 'Nama',
            name: 'name',
            customRender: (rowData: any) => {
                if (rowData.user) {
                    return (
                        <span>
                            {`${rowData.user.first_name} ${rowData.user.last_name}`}
                        </span>
                    )
                }
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
                if (rowData.created_at) {
                    return Helpers.changeDateFormat(rowData.created_at)
                }
                else {
                    return null
                }
            }
        },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                // let profilePermission;
                // if (profile) {
                //     profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
                // }
                return (
                    <div>
                        <IconButton size="small"
                            onClick={() => router.push(`/submissions/${rowData.id}`)}
                        >
                            <PreviewIcon />
                        </IconButton>
                    </div>
                )
            }
        }
    ];





    // const onSearchUpdated = (event: any, name: string) => {
    //     setQuery((prevState) => ({
    //         ...prevState,
    //         [name]: event,
    //     }));
    // }



    // let formFilterType = [
    //     {
    //         label: "Periode",
    //         name: "periode",
    //         filter: {
    //             type: "text",
    //         },
    //     },
    //     {
    //         label: "Gelombang",
    //         name: "gelombang",
    //         filter: {
    //             type: "dropdown",
    //             dataSource: [],
    //         },
    //     },
    //     {
    //         label: "Mahasiswa",
    //         name: "mahasiswa",
    //         filter: {
    //             type: "dropdown",
    //             dataSource: [],
    //         },
    //     },
    // ];


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
                    <ToolbarComponent title="Tugas Akhir Mahasiswa"
                    // isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType}
                    />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={(pagination: any) => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}
Submissions.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Submissions;
