import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import LecturerAPI from "~/src/api/LecturerAPI";
import MajorAPI from "~/src/api/MajorAPI";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";

import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
// import Autocomplete from '@mui/material/Autocomplete';
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Divider,
    Grid,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Helpers from "../../helpers";
import { Loader } from "~/src/components/loader";

import { useDispatch, useSelector } from "react-redux"
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"


interface IFormInputs {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    registration_number: string;
    phone_number: string;
    birthdate: string;
    major_id: string | null;
    gender: string | null;
    role: string | null;
}


const DetailLecturer = (props: any) => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.general.profile);

    const [initialValues, setInitialValues] = useState({
        birthdate: null,
        email: null,
        first_name: null,
        gender: null,
        last_name: null,
        password: null,
        phone_number: null,
        registration_number: null,
        major_id: null,
        role: null
    })
    const [isFetching, setIsFetching] = useState(false);
    const [majorOptions, setMajorOptions] = useState([])

    const schema = yup.object({
        first_name: yup.string().required("Nama Depan wajib diisi"),
        last_name: yup.string().required("Nama Belakang wajib diisi"),
        email: yup.string().email().required("Email wajib diisi"),
        // password: yup.string().required("Password wajib diiisi"),
        registration_number: yup.string().required("NIDN wajib diisi"),
        birthdate: yup.string().required("Tanggal Lahir wajib diisi"),
        phone_number: yup.string().required("Phone Number wajib diisi"),
        gender: yup.string().required("Jenis Kelamin wajib diisi").nullable(),
        major_id: yup.string().required("Program Studi wajib diisi").nullable(),
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


    const retrieveDetailUser = () => {
        setIsFetching(true);
        LecturerAPI.getById(id).then((res: any) => {
            const { password, ...rest } = res.data;
            let initial = {
                ...rest,
                major_id: rest.major.id,
            }
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


    const reloadDataSource = () => {
        retrieveDetailUser();
    }
    useEffect(() => {
        reloadDataSource();
    }, [id, reset])



    useEffect(() => {
        if (id) {
            MajorAPI.dataSource().then(res => {

                let option = res?.data.map((item: any) => {
                    return { value: item.id, label: item.name }
                })
                setMajorOptions(option)
            })
        }
    }, [id])


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsFetching(true);
        let payload = {
            birthdate: values.birthdate,
            email: values.email,
            first_name: values.first_name,
            gender: values.gender,
            last_name: values.last_name,
            password: values.password,
            phone_number: values.phone_number,
            registration_number: values.registration_number,
            major_id: values.major_id,
            role: values.role
        }


        LecturerAPI.update(id, payload)
            .then((res: any) => {
                dispatch(openNotificationToast("Berhasil ubah data dosen"));
                router.push("/lecturer")
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    };

    const genderOptions = [
        { value: 0, label: "MALE", },
        { value: 1, label: "FEMALE" },
    ]
    const roleOptions = [
        { value: 30, label: "DOSEN", },
        { value: 50, label: "KORDINATOR PROGRAM STUDI" },
    ]

    let profilePermission;
    if (profile) {
        profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
    }
    const readOnly = Helpers.restrict(profilePermission, ["lecturer", "dekan", "ketua_prodi"])

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
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{readOnly ? "Detail" : "Ubah"} Dosen</span>
                        {!readOnly && <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Simpan
                        </Button>}

                    </Box>
                    <Divider />
                    <CardContent>
                        {isFetching ?
                            <div style={{ minHeight: '500px', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Loader />
                            </div>
                            : <>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Nama Depan</span>
                                        <Controller
                                            name="first_name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    {...field}
                                                    disabled={readOnly}
                                                    variant="outlined"
                                                    error={!!errors.first_name}
                                                    helperText={errors.first_name ? errors.first_name?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Nama Belakang</span>
                                        <Controller
                                            name="last_name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    {...field}
                                                    disabled={readOnly}
                                                    variant="outlined"
                                                    error={!!errors.last_name}
                                                    helperText={errors.last_name ? errors.last_name?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <p>Jenis Kelamin</p>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    (
                                                        <FormControl fullWidth style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                            <Select
                                                                {...field}
                                                                disabled={readOnly}
                                                                labelId="demo-simple-select-error-label"
                                                                id="demo-simple-select-error"
                                                                size="small"
                                                                error={!!errors.gender}
                                                            >
                                                                {genderOptions.map((item: any, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                                    )
                                                                })}
                                                            </Select>
                                                            {errors.gender ? <FormHelperText style={{ color: '#D14343' }}>{errors.gender?.message}</FormHelperText> : ''}
                                                        </FormControl>
                                                    )
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Tanggal Lahir</span>
                                        <Controller
                                            name="birthdate"
                                            control={control}

                                            render={({ field }) => (
                                                <MobileDatePicker
                                                    {...field}
                                                    disabled={readOnly}
                                                    inputFormat="MM/dd/yyyy"
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                style={{ marginBottom: '10px', marginTop: '10px', width: '100%' }}
                                                                {...params}
                                                                size="small"
                                                                error={!!errors.birthdate}
                                                                helperText={errors.birthdate ? errors.birthdate?.message : ''}
                                                            />
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>NIDN</span>
                                        <Controller
                                            name="registration_number"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    {...field}
                                                    disabled={readOnly}
                                                    variant="outlined"
                                                    error={!!errors.registration_number}
                                                    helperText={errors.registration_number ? errors.registration_number?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Phone Number</span>
                                        <Controller
                                            name="phone_number"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    disabled={readOnly}
                                                    {...field}
                                                    type="number"
                                                    variant="outlined"
                                                    error={!!errors.phone_number}
                                                    helperText={errors.phone_number ? errors.phone_number?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Email</span>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    disabled={readOnly}
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {!readOnly && <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>Password</span>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    {...field}
                                                    disabled={readOnly}
                                                    type="password"

                                                    variant="outlined"
                                                    error={!!errors.password}
                                                    helperText={errors.password ? errors.password?.message : ''}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                            )}
                                        />
                                    </Grid>}

                                    <Grid
                                        item
                                        md={6}
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
                                                                disabled={readOnly}
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
                                        md={6}
                                        xs={12}
                                    >
                                        <p>Status</p>
                                        <Controller
                                            name="role"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    (
                                                        <FormControl fullWidth style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                            <Select
                                                                {...field}
                                                                disabled={readOnly}
                                                                labelId="demo-simple-select-error-label"
                                                                id="demo-simple-select-error"
                                                                size="small"
                                                                error={!!errors.role}
                                                            >
                                                                {roleOptions.map((item: any, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                                    )
                                                                })}
                                                            </Select>
                                                            {errors.role ? <FormHelperText style={{ color: '#D14343' }}>{errors.role?.message}</FormHelperText> : ''}
                                                        </FormControl>
                                                    )
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid></>}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}


DetailLecturer.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DetailLecturer;