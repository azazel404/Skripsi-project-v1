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
    handleClose?: any,
    detail?: any,
    onSubmitModal?: any,
    isLoading?: boolean
}

interface IFormInputs {
    date: string;
}

const GraduationModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal, isLoading } = props;
    const [initialValues, setInitialValues] = useState({
        date: null,

    })
    const [dosenOptions, setDosenOptions] = useState([]);

    const schema = yup.object({
        date: yup.string().required("Tanggal Mulai wajib diisi"),

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





    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        let payload = {
            date: Helpers.postDate(data.date),
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
                    Konfirmasi Kelulusan
                </DialogTitle>
                <DialogContent>
                    <p>Tanggal Dinyatakan Lulus</p>
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
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} variant="outlined" size="small" onClick={handleClose}>Batal</Button>
                    <Button disabled={isLoading} variant="contained" size="small" onClick={handleSubmit(onSubmit)} autoFocus>
                        {isLoading ? "Sedang di Proses..." : "Kirim"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GraduationModal;