import React, { useEffect, useState } from "react";
import { Box, Container, Button, IconButton, Tabs, Tab, Paper } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import ERepositoryAPI from "~/src/api/ERepositoryAPI";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import Helpers from "~/src/helpers";
import { openErrorToast } from "~/src/actions";

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));
const ConfirmationActionModal = dynamic(() => import("../../components/dialogConfirmation"));

const ERepository = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const [value, setValue] = React.useState(0);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [isOpenConfirmationAction, setIsOpenConfirmationAction] = useState(false);
    const [typeAction, setTypeAction] = useState("");
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [detail, setDetail] = useState(null);
    const [repositoryId, setRepositoryId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        status: 0
    })


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setQuery((prevState) => ({
            ...prevState,
            status: newValue
        }));
    };

    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }

    const toggleOpenConfirmationAction = () => {
        setIsOpenConfirmationAction(!isOpenConfirmationAction);
    }

    const onDeleteRepository = () => {
        setIsLoading(true);
        ERepositoryAPI.delete(detail.id)
            .then((res: any) => {
                retrieveData();
                toggleOpenConfirmation();
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const takeActionRepository = () => {
        setIsLoading(true);
        let body = {
            status: typeAction === "approved" ? 1 : 2
        }
        ERepositoryAPI.update(repositoryId, body)
            .then((res: any) => {
                retrieveData();
                toggleOpenConfirmationAction();
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const retrieveData = () => {
        setIsLoading(true);
        ERepositoryAPI.get(query)
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
    }, [query])

    const onPaginationUpdate = (pagination: any) => {
        setQuery((prevState) => ({
            ...prevState,
            page: pagination.page,
            limit: pagination.limit,
        }));
    }



    const columns = [
        {
            displayName: 'Judul',
            name: 'name',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.name}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Tahun Terbit',
            name: 'year'
        },
        {
            displayName: 'Publisher',
            name: 'publisher'
        },
        {
            displayName: 'Tanggal diposting',
            name: 'created_at',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {Helpers.changeDateFormat(`${rowData.created_at}`)}
                    </span>
                )
            }
        },

        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        {rowData.status === 0 ?
                            <>
                                <IconButton size="small" onClick={() => {
                                    toggleOpenConfirmationAction();
                                    setRepositoryId(rowData.id);
                                    setTypeAction("approved");
                                }} >
                                    <DoneIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => {
                                    toggleOpenConfirmationAction();
                                    setRepositoryId(rowData.id);
                                    setTypeAction("rejected");
                                }} >
                                    <CloseIcon />
                                </IconButton>
                            </>
                            :
                            rowData.status === 1 ? <>
                                <IconButton size="small" onClick={() => router.push(`/manage-erepository/${rowData.id}`)} >
                                    <EditIcon />
                                </IconButton>
                            </> : <>
                                <IconButton size="small" onClick={() => router.push(`/manage-erepository/${rowData.id}`)} >
                                    <EditIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => {
                                    toggleOpenConfirmation();
                                    setDetail(rowData)
                                }} >
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    </div>
                )
            }
        }
    ];



    const customToolbarActions = () => {
        return (
            <Button size="small" onClick={() => {
                router.push("/manage-erepository/create")

            }} color="primary" variant="contained">
                Tambah
            </Button>
        )
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
                    <ToolbarComponent title="E-Repository" customRender={customToolbarActions} />
                    <Paper elevation={3} sx={{ width: '100%' }}>
                        <Tabs sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none'
                            },
                            mt: 3
                        }} aria-label="basic tabs example" value={value}
                            onChange={handleChange}>
                            <Tab label="Diproses" />
                            <Tab label="Diterima" />
                            <Tab label="Ditolak" />
                        </Tabs>
                    </Paper>
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => onDeleteRepository()} />
                <ConfirmationActionModal description={"Apakah Anda yakin melakukan tindakan ini?"} open={isOpenConfirmationAction} handleClose={toggleOpenConfirmationAction} handleSubmit={() => takeActionRepository()} />
            </Box>
        </>
    )
}
ERepository.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default ERepository;
