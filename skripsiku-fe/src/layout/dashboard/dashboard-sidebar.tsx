import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery, Typography } from "@mui/material";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CampaignIcon from '@mui/icons-material/Campaign';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Helpers from "../../helpers";
import { useDispatch } from "react-redux";
import { openErrorToast } from "~/src/actions";
// import { Logo } from "./logo";
import { NavItem } from "./dashboard-navitem";
import AuthAPI from "~/src/api/AuthAPI";


const items = [
    // {
    //     href: "/action-required",
    //     icon: <ShoppingBagIcon fontSize="small" />,
    //     title: "Action Required",
    // },
    {
        href: "/dashboard",
        icon: <DashboardIcon fontSize="small" />,
        title: "Dasbor",
        permission: ['student', 'lecturer', 'dekan', 'ketua_prodi', "admin"]
    },
    {
        href: "/announcement",
        icon: <CampaignIcon fontSize="small" />,
        title: "Pengumuman",
        permission: ['admin', "dekan"]
    },
    {
        href: "/manage-erepository",
        icon: <NoteAddIcon fontSize="small" />,
        title: "E-Repository",
        permission: ['admin', "dekan"]
    },
    {
        href: "/upload-erepository",
        icon: <NoteAddIcon fontSize="small" />,
        title: "Upload E-Repository",
        permission: ["student"]
    },
    {
        href: "/mahasiswa",
        icon: <PersonIcon fontSize="small" />,
        title: "Mahasiswa",
        permission: ['admin', "lecturer", "ketua_prodi", "dekan"]
    },
    {
        href: "/lecturer",
        icon: <GroupIcon fontSize="small" />,
        title: "Dosen",
        permission: ['admin', "lecturer", "ketua_prodi", "dekan"]
    },
    {
        href: "/majors",
        icon: <ClassIcon fontSize="small" />,
        title: "Program Studi",
        permission: ['admin', "dekan"]
    },
    {
        href: "/class-of",
        icon: <DateRangeIcon fontSize="small" />,
        title: "Tahun Ajaran",
        permission: ['admin', "dekan"]
    },
    {
        href: "/abstract-submission",
        icon: <AssignmentIcon fontSize="small" />,
        title: "Pengajuan Judul T.A",
        permission: ["ketua_prodi", "lecturer", "dekan"]
    },
    {
        href: "/abstract-submit",
        icon: <AssignmentIcon fontSize="small" />,
        title: "Pengajuan Judul T.A",
        permission: ["student"]
    },
    {
        href: "/submission",
        icon: <AssignmentIcon fontSize="small" />,
        title: "Tugas Akhir",
        permission: ["student"]
    },
    {
        href: "/submissions",
        icon: <AssignmentIcon fontSize="small" />,
        title: "Tugas Akhir Mahasiswa",
        permission: ["lecturer", "dekan", "ketua_prodi"]
    },
    {
        href: "/bimbingan",
        icon: <InterpreterModeIcon fontSize="small" />,
        title: "Daftar Bimbingan",
        permission: ["lecturer", "dekan"]
    },
    {
        href: "/bimbingan/history",
        icon: <InterpreterModeIcon fontSize="small" />,
        title: "Bimbingan",
        permission: ["student"]
    },
    {
        href: "/users",
        icon: <ManageAccountsIcon fontSize="small" />,
        title: "Daftar Pengguna",
        permission: ['admin']
    },

    // {
    //     href: "/account",
    //     icon: <ManageAccountsIcon fontSize="small" />,
    //     title: "Akun",
    //     permission: ['admin', "student", "lecturer"]
    // },
];

export const DashboardSidebar = (props: any) => {
    const [profile, setProfile] = useState(null)
    const dispatch = useDispatch();

    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
        defaultMatches: true,
        noSsr: false,
    });


    useEffect(() => {
        AuthAPI.profile()
            .then((res: any) => {
                setProfile(res?.data);
            })
            .catch(err => {
                let error = Helpers.ErrorHandler(err)
                dispatch(openErrorToast(error.message));
            })
            .finally(() => { })
    }, [])



    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose?.();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );



    const content = (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <div>
                    <Box sx={{ px: 3 }}>
                        {/* <NextLink href="/" passHref>
                           
                        </NextLink> */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ position: 'relative', width: '100px', height: "100px" }}>
                                <Image src="/uvers-logo.svg" layout="fill" alt="logo-client" />
                            </div>
                            <Divider
                                sx={{
                                    borderColor: "#2D3748",
                                    my: 3,
                                }}
                                orientation="vertical" variant="middle" flexItem
                            />
                            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '8px' }} >
                                <FolderOpenIcon color="primary" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: 'white', fontWeight: 'bold' }}>Skripsiku</Typography>
                            </div>
                        </div>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: "center",
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                px: 3,
                                py: "11px",
                                borderRadius: 1,
                            }}
                        >
                            <div>
                                <Typography color="inherit" variant="body2">
                                    {profile?.first_name} {profile?.last_name}
                                </Typography>
                                <Typography color="neutral.400" variant="body2">
                                    {profile?.roleInString}
                                </Typography>
                            </div>

                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: "#2D3748",
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item: any) => {
                        let profilePermission;
                        if (profile) {
                            profilePermission = profile && profile.roleInString ? profile.roleInString.toLowerCase() : ""
                        }

                        return (
                            <Helpers.restrictUI profile={[profilePermission]} accessPermission={item.permission} key={item.title}>
                                <NavItem
                                    icon={item.icon}
                                    href={item.href}
                                    title={item.title}
                                />
                            </Helpers.restrictUI>
                        )
                    })}
                </Box>
                <Divider sx={{ borderColor: "#2D3748" }} />
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neutral.900",
                        color: "#FFFFFF",
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "neutral.900",
                    color: "#FFFFFF",
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
