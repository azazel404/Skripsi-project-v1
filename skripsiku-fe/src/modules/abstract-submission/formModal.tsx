import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MajorAPI from "~/src/api/MajorAPI";
import ClassOfAPI from "~/src/api/ClassOfAPI";

import * as yup from "yup";
import Helpers from "../../helpers";




interface CreateModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any,
    profile?: any
}

interface IFormInputs {
    code: string;
    major_id: {} | null;
    class_of: string,
    start_date: string;
    end_date: string;
    description: string;
}

const CreateAbstractSubmission = (props: CreateModalInterface) => {
    const { open, handleClose, detail, onSubmitModal, profile } = props;
    const [initialValues, setInitialValues] = useState({})
    const [majorOptions, setMajorOptions] = useState([])
    const [classOfOptions, setClassOfOptions] = useState([])

    const schema = yup.object({
        class_of: yup.string().required("Tahun Ajaran wajib diisi"),
        major_id: yup.string().required("Program Studi wajib diisi").nullable(),
        start_date: yup.string().required("Tanggal Mulai wajib diisi"),
        end_date: yup.string().required("Tanggal Berakhir wajib diisi"),

    })

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    });



    useEffect(() => {
        MajorAPI.dataSource().then(res => {
            let option;
            if (profile.major_id) {
                option = res?.data.filter(data => data.id === profile.major_id).map((item: any) => {
                    return { value: item.id, label: item.name }
                })
            }
            else {
                option = res?.data.map((item: any) => {
                    return { value: item.id, label: item.name }
                })
            }
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
        setInitialValues(detail);
        reset(detail)
    }, [detail, reset])

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        onSubmitModal(data);
    };


    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Buat Jadwal Pengumpulan
                </DialogTitle>
                <DialogContent>
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
                    <span>Tanggal Mulai</span>
                    <Controller
                        name="start_date"
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

                                            size="small"
                                            error={!!errors.start_date}
                                            helperText={errors.start_date ? errors.start_date?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    />
                    <span>Tanggal Berakhir</span>
                    <Controller
                        name="end_date"
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

                                            size="small"
                                            error={!!errors.end_date}
                                            helperText={errors.end_date ? errors.end_date?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    />
                    <span>Note</span>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                multiline
                                rows={4}
                                variant="outlined"
                                error={!!errors.description}
                                helperText={errors.description ? errors.description?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={handleClose}>Batal</Button>
                    <Button variant="contained" size="small" onClick={handleSubmit(onSubmit)} autoFocus>
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateAbstractSubmission;