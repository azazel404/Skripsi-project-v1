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
import Helpers from "~/src/helpers";
import { useDispatch } from "react-redux";
import { openErrorToast } from "~/src/actions";

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));

const ERepository = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        status: 0
    })


    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }



    const onDeleteRepository = () => {
        setIsLoading(true);
        console.log("detail", detail);
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
                    <>
                        <IconButton size="small" onClick={() => router.push(`/upload-erepository/${rowData.id}`)} >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => {
                            setDetail(rowData)
                            toggleOpenConfirmation();

                        }} >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];



    const customToolbarActions = () => {
        return (
            <Button size="small" onClick={() => {
                router.push("/upload-erepository/create")

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
                    <ToolbarComponent title="Upload E-Repository" customRender={customToolbarActions} />
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
            </Box>
        </>
    )
}
ERepository.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default ERepository;
