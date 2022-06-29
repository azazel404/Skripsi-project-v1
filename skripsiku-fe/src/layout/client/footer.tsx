import React from "react";
import { Box, Button, Container, TextField, Typography, Grid, Paper, Divider } from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useRouter } from "next/router";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = (props: any) => {
    const router = useRouter();

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
        <div style={{ height: '304px', backgroundColor: '#0181FE', display: 'flex', alignItems: 'center', }}>
            <Container>
                <Typography variant="h3" style={{ fontWeight: 'bold', color: 'white', fontSize: '32px', textAlign: 'center' }}>Rasakan pengalaman yang belum ada sebelumnya.</Typography>
                <Divider style={{ marginTop: '64px', marginBottom: '36px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <FolderOpenIcon style={{ marginRight: '8px', color: 'white' }} />
                        <Typography onClick={() => router.push("/")} style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Skripsiku</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        {items.map((item: any, index) => {
                            if (item.newTab) {
                                return (
                                    <a href={item.href} key={index} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"
                                    >
                                        <Typography style={{ marginRight: '54px', cursor: 'pointer', color: "#fff" }}>{item.title}</Typography>
                                    </a>
                                )
                            }
                            else {
                                return (
                                    <a href={item.href} key={index} style={{ textDecoration: 'none' }}>
                                        <Typography style={{ marginRight: '54px', cursor: 'pointer', color: "#fff" }}>{item.title}</Typography>
                                    </a>

                                )
                            }

                        })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <YouTubeIcon style={{ marginRight: '8px', color: 'white' }} />
                        <InstagramIcon style={{ marginRight: '8px', color: 'white' }} />
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default Footer;