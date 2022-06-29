import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Helpers from "../../../helpers";
import UploadAPI from "../../../api/UploadAPI";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import LecturerAPI from "~/src/api/LecturerAPI";

interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any
}

interface IFormInputs {
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    penguji1: string;
    penguji2: string;
    penguji3: string;
}

const ScheduleSeminarModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal } = props;
    const [initialValues, setInitialValues] = useState({
        date: null,
        start_time: null,
        end_time: null,
        location: null,
        penguji1: null,
        penguji2: null,
        penguji3: null,
    })
    const [dosenOptions, setDosenOptions] = useState([]);

    const schema = yup.object({
        date: yup.string().required("Tanggal Seminar wajib diisi"),
        start_time: yup.string().required("Waktu Mulai wajib diisi"),
        end_time: yup.string().required("Waktu Berakhir wajib diisi"),
        location: yup.string().required("Lokasi wajib diisi"),
        penguji1: yup.string().required("Penguji 1 wajib diisi"),
        penguji2: yup.string().required("Penguji 2 wajib diisi"),
        penguji3: yup.string().required("Penguji 3 wajib diisi"),


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
        setInitialValues(detail);
        reset(detail)
    }, [detail, reset])



    useEffect(() => {
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
    }, [])

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        let payload = {
            date: Helpers.postDate(data.date),
            start_time: Helpers.changeDateFormat(data.start_time, "HH:mm"),
            end_time: Helpers.changeDateFormat(data.end_time, "HH:mm"),
            location: data.location,
            submission_attachment_approver_ids: [data.penguji1, data.penguji2, data.penguji3]
        }
        onSubmitModal(payload);
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
                    Jadwal Seminar Proposal
                </DialogTitle>
                <DialogContent>
                    <p>Tanggal Seminar</p>
                    <Controller
                        name="date"
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
                                            // disabled={isFetching}
                                            size="small"
                                            error={!!errors.date}
                                            helperText={errors.date ? errors.date?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    />
                    <p>Waktu Mulai</p>
                    <Controller
                        name="start_time"
                        control={control}

                        render={({ field }) => (
                            <MobileTimePicker
                                {...field}
                                ampm={false}
                                ampmInClock={false}
                                // inputFormat="MM/dd/yyyy"
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            style={{ marginBottom: '10px', marginTop: '10px', width: '100%' }}
                                            {...params}
                                            // disabled={isFetching}
                                            size="small"
                                            error={!!errors.start_time}
                                            helperText={errors.start_time ? errors.start_time?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    />
                    <p>Waktu Berakhir</p>
                    {/* <Controller
                        name="end_time"
                        control={control}

                        render={({ field }) => (
                            <MobileTimePicker
                                {...field}
                                ampm={false}
                                ampmInClock={false}
                                // inputFormat="MM/dd/yyyy"
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            style={{ marginBottom: '10px', marginTop: '10px', width: '100%' }}
                                            {...params}
                                            // disabled={isFetching}
                                            size="small"
                                            error={!!errors.end_time}
                                            helperText={errors.end_time ? errors.end_time?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    /> */}
                    <p>Lokasi</p>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                error={!!errors.location}
                                helperText={errors.location ? errors.location?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <p>Dosen Penguji 1</p>
                    <Controller
                        name="penguji1"
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
                                            error={!!errors.penguji1}
                                        >
                                            {dosenOptions.map((item: any, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        {errors.penguji1 ? <FormHelperText style={{ color: '#D14343' }}>{errors.penguji1?.message}</FormHelperText> : ''}
                                    </FormControl>
                                )
                            )
                        }}
                    />
                    <p>Dosen Penguji 2</p>
                    <Controller
                        name="penguji2"
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
                                            error={!!errors.penguji2}
                                        >
                                            {dosenOptions.map((item: any, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        {errors.penguji2 ? <FormHelperText style={{ color: '#D14343' }}>{errors.penguji2?.message}</FormHelperText> : ''}
                                    </FormControl>
                                )
                            )
                        }}
                    />
                    <p>Dosen Penguji 3</p>
                    <Controller
                        name="penguji3"
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
                                            error={!!errors.penguji3}
                                        >
                                            {dosenOptions.map((item: any, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        {errors.penguji3 ? <FormHelperText style={{ color: '#D14343' }}>{errors.penguji3?.message}</FormHelperText> : ''}
                                    </FormControl>
                                )
                            )
                        }}
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

export default ScheduleSeminarModal;