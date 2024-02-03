import { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { useRouter } from 'next/router';
import '../global.css'; 
import { rootReducer } from '../Redux/stores';

function MyApp({ Component, pageProps }) {
  const store = createStore(rootReducer);
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);
  return <Provider store={store}> <Component {...pageProps} />; </Provider> 
}

export default MyApp;
