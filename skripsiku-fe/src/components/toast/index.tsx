import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarInterface {
    open: boolean,
    handleClose?: any,
    text?: string,
    type?: any,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props: SnackbarInterface) {
    const { open, handleClose, text, type = "success" } = props;
    const vertical = "bottom";
    const horizontal = "center"
    return (
        <>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>

        </>
    );
}