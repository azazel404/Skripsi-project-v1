import React, { useEffect, useState } from "react";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import LecturerAPI from "~/src/api/LecturerAPI";
import AnnouncementAPI from "~/src/api/AnnouncementAPI";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Router } from "next/router";
import Helpers from "~/src/helpers";
import { useDispatch } from "react-redux";
import { openErrorToast } from "~/src/actions";

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));

const Announcement = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch()
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
        role: 4
    })


    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }

    const onDelete = () => {
        setIsLoading(true);
        AnnouncementAPI.delete(detail.id)
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
        AnnouncementAPI.get(query)
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
            name: 'title',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.title}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Deskripsi',
            name: 'description',
            customRender: (rowData: any) => {
                if (rowData.description.length > 28) {
                    return (
                        <span>
                            {rowData.description.substring(0, 28) + "..."}
                        </span>
                    )
                }
                else {
                    return (
                        <span>
                            {rowData.description}
                        </span>
                    )
                }
            }
        },
        {
            displayName: 'Tanggal diposting',
            name: 'created_at'
        },

        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        <IconButton size="small" onClick={() => router.push(`/announcement/${rowData.id}`)} >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => {
                            toggleOpenConfirmation();
                            setDetail(rowData)
                        }} >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )
            }
        }
    ];



    const customToolbarActions = () => {
        return (
            <Button size="small" onClick={() => {
                router.push("/announcement/create")

            }} color="primary" variant="contained">
                Buat Pengumuman
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
                    <ToolbarComponent title="Pengumuman" customRender={customToolbarActions} />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource.data}
                            count={dataSource.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => onDelete()} />
            </Box>
        </>
    )
}
Announcement.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Announcement;
