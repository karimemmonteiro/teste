import { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { useRouter } from 'next/router';
import '../global.css';
import { rootReducer } from '../Redux/stores';
import { useSelector } from 'react-redux';
import { JwtPayload, jwtDecode } from 'jwt-decode';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = createStore(rootReducer);
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  useEffect(() => {
    if (userToken !== null) {
      const decoded: any = jwtDecode<JwtPayload>(userToken);
      localStorage.setItem('userName', decoded?.name);

    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, [])

  return <Provider store={store}> <Component {...pageProps} />  </Provider>
}

export default MyApp;
