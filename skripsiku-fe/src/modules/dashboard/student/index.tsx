import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography, Paper, Card, CardContent, Divider, Grid } from "@mui/material";
import { ToolbarComponent } from "../../../components/toolbar";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import SubmissionPeriodAPI from "~/src/api/SubmissionPeriodAPI";
import AbstractSubmissionAPI from "~/src/api/AbstractSubmissionAPI";
import AnnouncementAPI from "~/src/api/AnnouncementAPI";
import Helpers from "~/src/helpers";
import {
    openNotificationToast,
    openErrorToast
} from "../../../actions"
import EmptyState from "~/src/components/emptyState";
const AbstractSubmissionModal = dynamic(() => import('./abstractSubmissionModal'));
const AnnouncementModal = dynamic(() => import("./announcementModal"));

const DashboardStudent = (props: any) => {
    const profile = useSelector((state: any) => state.general.profile);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false);
    const [submissionId, setSubmissionId] = useState(null);
    const [submissionPeriods, setSubmissionPeriods] = useState({
        data: []
    })
    const [isLoading, setIsLoading] = useState(false);
    const [dataAnnouncement, setDataAnnouncement] = useState([])
    const [detailAnnouncement, setDetailAnnouncement] = useState(null)

    const toggleOpenModal = () => {
        setIsOpen(!isOpen);
    }

    const toggleOpenModalAnnouncement = () => {
        setIsOpenAnnouncement(!isOpenAnnouncement);
    }



    const retrieveSubmissionPeriods = () => {
        setIsLoading(true);
        let payload = {
            page: 1,
            limit: 999999,
            major: profile && profile.major_id,
            class_of: profile && profile.class_of,
        }


        SubmissionPeriodAPI.get(payload)
            .then((res: any) => {
                setSubmissionPeriods(res.data);

            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const retrieveAnnouncement = () => {
        setIsLoading(true);
        let payload = {
            page: 1,
            limit: 999999,
        }

        AnnouncementAPI.get(payload)
            .then((res: any) => {
                setDataAnnouncement(res.data);
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
        retrieveAnnouncement();
    }, [])

    useEffect(() => {
        retrieveSubmissionPeriods();
    }, [profile])

    const submitAbstract = (values: any) => {
        setIsLoading(true);
        let payload = {
            ...values,
            submission_period_id: submissionId,
            sequence: 1,
        }

        AbstractSubmissionAPI.create(payload)
            .then((res: any) => {
                dispatch(openNotificationToast("Berhasil mengajukan draft  T.A"));
                setSubmissionId(null);
                toggleOpenModal();
                retrieveSubmissionPeriods();
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
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
                <Container>
                    {submissionPeriods && submissionPeriods.data.map((item: any, index: any) => {
                        return (
                            <Paper elevation={3} key={index} style={{ display: 'flex', justifyContent: 'space-between', minHeight: '124px', padding: '16px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography style={{ fontSize: '16px', fontWeight: '600' }}>{`Pengumpulan Pengajuan  T.A - ${item.class_of}`}</Typography>
                                    <Typography style={{ fontSize: '12px', color: '#797979;', marginTop: '4px', fontStyle: 'italic' }}>{`${Helpers.changeDateFormat(item.start_date)} - ${Helpers.changeDateFormat(item.end_date)}`}</Typography>
                                    <Typography style={{ fontSize: '12px', marginTop: '4px' }}>{`${item.description}`}</Typography>
                                </div>
                                <div>
                                    <Button size="small" color="primary" variant="contained" onClick={() => {
                                        setSubmissionId(item.id);
                                        toggleOpenModal();
                                    }}>
                                        Ajukan Judul Proposal
                                    </Button>
                                </div>
                            </Paper>
                        )
                    })}
                    <Card style={{ marginTop: '32px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 2
                            }}
                        >
                            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Pengumuman</Typography>
                        </Box>
                        <Divider />

                        <CardContent sx={{ width: '100%', height: '460px', padding: '14px', overflow: 'auto' }}>
                            <Grid container spacing={3} style={{ marginTop: '2px' }}>
                                {dataAnnouncement.data !== undefined && dataAnnouncement.data.length > 0 ? dataAnnouncement.data.map((item: any, index: string) => {
                                    return (
                                        <Grid item xs={6}>
                                            <Paper elevation={3} style={{ display: 'flex', justifyContent: 'space-between', minHeight: '120px', padding: '16px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography style={{ fontSize: '16px', fontWeight: '600' }}>{`${item.title}`}</Typography>
                                                    <Typography style={{ fontSize: '12px', color: '#797979;', marginTop: '4px', fontStyle: 'italic' }}>Dibuat pada tanggal {`${Helpers.changeDateFormat(item.created_at)}`}</Typography>
                                                </div>
                                                <div>
                                                    <Button size="small" color="primary" variant="contained" onClick={() => {
                                                        setDetailAnnouncement(item.id);
                                                        toggleOpenModalAnnouncement();
                                                    }}>
                                                        Selengkapnya
                                                    </Button>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    )
                                }) :
                                    <div style={{ height: '400px', width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <EmptyState text="No Data" />
                                    </div>
                                }

                            </Grid>
                        </CardContent>
                    </Card>
                </Container>

                <AbstractSubmissionModal open={isOpen} handleClose={toggleOpenModal} onSubmitModal={(values: any) => submitAbstract(values)} />
                <AnnouncementModal open={isOpenAnnouncement} detail={detailAnnouncement} handleClose={toggleOpenModalAnnouncement} />
            </Box>
        </>
    )
}

export default DashboardStudent;