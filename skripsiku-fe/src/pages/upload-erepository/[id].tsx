import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router";

import MajorAPI from "~/src/api/MajorAPI";
import UploadAPI from "~/src/api/UploadAPI";
import ERepositoryAPI from "~/src/api/ERepositoryAPI";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import Helpers from "~/src/helpers";
import TextField from '@mui/material/TextField';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
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
    name: string;
    description: string;
    publisher: string;
    year: string;
    major_id: string;

}


const DetailERepository = (props: any) => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [fileRepo, setFileRepo] = useState("")
    const [initialValues, setInitialValues] = useState(null)
    const [majorOptions, setMajorOptions] = useState([])

    const schema = yup.object({
        name: yup.string().required("Judul wajib diisi"),
        year: yup.string().required("Tahun Terbit wajib diisi"),
        major_id: yup.string().required("Program Studi wajib diisi").nullable(),
        description: yup.string().required("Abstrak wajib diisi"),
        publisher: yup.string().required("Publisher wajib diisi"),
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
        MajorAPI.dataSource().then(res => {
            let option = res?.data.map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setMajorOptions(option)
        })
    }, [])

    const getFileRepository = (event: any) => {
        setLoadingUpload(true)
        var formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadAPI.attachDoc(formData).then(res => {
            setFileRepo(res?.data.file_name);
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setLoadingUpload(false);
            })
    }


    const retrieveDetailRepository = () => {
        setIsFetching(true);
        ERepositoryAPI.getById(id).then((res: any) => {
            let initial = {
                ...res.data,
                file_name: res.data.attachment.file_name
            }
            setFileRepo(initial.file_name)
            setInitialValues(initial);
            reset(initial)
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    }

    useEffect(() => {
        retrieveDetailRepository();
    }, [id, reset])


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsFetching(true);
        let payload = {
            name: values.name,
            description: values.description,
            publisher: values.publisher,
            year: values.year,
            file_name: fileRepo,
            status: 0,
            major_id: values.major_id,
        }

        ERepositoryAPI.update(id, payload)
            .then((res: any) => {
                router.push("/upload-erepository")
                dispatch(openNotificationToast("Berhasil mengubah e-repository"));
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
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Ubah E-Repository</span>

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
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                size="small"
                                                {...field}
                                                disabled={isFetching}
                                                variant="outlined"
                                                error={!!errors.name}
                                                helperText={errors.name ? errors.name?.message : ''}
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
                                    <span>Publisher</span>
                                    <Controller
                                        name="publisher"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                size="small"
                                                {...field}
                                                disabled={isFetching}
                                                variant="outlined"
                                                error={!!errors.publisher}
                                                helperText={errors.publisher ? errors.publisher?.message : ''}
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
                                    <p>Program Studi</p>
                                    <Controller
                                        name="major_id"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                (
                                                    <FormControl fullWidth style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                        <Select
                                                            {...field}
                                                            labelId="demo-simple-select-error-label"
                                                            id="demo-simple-select-error"
                                                            size="small"
                                                            error={!!errors.major_id}
                                                        >
                                                            {majorOptions.map((item: any, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                        {errors.major_id ? <FormHelperText style={{ color: '#D14343' }}>{errors.major_id?.message}</FormHelperText> : ''}
                                                    </FormControl>
                                                )
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <span>Tahun Terbit</span>
                                    <Controller
                                        name="year"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                size="small"
                                                {...field}
                                                disabled={isFetching}
                                                variant="outlined"
                                                error={!!errors.year}
                                                helperText={errors.year ? errors.year?.message : ''}
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
                                    <span>Abstrak</span>
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
                                                rows={14}
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
                                    <div style={{ marginBottom: '6px' }}>File E-Repository</div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="contained-button-file">
                                            <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={getFileRepository} />
                                            <Button size="small" variant="outlined" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                        {fileRepo && <span style={{ marginLeft: '12px' }}>{fileRepo}</span>}
                                    </div>
                                </Grid>

                            </Grid></>}
                        <div style={{ marginTop: '42px', width: '100%' }}>
                            <Button
                                color="primary"
                                style={{ width: '100%' }}
                                variant="contained"
                                size="small"
                                disabled={isFetching}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Simpan
                            </Button>
                        </div>
                    </CardContent>

                </Card>
            </Container>
        </Box>
    )
}


DetailERepository.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DetailERepository;