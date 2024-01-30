import type { AppProps } from "next/app";
import Head from "next/head";
import { redirect, usePathname } from "next/navigation";
import { verficicationRouters } from "../functions/verificationRouters";
import { AutenticationsUser } from "../context/AuthContext";
import Sidebar from "../components/SideBar";
import "../global.css"
import Login from "./login";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isPublicPage = verficicationRouters(pathname)
  const isAutentication = AutenticationsUser()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Remoto-pwa</title>
        <meta name="theme-color" content="#317EFB" />
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="My awesome PWA app" />
        <meta name="twitter:description" content="Best PWA app in the world!" />
        <meta name="twitter:image" content="/icons/twitter.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My awesome PWA app" />
        <meta property="og:description" content="Best PWA app in the world!" />
        <meta property="og:site_name" content="My awesome PWA app" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/icons/og.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />


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