import * as React from 'react';
import styled from "@emotion/styled";
import { signOut, getSession } from "next-auth/react";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useRouter } from "next/router";
import { AppBar, Container, Avatar, Button, Box, IconButton, Toolbar, MenuItem, Tooltip, Menu, Typography } from "@mui/material";
import AuthAPI from '~/src/api/AuthAPI';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

const Navbar = () => {
    const router = useRouter()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [ready, setReady] = React.useState(false);
    const [profile, setProfile] = React.useState(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getProfile = () => {
        AuthAPI.profile()
            .then((res: any) => {
                setProfile(res?.data);
            })
            .catch(err => {
                console.log(err)
            })

    };


    React.useEffect(async () => {
        let session = await getSession();
        if (session && !session.refreshTokenError) {
            getProfile();
        } else {
            setReady(true);
        }
    }, []);

    const items = [

        {
            href: "/",
            title: "Beranda",

        },
        {
            href: "/e-repository",
            title: "E-Repository",
        },
        {
            href: "http://simak.uvers.ac.id/login.php",
            title: "Portal",
            newTab: true
        },
        {
            href: "http://elearning.uvers.ac.id/",
            title: "E-learning",
            newTab: true
        },
    ]
    return (
        <>
            <NavbarRoot
            // sx={{
            //     // left: {
            //     //     lg: 280,
            //     // },
            //     width: {
            //         lg: "100%",
            //     },
            // }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: "64px",
                        left: 0,
                        px: 2,
                    }}
                >
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                                <Typography onClick={() => router.push("/")} style={{ color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>Skripsiku</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                {items.map((item: any, index) => {
                                    const active = router.pathname === item.href ? true : false;
                                    if (item.newTab) {
                                        return (
                                            <a href={item.href} key={index} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"
                                            >
                                                <Typography style={{ marginRight: '54px', cursor: 'pointer', color: active ? "#0181FE" : "#000" }}>{item.title}</Typography>
                                            </a>
                                        )
                                    }
                                    else {
                                        return (
                                            <a href={item.href} key={index} style={{ textDecoration: 'none' }}>
                                                <Typography style={{ marginRight: '54px', cursor: 'pointer', color: active ? "#0181FE" : "#000" }}>{item.title}</Typography>
                                            </a>

                                        )
                                    }

                                })}
                            </div>
                            <div>

                                {profile ?
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
                                                router.push("/dashboard");
                                                handleCloseUserMenu()
                                            }}>
                                                <Typography textAlign="center">Management</Typography>
                                            </MenuItem>

                                            <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                                                <Typography textAlign="center">Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box> :
                                    <Button variant="outlined" size="small" onClick={() => router.push("/login")}>
                                        Login
                                    </Button>}
                            </div>
                        </div>

                    </Container>

                </Toolbar>
            </NavbarRoot>
        </>
    )
}

export default Navbar;
