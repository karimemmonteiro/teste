import React, { ReactNode, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import Login from "../pages/login";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const router = useRouter();

  useEffect(() => {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.info('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }
  }, []);


  useEffect(() => {

    const isAuthenticated = false;

    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  return (

    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="application-name" content="PWA App" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Best PWA App in the world" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

       
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />

      </Head>

      <header>
        <Login />
      </header>
      {children}
    </div>
  );
};

export default Layout;
