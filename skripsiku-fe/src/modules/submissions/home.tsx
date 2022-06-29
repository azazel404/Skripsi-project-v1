import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, TextField } from "@mui/material";
import SubmissionAPI from "~/src/api/SubmissionAPI";
import { Loader } from "~/src/components/loader";
import * as yup from "yup";
import { useRouter } from "next/router";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import Helpers from "../../helpers";
import { StatusSubmission } from "../../helpers/enums";

interface IFormInputs {
    title: string | null | undefined,
}
import ScheduleSeminarModal from "./scheduleModal/scheduleModal";

const HomeAssessment = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);
    const { detailSubmission, submissions, refreshSubmission } = props;

    const [isOpenScheduleSeminar, setIsOpenScheduleSeminar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHaveSeminar, setIsHaveSeminar] = useState(false);

    const [data, setData] = useState({})




    useEffect(() => {
        setIsLoading(true)
        if (submissions.length > 0) {
            setIsLoading(false);
            setData(submissions[submissions.length - 1]);
        }
        else {
            setIsLoading(false)
        }

        if (detailSubmission && detailSubmission.latest_stage < 1) {
            setIsHaveSeminar(true);
        }
        else {
            setIsHaveSeminar(false);

        }
    }, [submissions, detailSubmission])





    const onSubmitSeminar = (values: any) => {
        setIsLoading(true);

        let payload = {
            ...values,
            submission_id: detailSubmission.id
        }
        SubmissionAPI.createSeminar(payload)
            .then(res => {
                dispatch(openNotificationToast("Berhasil Buat Jadwal Seminar"));
                setIsOpenScheduleSeminar(false);
                refreshSubmission()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsLoading(false);
            })
    };


    const renderActionButton = () => {
        let profileId = profile && profile.id;
        let thesis_id = detailSubmission && detailSubmission.user ? detailSubmission.user.thesis_advisor_id : "";

        if (profileId === thesis_id && isHaveSeminar) {
            return (
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    // disabled={!isHaveSeminar}
                    onClick={() => {
                        setIsOpenScheduleSeminar(true);
                    }}
                >
                    Buat Jadwal Seminar
                </Button>
            )
        }
    }


    console.log("isLoading", isLoading)

    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '400px' }}>
                <div style={{ padding: '14px', marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tahap 1 - Pengumpulan Proposal TA</Typography>
                        {!isLoading && renderActionButton()}

                    </div>
                    {isLoading ?
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '340px' }}>
                            <Loader />
                        </div>
                        :
                        <>{!Helpers.IsEmptyObject(detailSubmission) ?
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
                                    <span>Nama Mahasiswa</span>
                                    <TextField
                                        style={{ marginBottom: '10px', marginTop: '10px' }}
                                        value={detailSubmission && `${detailSubmission.user.first_name} ${detailSubmission.user.last_name}`}
                                        size="small"
                                        disabled={true}
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
                                    <span>Judul Proposal</span>
                                    <TextField
                                        style={{ marginBottom: '10px', marginTop: '10px' }}
                                        value={!Helpers.IsEmptyObject(data) && !Helpers.IsEmptyObject(data.submission) ? data.submission.title : ""}
                                        size="small"
                                        multiline
                                        rows={4}
                                        disabled={true}
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                    />
                                </div>
                            </>
                            :
                            null
                        }</>}

                </div>
                <ScheduleSeminarModal isLoading={isLoading} open={isOpenScheduleSeminar} handleClose={() => setIsOpenScheduleSeminar(false)} onSubmitModal={(payload: any) => onSubmitSeminar(payload)} />

            </Paper>
        </>
    )
}

export default HomeAssessment;
