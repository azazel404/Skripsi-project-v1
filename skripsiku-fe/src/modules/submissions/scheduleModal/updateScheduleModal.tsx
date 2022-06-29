
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
    onSubmitModal?: any,
    isLoading?: boolean
}

interface IFormInputs {
    date: string;
    start_time: string;
    end_time: string;
    location: string;

}

const ScheduleSeminarModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal, isLoading } = props;
    const [initialValues, setInitialValues] = useState({
        date: null,
        start_time: null,
        end_time: null,
        location: null,

    })
    const [dosenOptions, setDosenOptions] = useState([]);

    const schema = yup.object({
        date: yup.string().required("Tanggal Seminar wajib diisi"),
        start_time: yup.string().required("Waktu Mulai wajib diisi"),
        end_time: yup.string().required("Waktu Berakhir wajib diisi"),
        location: yup.string().required("Lokasi wajib diisi"),


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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
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
                    <Controller
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
                                            disabled={isLoading}
                                            size="small"
                                            error={!!errors.end_time}
                                            helperText={errors.end_time ? errors.end_time?.message : ''}
                                        />
                                    )
                                }}
                            />
                        )}
                    />
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
                                disabled={isLoading}
                                error={!!errors.location}
                                helperText={errors.location ? errors.location?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} variant="outlined" size="small" onClick={handleClose}>Batal</Button>
                    <Button disabled={isLoading} variant="contained" size="small" onClick={handleSubmit(onSubmit)} autoFocus>
                        {isLoading ? "Sedang di Proses..." : "Simpan"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleSeminarModal;