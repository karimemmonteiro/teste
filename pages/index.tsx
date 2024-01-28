// my-next-app/pages/index.tsx
import React from 'react';
import Products from '../components/products';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />



      </Head>
      <Products/>
    </div>
  );
};

export default Home;
