import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import Helpers from "../../helpers";

import UserAPI from "~/src/api/UserAPI";
import MajorAPI from "~/src/api/MajorAPI";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));


const Mahasiswa = (props: any) => {

    const dispatch = useDispatch();
    const router = useRouter()
    const profile = useSelector((state: any) => state.general.profile);

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [majorOptions, setMajorOptions] = useState([]);
    const [mahasiswaId, setMahasiswaId] = useState(null)
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        role: 20,
        major: "",
        registration_number: "",
        class_of: ""
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

        UserAPI.get(payload)
            .then((res: any) => {
                if (res.data) {
                    setDataSource(res.data);
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

    useEffect(() => {
        retrieveData()
    }, [query, profile])

    const deleteData = (mahasiswaId: any) => {

        UserAPI.delete(mahasiswaId)
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
                console.log("err", err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])




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
                return (
                    <span>
                        {`${rowData.major.name}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Tahun Ajaran',
            name: 'class_of',
            customRender: (rowData: any) => {
                if (rowData.class_of) {
                    return (
                        <span>
                            {`${rowData.class_of}`}
                        </span>
                    )
                }
            }
        },
        // {
        //     displayName: 'Phone',
        //     name: 'phone_number'
        // },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                let profilePermission;
                if (profile) {
                    profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
                }
                let icons;
                if (profilePermission === "ketua_prodi") {
                    icons = <EditIcon />
                }
                else {
                    <PreviewIcon />
                }

                return (
                    <div>
                        <Helpers.restrictUI profile={profilePermission} accessPermission={["admin", "dekan"]}>
                            <IconButton size="small" onClick={() => router.push(`/mahasiswa/${rowData.id}`)} >
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => {
                                setMahasiswaId(rowData.id)
                                toggleOpenConfirmation()
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </Helpers.restrictUI>

                        <Helpers.restrictUI profile={profilePermission} accessPermission={["dekan", "ketua_prodi"]}>
                            <IconButton size="small" onClick={() => router.push(`/mahasiswa/${rowData.id}`)} >
                                {icons}
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
            <Helpers.restrictUI profile={profilePermission} accessPermission={["admin", "dekan", "lecturer", "ketua_prodi"]}>
                <Button size="small" onClick={() => {
                    router.push("/mahasiswa/create")

                }} color="primary" variant="contained">
                    Tambah Mahasiswa
                </Button>
            </Helpers.restrictUI>
        )

    }


    let formFilterType;
    if (profile) {
        if (profile.roleInString === "LECTURER" || profile.roleInString === "KETUA_PRODI") {
            formFilterType = [
                {
                    label: "NIM",
                    name: "registration_number",
                    filter: {
                        type: "text",
                    },
                },
                {
                    label: "Tahun Ajaran",
                    name: "class_of",
                    filter: {
                        type: "text",
                    },
                },
            ];
        }
        else {
            formFilterType = [
                {
                    label: "NIM",
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
                {
                    label: "Tahun Angkatan",
                    name: "class_of",
                    filter: {
                        type: "text",
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
                    <ToolbarComponent title="Mahasiswa" customRender={customToolbarActions} isActiveFilter={true} onFilter={onSearchUpdated} forms={formFilterType} />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            busy={isLoading}
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={(pagination: any) => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => deleteData(mahasiswaId)} />
            </Box>
        </>
    )
}
Mahasiswa.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Mahasiswa;
