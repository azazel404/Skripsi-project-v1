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
import { openErrorToast } from "~/src/actions";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));


const Users = (props: any) => {

    const router = useRouter()
    const profile = useSelector((state: any) => state.general.profile);
    const dispatch = useDispatch();

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [mahasiswaId, setMahasiswaId] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
    })

    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }



    const retrieveData = () => {
        setIsLoading(true);
        let payload = {
            ...query
        }


        UserAPI.getDekanAndAdmin(payload)
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
    }, [query])

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



    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
        }));
    }

    const columns = [
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
            displayName: 'Phone',
            name: 'phone_number'
        },
        // {
        //     displayName: 'NIM',
        //     name: 'registration_number'
        // },
        {
            displayName: 'Status',
            name: 'role',
            customRender: (rowData: any) => {
                if (rowData.role === 10) {
                    return "Admin"
                }
                else if (rowData.role === 40) {
                    return "Dekan"
                }
            }
        },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                if (profile && profile.roleInString !== "LECTURER") {
                    return (
                        <div>
                            {/* <IconButton size="small" onClick={() => router.push(`/users/${rowData.id}`)} >
                                <EditIcon />
                            </IconButton> */}
                            <IconButton size="small" onClick={() => {
                                setMahasiswaId(rowData.id)
                                toggleOpenConfirmation()
                            }} >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <IconButton size="small" onClick={() => router.push(`/users/${rowData.id}`)} >
                                <PreviewIcon />
                            </IconButton>
                        </div>
                    )
                }

            }
        }
    ];

    const customToolbarActions = () => {
        if (profile && profile.roleInString !== "LECTURER") {
            return (
                <Button size="small" onClick={() => {
                    router.push("/users/create")

                }} color="primary" variant="contained">
                    Tambah Pengguna
                </Button>
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
                <Container maxWidth={false}>
                    <ToolbarComponent title="Daftar Pengguna" customRender={customToolbarActions} />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            busy={isLoading}
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => deleteData(mahasiswaId)} />
            </Box>
        </>
    )
}
Users.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
