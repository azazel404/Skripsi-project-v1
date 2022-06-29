import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, IconButton } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import LecturerAPI from "~/src/api/LecturerAPI";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PreviewIcon from '@mui/icons-material/Preview';
import { Router } from "next/router";

import { openErrorToast } from "~/src/actions";
import Helpers from "../../helpers";


const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));



const Bimbingan = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.general.profile);

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [dataSource, setDataSource] = useState({
        data: [],
        count: ""
    })
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
        LecturerAPI.listBimbingan(query, profile.id)
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
            displayName: 'NIDN',
            name: 'registration_number'
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
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        <IconButton size="small" onClick={() => {
                            localStorage.setItem("USER", rowData);
                            router.push(`/bimbingan/history?userId=${rowData.id}&lecturerId=${rowData.thesis_advisor_id.id}`)
                        }} >
                            <PreviewIcon />
                        </IconButton>
                    </div>
                )

            }
        }
    ];

    const customToolbarActions = () => {
        return (
            <Button size="small" onClick={() => {
                router.push("/lecturer/create")

            }} color="primary" variant="contained">
                Lakukan Bimbingan
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
                    <ToolbarComponent title="Bimbingan"
                    // customRender={customToolbarActions}
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
Bimbingan.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Bimbingan;
