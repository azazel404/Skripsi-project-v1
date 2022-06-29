import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Avatar, Typography, Grid, Paper, Divider, Card, CardContent, TextField } from "@mui/material";
import SubmissionAPI from "~/src/api/SubmissionAPI";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import Helpers from "../../helpers";
import { Loader } from "~/src/components/loader";
interface IFormInputs {
    title: string | null | undefined,
}

const HomeAssessment = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);

    const { detailSubmission, readOnly, submissions, refreshSubmission } = props;
    const [initialValues, setInitialValues] = useState({
        title: null,
    })

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({})

    const schema = yup.object({
        title: yup.string().required("Judul wajib diisi"),

    })



    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    });



    useEffect(() => {
        setIsLoading(true)
        if (submissions.length > 0) {
            setData(submissions[submissions.length - 1]);
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }
    }, [submissions])

    useEffect(() => {
        if (!Helpers.IsEmptyObject(data)) {
            let title = data.submission.title;
            reset({ title })
        }
    }, [data, reset])


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsLoading(true);
        let payload = {
            user_id: profile.id,
            title: values.title
        }
        SubmissionAPI.create(payload).then(res => {
            dispatch(openNotificationToast("Berhasil Submit Judul Tugas Akhir"));
            refreshSubmission();
        }).catch(err => {
            let error = Helpers.ErrorHandler(err)
            dispatch(openErrorToast(error.message));
        })
            .finally(() => {
                setIsLoading(false);
            })
    };


    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', marginTop: '24px', minHeight: '400px' }}>
                <div style={{ padding: '14px', marginTop: '24px' }}>
                    <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tahap 1 - Pengumpulan Proposal TA</Typography>
                    {isLoading ? <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '340px' }}>
                        <Loader />
                    </div> : <><div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
                        <span>Judul Proposal</span>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    disabled={!Helpers.IsEmptyObject(data) || isLoading}
                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                    size="small"
                                    multiline
                                    rows={4}
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.title}
                                    helperText={errors.title ? errors.title?.message : ''}
                                    fullWidth
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                        {Helpers.IsEmptyObject(data) && <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>}</>}


                </div>
            </Paper>
        </>
    )
}

export default HomeAssessment;
