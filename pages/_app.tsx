import { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { useRouter } from 'next/router';
import '../global.css'; 
import { rootReducer } from '../Redux/stores';
import { useSelector } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = createStore(rootReducer);
 
  return <Provider store={store}> <Component {...pageProps} />; </Provider> 
}

export default MyApp;
