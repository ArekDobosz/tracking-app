import { FC } from 'react';
import Head from 'next/head';
import { Container } from '@mui/material';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tracking app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">{children}</Container>
      </main>
    </>
  );
};
