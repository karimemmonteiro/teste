import { QueryClient, QueryClientProvider } from 'react-query';
import "../../global.css";
import Providers from '../../Redux/Provider';
import { useEffect } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
        if (userToken) {
            const decoded = jwtDecode<JwtPayload>(userToken);
            console.log("teste token", decoded)
        }else{
            // window.location.href = "/";
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Providers>
                <Component {...pageProps} />
            </Providers>
        </QueryClientProvider>
    );
}

export default MyApp;
