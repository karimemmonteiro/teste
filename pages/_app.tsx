// pages/_app.js
import '../global.css'; // Substitua pelo caminho real do seu arquivo global.css

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
