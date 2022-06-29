import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../modules/account/account-profile";
import { AccountProfileDetails } from "../../modules/account/account-profile-details";
import { AccountPassword } from "~/src/modules/account/account-profile-password";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import AuthAPI from "~/src/api/AuthAPI";
import { useDispatch } from "react-redux";
import Helpers from "~/src/helpers";
import { openErrorToast } from "~/src/actions";

const Account = (props: any) => {
    const [profile, setProfile] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        AuthAPI.profile()
            .then((res: any) => {
                setProfile(res.data);
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => { })
    }, [])


    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '24px',
                    paddingBottom: '24px'
                }}
            >
                <Container >
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Akun
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AccountProfileDetails />
                            <div style={{ marginTop: '14px' }}>
                                <AccountPassword />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
};

Account.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
