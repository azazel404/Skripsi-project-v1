import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";

import LecturerAPI from "~/src/api/LecturerAPI";
import MajorAPI from "~/src/api/MajorAPI";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import Helpers from "../../helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));



const Dosen = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);

    const [dosenId, setDosenId] = useState(null);
    const [majorOptions, setMajorOptions] = useState([]);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        major: "",
        registration_number: "",

    })


    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }

    const retrieveData = () => {
        setIsLoading(true);
        let payload = {
            ...query
        }
        if (profile && profile.roleInString === "LECTURER") {
            payload.major = profile.major.id
        }
        else if (profile && profile.roleInString === "KETUA_PRODI") {
            payload.major = profile.major.id
        }

        LecturerAPI.get(payload)
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



    console.log("profile", profile);

    useEffect(() => {
        retrieveData()
    }, [query, profile])

    useEffect(() => {
        setIsLoading(true);
        let payload = {
            page: 1,
            limit: 9999999
        }
        MajorAPI.get(payload).then(res => {
            let options = res?.data.data.map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setMajorOptions(options)
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    const deleteData = (dosenId: any) => {

        LecturerAPI.delete(dosenId)
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

    // useEffect(() => {
    //     if (!Helpers.IsEmptyObject(profile)) {
    //         setQuery((prevState) => ({
    //             ...prevState,
    //             major: profile.major.id,
    //         }));
    //     }
    // }, [profile])


    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
        }));
    }



    const columns = [
        {
            displayName: 'NIDN',
            name: 'registration_number'
        },
        {
            displayName: 'Nama',
            name: 'name',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.first_name} ${rowData.last_name}`}
                    </span>
                )
            }
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
            displayName: 'Status',
            name: 'role',
            customRender: (rowData: any) => {
                if (rowData.role === 30) {
                    return "Dosen"
                }
                else if (rowData.role === 50) {
                    return "Kordinator Program Studi"
                }
            }
        },

        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                let profilePermission;
                if (profile) {
                    profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
                }
                return (
                    <div>
                        <Helpers.restrictUI profile={profilePermission} accessPermission={["admin", "dekan",]}>
                            <IconButton size="small" onClick={() => router.push(`/lecturer/${rowData.id}`)} >
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => {
                                setDosenId(rowData.id)
                                toggleOpenConfirmation()
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </Helpers.restrictUI>

                        <Helpers.restrictUI profile={profilePermission} accessPermission={["dekan", "lecturer", "ketua_prodi"]}>
                            <IconButton size="small" onClick={() => router.push(`/lecturer/${rowData.id}`)} >
                                <PreviewIcon />
                            </IconButton>
                        </Helpers.restrictUI>
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
            <Helpers.restrictUI profile={profilePermission} accessPermission={["admin", "dekan"]}>
                <Button size="small" onClick={() => {
                    router.push("/lecturer/create")

                }} color="primary" variant="contained">
                    Tambah Dosen
                </Button>
            </Helpers.restrictUI>
        )
    }

    const onSearchUpdated = (event: any, name: string) => {
        setQuery((prevState) => ({
            ...prevState,
            [name]: event,
        }));
    }



    let formFilterType;
    if (profile) {
        if (profile.roleInString === "LECTURER" || profile.roleInString === "KETUA_PRODI") {
            formFilterType = [
                {
                    label: "NIDN",
                    name: "registration_number",
                    filter: {
                        type: "text",
                    },
                },
            ];
        }
        else {
            formFilterType = [
                {
                    label: "NIDN",
                    name: "registration_number",
                    filter: {
                        type: "text",
                    },
                },
                {
                    label: "Program Studi",
                    name: "major",
                    filter: {
                        type: "dropdown",
                        dataSource: majorOptions,
                    },
                },
            ];
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
                <Container maxWidth={false}>
                    <ToolbarComponent title="Dosen" customRender={customToolbarActions} isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType} />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => deleteData(dosenId)} />
            </Box>
        </>
    )
}
Dosen.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Dosen;
