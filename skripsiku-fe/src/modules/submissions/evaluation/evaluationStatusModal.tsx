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


interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    onSubmitModal?: any,
    isLoading?: boolean,
}

interface IFormInputs {
    remarks: string;
    score_content: string;
    score_content_delivery: string;
    score_content_mastery: string;
    status: string;

}

const EvaluationStatusModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, onSubmitModal, isLoading } = props;
    const [status, setStatus] = useState(null);

    const schema = yup.object({
        status: yup.string().required("Status wajib diisi"),
        // remarks: yup.string().required("Penilaian wajib diisi"),
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });


    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        onSubmitModal(data);
    };


    const statusOptions = [
        { value: 1, label: "Diterima", },
        { value: 2, label: "Direvisi", },
        { value: 3, label: "Ditolak" },
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
                    Ambil Tindakan
                </DialogTitle>
                <DialogContent>
                    <p>Status</p>
                    <Controller
                        name="status"
                        control={control}
                        render={(props) => {
                            return (
                                (
                                    <FormControl fullWidth style={{ marginBottom: '10px', marginTop: '10px' }}>
                                        <Select
                                            {...props.field}
                                            labelId="demo-simple-select-error-label"
                                            id="demo-simple-select-error"
                                            size="small"
                                            disabled={isLoading}
                                            error={!!errors.status}
                                            onChange={(event: any) => {
                                                setStatus(event.target.value)
                                                props.field.onChange(event.target.value);
                                            }}
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

export default EvaluationStatusModal;