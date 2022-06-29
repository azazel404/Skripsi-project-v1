import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { SessionProvider } from "next-auth/react"
import Router from "next/router";
import { useStore } from "../store";
import { Provider } from "react-redux";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "./globals.scss";
// import '../styles/globals.css'
// import type { AppProps } from 'next/app'

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps }, } = props;

    const store = useStore(pageProps.initialReduxState);

    const getLayout = Component.getLayout ?? ((page: any) => page);


    return <CacheProvider value={emotionCache}>
        <Head>
            <title>
                Skripsiku | Universitas Universal
            </title>
            <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
            />
        </Head>
        <SessionProvider session={session}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={store}>
                        {getLayout(<Component {...pageProps} />)}
                    </Provider>
                </ThemeProvider>
            </LocalizationProvider>
        </SessionProvider>
    </CacheProvider>
}

export default MyApp
