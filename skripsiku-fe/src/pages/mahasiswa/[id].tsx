import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import UserAPI from "~/src/api/UserAPI";
import UserAbstractApproverAPI from "~/src/api/UserAbstractApproverAPI";
import LecturerAPI from "~/src/api/LecturerAPI";
import MajorAPI from "~/src/api/MajorAPI";
import ClassOfAPI from "~/src/api/ClassOfAPI";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import TableDynamic from "../../components/table/tableComponent";
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { Loader } from "~/src/components/loader";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux"
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import Helpers from "../../helpers";


const FormModalApprover = dynamic(() => import('../../modules/mahasiswa/formModalApprover'));
const ConfirmationModal = dynamic(() => import("../../components/dialogConfirmation"));

interface IFormInputs {
    email: string | null | undefined,
    password: string | null | undefined,
    first_name: string | null | undefined,
    last_name: string | null | undefined,
    registration_number: string | null | undefined,
    phone_number: string | null | undefined,
    class_of: string | null | undefined,
    birthdate: string | null | undefined,
    major_id: string | null | undefined,
    gender: string | null | undefined,
    thesis_advisor_id: string | null | undefined,
}


const DetailMahasiswa = (props: any) => {
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
        class_of: null,
        registration_number: null,
        major_id: null,
        thesis_advisor_id: null
    })
    const [isFetching, setIsFetching] = useState(false);
    const [detail, setDetail] = useState({})
    const [majorOptions, setMajorOptions] = useState([])
    const [dosenOptions, setDosenOptions] = useState([]);
    const [classOfOptions, setClassOfOptions] = useState([])
    const [approvers, setApprovers] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

    const schema = yup.object({
        first_name: yup.string().required("Nama Depan wajib diisi"),
        last_name: yup.string().required("Nama Belakang wajib diisi"),
        email: yup.string().email().required("Email wajib diisi"),
        // password: yup.string().required("Password wajib diiisi"),
        registration_number: yup.string().required("NIM wajib diisi"),
        birthdate: yup.string().required("Tanggal Lahir wajib diisi"),
        phone_number: yup.string().required("Phone Number wajib diisi"),
        class_of: yup.string().required("Angkatan wajib diisi"),
        gender: yup.string().required("Jenis Kelamin wajib diisi").nullable(),
        major_id: yup.string().required("Program Studi wajib diisi").nullable(),
        // thesis_advisor_id: yup.string().required("Dosen Pembimbing wajib diisi").nullable(),
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

    const toggleOpenModal = () => {
        setIsOpen(!isOpen);
    }

    const toggleOpenConfirmation = () => {
        setIsOpenConfirmation(!isOpenConfirmation);
    }

    const retrieveDetailUser = () => {
        setIsFetching(true);
        UserAPI.getById(id).then((res: any) => {
            let initial = {
                ...res.data,
                major_id: res.data.major.id,
                thesis_advisor_id: res.data.thesis_advisor && res.data.thesis_advisor.id
            }
            setInitialValues(initial);
            reset(initial)
        })
            .catch(err => {
                console.log({ err })
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    }

    const retrieveApprovers = () => {
        setIsFetching(true);
        UserAbstractApproverAPI.get(id).then((res: any) => {
            setApprovers(res.data);
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
        retrieveApprovers();
    }
    useEffect(() => {
        if (id) {
            console.log("id", id);
            reloadDataSource();
        }
    }, [id, reset])



    useEffect(() => {
        MajorAPI.dataSource().then(res => {

            let option = res?.data.map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setMajorOptions(option)
        })
    }, [])

    useEffect(() => {
        let paylod = {
            page: 1,
            limit: 999999999
        }
        ClassOfAPI.get(paylod).then(res => {

            let option = res?.data.data.map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setClassOfOptions(option)
        })
    }, [])

    useEffect(() => {
        if (id) {
            let query = {
                page: 1,
                limit: 9999999
            }
            LecturerAPI.get(query).then(res => {

                let option = res?.data.data.map((item: any) => {
                    return { value: item.id, label: `${item.first_name} ${item.last_name}` }
                })
                setDosenOptions(option)
            })
        }
    }, [id])

    const saveApprover = (values: any) => {
        setIsFetching(true);
        let payload = {
            user_id: parseInt(id),
            lecturer_id: values.lecturer_id.value,
        }
        UserAbstractApproverAPI.create(payload)
            .then((res: any) => {
                dispatch(openNotificationToast("Berhasil menambahkan penguji mahasiswa"));
                toggleOpenModal();
                reloadDataSource()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    }

    const deleteApprover = () => {
        setIsFetching(true);
        UserAbstractApproverAPI.delete(detail.id)
            .then((res: any) => {
                dispatch(openNotificationToast("Berhasil hapus penguji mahasiswa"));
                toggleOpenConfirmation();
                reloadDataSource()
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    }


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {

        let payload = {
            id: id,
            birthdate: values.birthdate,
            email: values.email,
            first_name: values.first_name,
            gender: values.gender,
            last_name: values.last_name,
            password: values.password,
            phone_number: values.phone_number,
            class_of: values.class_of,
            registration_number: values.registration_number,
            major_id: values.major_id,
            thesis_advisor_id: values.thesis_advisor_id
        }

        if (approvers.length > 0) {
            setIsFetching(true);
            UserAPI.update(id, payload)
                .then((res: any) => {
                    dispatch(openNotificationToast("Berhasil ubah data mahasiswa"));
                    router.push("/mahasiswa")
                })
                .catch(err => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsFetching(false);
                })
        }
        else {
            dispatch(openErrorToast("Minimal Masukan Satu Daftar Penguji Judul T.A"));
        }


    };

    const genderOptions = [
        { value: 0, label: "MALE", },
        { value: 1, label: "FEMALE" },
    ]


    let profilePermission;
    if (profile) {
        profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
    }
    const readOnly = Helpers.restrict(profilePermission, ["lecturer"]);

    const columns = [
        {
            displayName: 'Nama Penguji',
            name: 'name',
            customRender: (rowData: any) => {
                return (
                    <span>
                        {`${rowData.lecturer.first_name} ${rowData.lecturer.last_name}`}
                    </span>
                )
            }
        },
        {
            displayName: 'Aksi',
            customRender: (rowData: any) => {
                return (
                    <div>
                        {!readOnly && <IconButton size="small" onClick={() => {
                            setDetail(rowData);
                            toggleOpenConfirmation();
                        }} >
                            <DeleteIcon />
                        </IconButton>}
                    </div>
                )
            }
        }
    ];



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
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{readOnly ? "Detail" : "Ubah"} Mahasiswa</span>
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
                            :
                            <>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <span>NIM</span>
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
                                                    inputFormat="MM/dd/yyyy"
                                                    disabled={readOnly}
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
                                        <p>Tahun Ajaran</p>
                                        <Controller
                                            name="class_of"
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
                                                                error={!!errors.class_of}
                                                            >
                                                                {classOfOptions.map((item: any, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={item.label}>{item.label}</MenuItem>
                                                                    )
                                                                })}
                                                            </Select>
                                                            {errors.class_of ? <FormHelperText style={{ color: '#D14343' }}>{errors.class_of?.message}</FormHelperText> : ''}
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
                                        <span>Phone Number</span>
                                        <Controller
                                            name="phone_number"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                                    size="small"
                                                    {...field}
                                                    type="number"
                                                    variant="outlined"
                                                    disabled={readOnly}
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
                                                    {...field}
                                                    disabled={readOnly}
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
                                        <p>Dosen Pembimbing</p>
                                        <Controller
                                            name="thesis_advisor_id"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    (
                                                        <FormControl fullWidth style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                            <Select
                                                                disabled={readOnly}
                                                                {...field}
                                                                labelId="demo-simple-select-error-label"
                                                                id="demo-simple-select-error"
                                                                size="small"
                                                                error={!!errors.thesis_advisor_id}
                                                            >
                                                                {dosenOptions.map((item: any, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                                    )
                                                                })}
                                                            </Select>
                                                            {errors.thesis_advisor_id ? <FormHelperText style={{ color: '#D14343' }}>{errors.thesis_advisor_id?.message}</FormHelperText> : ''}
                                                        </FormControl>
                                                    )
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid></>}
                    </CardContent>

                </Card>
                <div style={{ marginTop: '14px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 2
                        }}
                    >
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Daftar Penguji Judul T.A</span>

                        {!readOnly && <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => {
                                toggleOpenModal();
                            }}
                        >
                            Tambah
                        </Button>}
                    </Box>
                    <TableDynamic
                        data={approvers}
                        count={0}
                        columns={columns}
                    />
                    <FormModalApprover open={isOpen} handleClose={toggleOpenModal} onSubmitModal={saveApprover} />
                    <ConfirmationModal open={isOpenConfirmation} handleClose={toggleOpenConfirmation} handleSubmit={deleteApprover} />
                </div>
            </Container>
        </Box>
    )
}


DetailMahasiswa.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default DetailMahasiswa;