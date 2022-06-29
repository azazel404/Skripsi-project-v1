import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router";


import UploadAPI from "~/src/api/UploadAPI";
import AnnouncementAPI from "~/src/api/AnnouncementAPI";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import Helpers from "~/src/helpers";
import TextField from '@mui/material/TextField';
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInputs {
    title: string;
    description: string;
}


const CreateAnnouncement = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [attachment, setAttachment] = useState("")

    const schema = yup.object({
        title: yup.string().required("Judul wajib diisi"),
        description: yup.string().required("Deskripsi wajib diisi"),
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
    });


    const getAttachment = (event: any) => {
        event.preventDefault();
        setLoadingUpload(true)
        var formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadAPI.attachDoc(formData).then(res => {
            setAttachment(res?.data.file_name);
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setLoadingUpload(false);
            })
    }


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsFetching(true);
        let payload = {
            title: values.title,
            description: values.description,
            file_name: attachment,
        }

        AnnouncementAPI.create(payload)
            .then((res: any) => {
                router.push("/announcement")
                dispatch(openNotificationToast("Berhasil menambahkan pengumuman"));
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    };



    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                paddingTop: '24px',
                paddingBottom: '24px'
            }}
        >
            <Container >
                <Card>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2
                        }}
                    >
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Tambah Pengumuman</span>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            disabled={isFetching}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Simpan
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent>
                        {isFetching ? "loading" : <>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <span>Judul</span>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                size="small"
                                                {...field}
                                                disabled={isFetching}
                                                variant="outlined"
                                                error={!!errors.title}
                                                helperText={errors.title ? errors.title?.message : ''}
                                                fullWidth
                                                margin="dense"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <span>Deskripsi</span>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                size="small"
                                                {...field}
                                                disabled={isFetching}
                                                variant="outlined"
                                                multiline
                                                rows={12}
                                                error={!!errors.description}
                                                helperText={errors.description ? errors.description?.message : ''}
                                                fullWidth
                                                margin="dense"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <div style={{ marginBottom: '6px' }}>Attachment</div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="contained-button-file">
                                            <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={getAttachment} />
                                            <Button size="small" variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                        {attachment && <span style={{ marginLeft: '12px' }}>{attachment}</span>}
                                    </div>
                                </Grid>

                            </Grid></>}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}


CreateAnnouncement.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateAnnouncement;