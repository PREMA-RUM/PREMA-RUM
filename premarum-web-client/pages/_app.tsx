import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import Head from 'next/head';
import {MsalProvider} from '@azure/msal-react';
import AuthDefaultLayout from '../components/DefaultLayout'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {pca} from "../utility/constants";
import MobileNavbar from "../components/MobileNavBar";

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}

const MyApp: React.FunctionComponent<AppPropsWithLayout> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // Default Layout
  let DefaultLayout:  (page: ReactElement) => ReactNode = 
      ((page: ReactElement) =>
          (<AuthDefaultLayout>
              <MobileNavbar>
                {page}
              </MobileNavbar>
          </AuthDefaultLayout>)); 
  // Overloaded Layout defined on a per page basis
  if (Component.getLayout) {DefaultLayout = Component.getLayout;}
  return (
    <MsalProvider instance={pca}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Head>
          <title>PREMARUM</title>
          <meta name="description" content="Easiest way to create enrollment logistical plans for UPRM students." />
          <link rel="icon" href="/prema-icon.png" />
          </Head>
          {DefaultLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </MsalProvider>
  );
};

export default MyApp;
