import { useEffect } from 'react';

import { useRouter } from 'next/router';
import '../global.css'; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
