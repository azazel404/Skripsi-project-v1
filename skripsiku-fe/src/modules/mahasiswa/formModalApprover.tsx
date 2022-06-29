import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LecturerAPI from "../../api/LecturerAPI";

interface FormModalApproverInterface {
    open: boolean,
    handleClose: any,
    onSubmitModal?: any
}

interface IFormInputs {
    lecturer_id: {} | null;

}

const FormModalApprover = (props: FormModalApproverInterface) => {
    const { open, handleClose, onSubmitModal } = props;
    const [dosenOptions, setDosenOptions] = useState([]);

    // const schema = yup.object({
    //     first_name: yup.string().required(),
    //     last_name: yup.string().required(),
    //     email: yup.string().email().required(),
    //     // password: yup.string().required(),
    //     registration_number: yup.string().required(),
    //     // birthdate: yup.string().required(),
    //     phone_number: yup.string().required(),
    //     // gender: yup.object().required(),
    //     // major_id: yup.object().required(),
    // })

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        // resolver: yupResolver(schema),
        // defaultValues: initialValues
    });


    useEffect(() => {
        if (open) {
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
    }, [open])





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
                    Tambah  Penguji
                </DialogTitle>
                <DialogContent style={{ height: '150px' }}>
                    <div>
                        <Controller
                            name="lecturer_id"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-major"
                                    options={dosenOptions}
                                    onChange={(e, value) => setValue('lecturer_id', value)}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                {...params}
                                                size="small"
                                                error={!!errors.lecturer_id}
                                                helperText={errors.lecturer_id ? errors.lecturer_id?.message : ''}
                                            />
                                        )
                                    }}
                                />

                            )}
                        />
                    </div>
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

export default FormModalApprover;