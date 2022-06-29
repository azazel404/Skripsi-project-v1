import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Avatar
} from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; ``
import * as yup from "yup";
import Helpers from '~/src/helpers';
import { useDispatch } from "react-redux"
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"

import UploadAPI from "../../api/UploadAPI";
import AuthAPI from "../../api/AuthAPI";
interface IFormInputs {
    first_name: string;
    last_name: string;
    phone_number: string;
    birthdate: string;

    gender: {} | null;
}

export const AccountProfileDetails = (props: any) => {

    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const [profile, setProfile] = useState({})
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [image, setImage] = useState({
        file_name: "",
        file_path: ""
    })
    const [showImage, setShowImage] = useState({
        file_name: "",
        file_path: ""
    })

    const schema = yup.object({
        first_name: yup.string().required("Nama Depan wajib diisi"),
        last_name: yup.string().required("Nama Belakang wajib diisi"),
        birthdate: yup.string().required("Tanggal Lahir wajib diisi"),
        phone_number: yup.string().required("Phone Number wajib diisi"),
        gender: yup.number().required("Jenis Kelamin wajib diisi").nullable(),

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
        defaultValues: profile
    });



    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsFetching(true);

        let payload = {
            file_name: image.file_name,
            email: profile.email,
            first_name: values.first_name,
            last_name: values.last_name,
            gender: values.gender,
            phone_number: values.phone_number,
            birthdate: values.birthdate,
        }

        AuthAPI.updateProfile(payload)
            .then((res: any) => {
                getProfile()
                dispatch(openNotificationToast("Berhasil ubah data profile"));
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    };

    const getProfile = () => {
        setIsFetching(true);
        AuthAPI.profile().then(res => {

            let file_path = {}
            if (res?.data.profile_picture) {
                if (res?.data.profile_picture.file_name !== undefined) {
                    file_path = res?.data.profile_picture.file_name;
                }
            }

            let initial = {
                email: res?.data.email,
                first_name: res?.data.first_name,
                last_name: res?.data.last_name,
                gender: res?.data.gender,
                phone_number: res?.data.phone_number,
                birthdate: res?.data.birthdate,
            }
            setShowImage({
                file_name: "my-profile",
                file_path: file_path
            })

            setProfile(initial);
            reset(initial);
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
        getProfile()
    }, [])



    const getFileImage = (event: any) => {
        event.preventDefault();
        setLoadingUpload(true)
        var formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadAPI.attach(formData).then((res: any) => {
            setImage(res?.data);
            setShowImage(res?.data);
        })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setLoadingUpload(false);
            })
    }


    const genderOptions = [
        { value: 0, label: "MALE", },
        { value: 1, label: "FEMALE" },
    ]


    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2
                    }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Akun Saya</span>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        // disabled={isFetching}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Simpan
                    </Button>
                </Box>
                {/* <Divider /> */}
                <CardContent>
                    {isFetching ? "loading" : <>
                        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center' }}>
                            {showImage && showImage.file_path ? <Avatar
                                alt="Remy Sharp"
                                src={showImage.file_path}
                                sx={{ width: 56, height: 56 }}
                            />
                                :
                                <Avatar sx={{ width: 56, height: 56 }} />
                            }

                            <div style={{ marginLeft: '16px' }}>
                                <label htmlFor="contained-button-file">
                                    <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={(e) => getFileImage(e)} />
                                    <Button size="small" variant="outlined" component="span">
                                        Ubah Gambar
                                    </Button>
                                </label>

                            </div>
                        </div>
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
                                            disabled={isFetching}
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
                                            disabled={isFetching}
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
                                <span>Jenis Kelamin</span>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => {
                                        let initialGender = genderOptions.filter(item => item.value === field.value);
                                        return (
                                            (
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-major"
                                                    options={genderOptions}
                                                    defaultValue={initialGender[0]}
                                                    onChange={(e, value) => setValue('gender', value)}
                                                    sx={{ width: '100%' }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                                {...params}
                                                                size="small"
                                                                disabled={isFetching}
                                                                error={!!errors.gender}
                                                                helperText={errors.gender ? errors.gender?.value.message : ''}
                                                            />
                                                        )
                                                    }}
                                                />

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
                                            inputFormat="MM/dd/yyyy"
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        style={{ marginBottom: '10px', marginTop: '10px', width: '100%' }}
                                                        {...params}
                                                        disabled={isFetching}
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
                                <span>Phone Number</span>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            style={{ marginBottom: '10px', marginTop: '10px' }}
                                            size="small"
                                            {...field}
                                            disabled={isFetching}
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

                        </Grid></>}
                </CardContent>
            </Card>
        </form>
    );
};
