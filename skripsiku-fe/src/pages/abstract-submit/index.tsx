import React, { useEffect, useState } from "react";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";
import PreviewIcon from '@mui/icons-material/Preview';
import Helpers from "~/src/helpers";
import { openErrorToast } from "~/src/actions";

// const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));
// const FormMajorsModal = dynamic(() => import('../../modules/majors/formModal'));


const AbstractSubmit = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.general.profile);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({})
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        user_id: ""
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
            ...query,
        }
        if (profile) {
            payload.user_id = profile.id
        }

        AbstractSubmissionAPI.get(payload)
            .then((res: any) => {
                setDataSource(res.data);
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
                        <IconButton size="small" onClick={() => router.push(`/abstract-submit/${rowData.id}`)} >
                            <PreviewIcon />
                        </IconButton>
                    </div>
                )
            }
        }
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
                    <ToolbarComponent title="Pengajuan Judul T.A" />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource?.data}
                            count={dataSource?.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                {/* <FormMajorsModal open={isOpen} handleClose={toggleOpenModal} onSubmitModal={saveData} detail={detail} />
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => deleteData(detail)} /> */}
            </Box>
        </>
    )
}
AbstractSubmit.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default AbstractSubmit;
