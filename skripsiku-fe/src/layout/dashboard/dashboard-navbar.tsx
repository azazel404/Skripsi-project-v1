import * as React from 'react';
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Button, Box, IconButton, Toolbar, MenuItem, Tooltip, Menu, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));


interface NavbarLayout {
    onSidebarOpen?: any,
    other?: unknown
}

export const DashboardNavbar = (props: NavbarLayout) => {
    const router = useRouter();
    const profile = useSelector((state: any) => state.general.profile);
    const { onSidebarOpen, ...other } = props;
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);



    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: "calc(100% - 280px)",
                    },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: "inline-flex",
                                lg: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {profile && profile.profile_picture && profile.profile_picture.file_name ? <Avatar
                                    alt="Remy Sharp"
                                    src={profile.profile_picture.file_name}
                                    sx={{ width: 40, height: 40 }}
                                />
                                    :
                                    <Avatar sx={{ width: 40, height: 40 }} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => {
                                router.push("/");
                                handleCloseUserMenu()
                            }}>
                                <Typography textAlign="center">Beranda</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                router.push("/account");
                                handleCloseUserMenu()
                            }}>
                                <Typography textAlign="center">Akun Saya</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
