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
    status?: string;

}

const EvaluationModal = (props: CreateEditModalInterface) => {
    const { open, handleClose, onSubmitModal, isLoading } = props;
    // const [status, setStatus] = useState(null);

    const schema = yup.object({
        // status: yup.string().required("Status wajib diisi"),
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
        { value: 1, label: "DITERIMA", },
        { value: 2, label: "DIREVISI", },
        { value: 3, label: "DITOLAK" },
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
                    <span>Penilaian Isi Materi</span>
                    <Controller
                        name="score_content"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                disabled={isLoading}
                                variant="outlined"
                                error={!!errors.score_content}
                                helperText={errors.score_content ? errors.score_content?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <span>Penilaian Penyampaian</span>
                    <Controller
                        name="score_content_delivery"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                disabled={isLoading}
                                error={!!errors.score_content_delivery}
                                helperText={errors.score_content_delivery ? errors.score_content_delivery?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <span>Penilaian Penguasaan</span>
                    <Controller
                        name="score_content_mastery"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                size="small"
                                {...field}
                                variant="outlined"
                                disabled={isLoading}
                                error={!!errors.score_content_mastery}
                                helperText={errors.score_content_mastery ? errors.score_content_mastery?.message : ''}
                                fullWidth
                                margin="dense"
                            />
                        )}
                    />
                    <span>Catatan</span>
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
                                disabled={isLoading}
                                error={!!errors.remarks}
                                helperText={errors.remarks ? errors.remarks?.message : ''}
                                fullWidth
                                margin="dense"
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

export default EvaluationModal;