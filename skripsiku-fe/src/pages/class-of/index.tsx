import React, { useEffect, useState } from "react";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import dynamic from "next/dynamic";

// import MajorAPI from "~/src/api/MajorAPI";
import ClassOfAPI from "~/src/api/ClassOfAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));
const FormMajorsModal = dynamic(() => import('../../modules/class-of/formModal'));
import Helpers from "~/src/helpers";
import { openErrorToast } from "~/src/actions";
import { useDispatch } from "react-redux";

const ClassOf = (props: any) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({})
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
    })

    const toggleOpenModal = () => {
        setIsOpen(!isOpen);
    }

    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }
    const retrieveData = () => {
        setIsLoading(true);
        ClassOfAPI.get(query)
            .then((res: any) => {
                setDataSource(res?.data);
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



    const saveData = (values: any) => {
        setIsLoading(true);
        let payload = {
            code: Helpers.generateRandomNDigits(5),
            name: values.name
        }
        let fetch;
        if (values.id) {
            fetch = ClassOfAPI.update(values.id, payload)
        }
        else {
            fetch = ClassOfAPI.create(payload)
        }
        fetch
            .then((res: any) => {
                toggleOpenModal();
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

    const deleteData = (detail: any) => {

        ClassOfAPI.delete(detail.id)
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

    const columns = [
        {
            displayName: 'Kode',
            name: 'code'
        },
        {
            displayName: 'Ajaran',
            name: 'name'
        },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        <IconButton size="small" onClick={() => {
                            setDetail(rowData);
                            toggleOpenModal();
                        }} >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => {
                            setDetail(rowData);
                            toggleOpenConfirmation();
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
            <Button size="small"
                onClick={() => {
                    setDetail({})
                    toggleOpenModal()
                }}
                color="primary"
                variant="contained"
            >
                Tambah Tahun Ajaran
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
                    <ToolbarComponent title="Tahun Ajaran" customRender={customToolbarActions} />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={dataSource?.data}
                            count={dataSource?.count}
                            columns={columns}
                            onPaginationUpdate={pagination => onPaginationUpdate(pagination)}
                        />
                    </Box>
                </Container>
                <FormMajorsModal open={isOpen} handleClose={toggleOpenModal} onSubmitModal={saveData} detail={detail} />
                <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={() => deleteData(detail)} />
            </Box>
        </>
    )
}
ClassOf.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default ClassOf;
