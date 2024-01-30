import type { AppProps } from "next/app";
import Head from "next/head";
import { redirect, usePathname } from "next/navigation";
import { verficicationRouters } from "../functions/verificationRouters";
import { AutenticationsUser } from "../context/AuthContext";
import Sidebar from "../components/SideBar";
import "../global.css"
import Login from "./login";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }
  }, []);
  const pathname = usePathname();
  const isPublicPage = verficicationRouters(pathname)
  const isAutentication = AutenticationsUser()

  return (
    <>
      <Head>
        <title>Remoto-pwa</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#317EFB" />

        <meta name="description" content="Best PWA app in the world!" />

        <link rel="shortcut icon" href="/favicon.ico" />

        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
      </Head>
      {
        isPublicPage ?
          <Component {...pageProps} />
          :
          <main>

            {isAutentication?
              <main>
                <Sidebar />
                <Component {...pageProps} />
              </main>
              : <Login/>}
          </main>
      }
    </>
  );
}