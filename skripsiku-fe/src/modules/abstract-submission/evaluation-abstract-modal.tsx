import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Helpers from "../../helpers";



interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any
}

interface IFormInputs {
    status: string;
    remarks: string;
}

const EvaluationAbstractModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal } = props;
    const [initialValues, setInitialValues] = useState({})

    const schema = yup.object({
        status: yup.string().required("Status wajib diisi"),
        remarks: yup.string().required("Penilaian wajib diisi"),
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
        onSubmitModal(data);
    };


    const statusOptions = [
        { value: 1, label: "DITERIMA", },
        { value: 2, label: "DITOLAK" },
    ]

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
                    Pengajuan Judul T.A
                </DialogTitle>
                <DialogContent>
                    <p>Status</p>
                    <Controller
                        name="status"
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
                                            error={!!errors.status}
                                        >
                                            {statusOptions.map((item: any, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        {errors.status ? <FormHelperText style={{ color: '#D14343' }}>{errors.status?.message}</FormHelperText> : ''}
                                    </FormControl>
                                )
                            )
                        }}
                    />
                    <span>Penilaian</span>
                    <Controller
                        name="remarks"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                multiline
                                rows={4}
                                variant="outlined"
                                error={!!errors.remarks}
                                helperText={errors.remarks ? errors.remarks?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={handleClose}>Batal</Button>
                    <Button variant="contained" size="small" onClick={handleSubmit(onSubmit)} autoFocus>
                        Kirim
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EvaluationAbstractModal;