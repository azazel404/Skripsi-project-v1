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
import Helpers from "../../helpers";



interface CreateEditModalInterface {
    open: boolean,
    handleClose: any,
    detail?: any,
    onSubmitModal?: any
}

interface IFormInputs {
    code: string;
    name: string;
}

const CreateEditModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, detail, onSubmitModal } = props;
    const [initialValues, setInitialValues] = useState({})

    const schema = yup.object({
        // code: yup.string().required("Kode wajib diisi"),
        name: yup.string().required("Ajaran wajib diisi"),

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
                    {!Helpers.IsEmptyObject(initialValues) ? "Ubah" : "Tambah"} Tahun Ajaran
                </DialogTitle>
                <DialogContent>
                    {/* <span>Kode</span>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                error={!!errors.code}
                                helperText={errors.code ? errors.code?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    /> */}
                    <span>Ajaran</span>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                placeholder="contoh : 2015 / 2019"
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name?.message : ''}
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

export default CreateEditModal;