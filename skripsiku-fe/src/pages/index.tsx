import React, { useState, useEffect } from "react"
import styled from "@emotion/styled";
import { Box, Button, Container, TextField, Typography, Grid, Paper, Avatar } from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import useStateWithRef from "../helpers/useStateWithRef";
import { useRouter } from "next/router";
import Navbar from "../layout/client/navbar";
import Footer from "../layout/client/footer";
import Head from "next/head";
import Image from "next/image"
import ERepositoryAPI from "~/src/api/ERepositoryAPI";


const Home = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery, queryRef] = useStateWithRef({
        page: 1,
        limit: 3,
        status: 1
    });

    const [dataSource, setDataSource, dataSourceRef] = useStateWithRef({
        count: 0,
        data: [],
    });

    useEffect(() => {
        setIsLoading(true);
        let payload = { ...query }
        ERepositoryAPI.get(payload)
            .then(res => {
                setDataSource({
                    count: res?.data.count,
                    data: res?.data.data
                });
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])





    return (
        <>
            <Head>
                <title>Beranda | Universitas Universal</title>
            </Head>
            <Navbar />
            <div style={{
                backgroundColor: '#fff'
            }}>
                <Container
                    style={{
                        height: "calc(100vh - 64px)",
                        padding: "1.5rem",
                        display: "flex",
                        justifyContent: 'center',
                        // alignItems: "center",
                    }}
                >
                    <Grid
                        container
                        spacing={8}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Grid item xs={6}>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <Typography variant="h3" style={{ fontWeight: '500' }}>A Better Way To</Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: '500' }}>To</Typography>
                                    <Typography variant="h3" color="primary"> Keep in Touch</Typography>
                                </div>
                                <Typography style={{ marginTop: '16px', color: '#797979' }}>masih sibuk cari dosen dan bingung jadwal tugas akhir kamu? upload drive? uda gak jaman lagi! cobain skripsiku dan rasakan keseruannya!</Typography>
                                <div style={{ marginTop: '36px' }}>
                                    <a href={"/e-repository"} style={{ textDecoration: 'none' }} rel="noopener noreferrer"
                                    >
                                        <Button color="primary" variant="contained" size="large" style={{ marginRight: '16px', borderRadius: '74px' }}>Temukan File</Button>
                                    </a>
                                    <a href={"/dashboard"} style={{ textDecoration: 'none' }} rel="noopener noreferrer"
                                    >
                                        <Button color="primary" variant="outlined" size="large" style={{ borderRadius: '74px' }}>Kumpulkan Proposal</Button>
                                    </a>
                                </div>
                            </div>
                            {/* <div style={{ display: "flex", flexDirection: 'column' }}>
                                <Typography style={{ marginTop: '16px', color: '#797979' }}>“Saya selalu kesulitan untuk mengubungi dosen karena ada beberapa pekerjaan juga. Now with Skripsiku, kehidupan kampusku lebih mudah. Now you!”</Typography>
                            </div> */}
                        </Grid>
                        <Grid item xs={6}>
                            {/* <img
								style={{ width: "100%", height: "100%" }}
								src={"/static/section1-login.svg"}
								alt="navbar-image"
							/> */}
                            <div
                                style={{
                                    position: "relative",
                                    height: "550px",
                                    width: "550px",
                                }}
                            >
                                <Image
                                    src={"/static/section1-home.svg"}
                                    alt="navbar-image"
                                    layout="fill"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div style={{
                backgroundColor: '#fff'
            }}>
                <Container style={{
                    marginTop: '96px'
                    // padding: "6rem",
                    // backgroundColor: '#fff'
                }}>
                    <Grid
                        container
                        spacing={8}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >

                        <Grid item xs={6}>
                            {/* <img
								style={{ width: "100%", height: "100%" }}
								src={"/static/section1-login.svg"}
								alt="navbar-image"
							/> */}
                            <div
                                style={{
                                    position: "relative",
                                    height: "550px",
                                    width: "550px",
                                }}
                            >
                                <Image
                                    src={"/static/section2-home.svg"}
                                    alt="navbar-image"
                                    layout="fill"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: 'bold' }} color="primary">Kumpul</Typography>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: '500' }} >dan</Typography>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: 'bold' }} color="primary">Bimbingan</Typography>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant="h3" color="primary" style={{ marginRight: '8px', fontWeight: 'bold' }}>Langsung</Typography>
                                    <Typography variant="h3" style={{ fontWeight: '500' }} >sama Dosen</Typography>
                                </div>
                                <Typography style={{ marginTop: '16px', color: '#797979' }}>Coba pengalaman yang belum pernah ada sebelumnya, langsung tanya dan tunggu respon dari dosenmu langsung di aplikasi Skripsiku!</Typography>
                                <div style={{ marginTop: '36px' }}>
                                    <a href={"/upload-erepository"} style={{ textDecoration: 'none' }} rel="noopener noreferrer"
                                    >
                                        <Button color="primary" variant="contained" size="large" style={{ marginRight: '16px', borderRadius: '74px' }}>Kumpulkan File</Button>
                                    </a>
                                </div>
                            </div>

                        </Grid>

                    </Grid>
                </Container>
            </div>

            <div style={{
                backgroundColor: '#fff'
            }}>
                <Container style={{
                    marginTop: '96px',
                    // backgroundColor: '#fff'
                }}>
                    <Grid
                        container
                        spacing={8}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >


                        <Grid item xs={6}>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: 'bold' }} color="primary">Lacak Proses Skripsimu</Typography>
                                    <Typography variant="h3" style={{ marginRight: '8px', fontWeight: '500' }} >dan</Typography>
                                </div>
                                <Typography variant="h3" style={{ marginRight: '8px', fontWeight: 'bold' }} color="primary">No No Telat!</Typography>
                                <Typography style={{ marginTop: '16px', color: '#797979' }}>Tidak ada deh acara bingung jadwal atau ketinggalan dari temen-temen yang lain. All in one hand, you got this.</Typography>
                                <div style={{ marginTop: '36px' }}>
                                    <a href={"/upload-erepository"} style={{ textDecoration: 'none' }} rel="noopener noreferrer"
                                    >
                                        <Button color="primary" variant="contained" size="large" style={{ marginRight: '16px', borderRadius: '74px' }}>Kumpulkan File</Button>
                                    </a>

                                </div>
                            </div>

                        </Grid>
                        <Grid item xs={6}>
                            <div
                                style={{
                                    position: "relative",
                                    height: "550px",
                                    width: "550px",
                                }}
                            >
                                <Image
                                    src={"/static/section3-home.svg"}
                                    alt="navbar-image"
                                    layout="fill"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div style={{
                backgroundColor: '#fff'
            }}>
                <Container style={{
                    marginTop: '96px',
                    minHeight: '500px',
                    marginBottom: '120px'
                    // backgroundColor: '#fff'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'inline' }}>
                            <Typography variant="caption" style={{ fontWeight: 'bold', fontSize: '36px' }} color="primary">Cari </Typography>
                            <Typography variant="caption" style={{ fontWeight: '500', fontSize: '36px' }} > dan </Typography>
                            <Typography variant="caption" style={{ fontWeight: 'bold', fontSize: '36px' }} color="primary">Temukan File Senior</Typography>
                            <Typography variant="caption" style={{ fontWeight: 'bold', fontSize: '36px' }} > dengan mudah </Typography>
                        </div>
                        <div style={{ display: 'inline' }}>

                            <Typography variant="caption" style={{ fontSize: '16px', color: '#797979' }} color="primary">Butuh referensi tapi bingung cari dimana? Sekarang cukup buka menu E-Repository dan temukan apa yang kamu butuhkan!</Typography>
                        </div>
                    </div>
                    <Grid container spacing={4} style={{ marginTop: '40px' }}>
                        {dataSource.data.map((data, index) => {
                            return (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <Paper variant="outlined" style={{ padding: '28px', height: '304px', width: '380px' }}>
                                        <Typography variant="caption" style={{ fontWeight: '500', fontSize: '18px' }} >{data.name.length >= 128 ? data.name.substring(0, 128) + "..." : data.name}</Typography>
                                        <div style={{
                                            display: "flex",
                                            alignItems: 'center',
                                            marginTop: '24px',
                                        }}>
                                            <Avatar sx={{ width: 40, height: 40 }} src={"/static/user-placeholder.png"} />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ fontSize: '14px', paddingLeft: '8px', fontWeight: 'bold' }}>
                                                    {data.publisher}
                                                </Typography>
                                                <Typography sx={{ fontSize: '14px', paddingLeft: '8px' }} color="text.secondary">
                                                    {data.major.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <a href={"/e-repository"} style={{ textDecoration: 'none' }} rel="noopener noreferrer"
                        >
                            <Button color="primary" variant="contained" size="large" style={{ marginRight: '16px', borderRadius: '74px' }}>Lihat Lebih Banyak</Button>
                        </a>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Home;