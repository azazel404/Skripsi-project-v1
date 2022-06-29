import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogConfirmationInterface {
    open: boolean,
    handleClose: any,
    handleSubmit?: any,
    description?: string,
}

const DialogConfirmation = (props: DialogConfirmationInterface) => {
    const { open, handleClose, handleSubmit, description = "Apakah Anda yakin menghapus data ini?" } = props;

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Konfirmasi
                </DialogTitle>
                <DialogContent>
                    <p>{description}</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={handleClose}>Tutup</Button>
                    <Button variant="contained" size="small" onClick={handleSubmit} autoFocus>
                        Kirim
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogConfirmation;