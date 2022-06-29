import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
} from '@mui/material';
import { useDispatch } from "react-redux"
import {
    openNotificationToast,
    openErrorToast
} from "../../actions"
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signOut } from "next-auth/react";
import * as yup from "yup";
import AuthAPI from "../../api/AuthAPI";
import Helpers from "../../helpers";



interface IFormInputs {
    password: string;
    confirmPassword: string;
}

export const AccountPassword = (props: any) => {

    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);


    const schema = yup.object({
        password: yup.string()
            .required(`Password wajib diisi`)
            .min(2, `Password terlalu pendek `)
            .max(18, `Password terlalu panjang`),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "Konfirmasi password tidak sama dengan password")

    })


    const {
        // register,
        control,
        handleSubmit,
        // setValue,
        // reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        // defaultValues: profile
    });


    const onSubmit: SubmitHandler<IFormInputs> = (values) => {
        setIsFetching(true);

        let payload = {
            password: values.password,
        }

        AuthAPI.updatePassword(payload)
            .then((res: any) => {
                dispatch(openNotificationToast("Berhasil ubah password"));
                window.location.reload();
                // signOut({ callbackUrl: "/" });
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => {
                setIsFetching(false);
            })
    };




    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2
                    }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Ubah Password</span>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        // disabled={isFetching}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Ubah
                    </Button>
                </Box>
                {/* <Divider /> */}
                <CardContent>
                    {isFetching ? "loading" : <>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <span>Password</span>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            style={{ marginBottom: '10px', marginTop: '10px' }}
                                            size="small"
                                            type="password"
                                            {...field}
                                            disabled={isFetching}
                                            variant="outlined"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password?.message : ''}
                                            fullWidth
                                            margin="dense"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <span>Konfirmasi Password</span>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            style={{ marginBottom: '10px', marginTop: '10px' }}
                                            size="small"
                                            type="password"
                                            {...field}
                                            disabled={isFetching}
                                            variant="outlined"
                                            error={!!errors.confirmPassword}
                                            helperText={errors.confirmPassword ? errors.confirmPassword?.message : ''}
                                            fullWidth
                                            margin="dense"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid></>}
                </CardContent>
            </Card>
        </form>
    );
};
