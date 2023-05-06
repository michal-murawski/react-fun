import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Providers } from '@/modules/app/Providers';
import { Header } from '@/modules/layout/Header';
import { Footer } from '@/modules/layout/Footer';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title key="title">Fun with react</title>
            </Head>
            <Providers>
                <div className="flex h-screen flex-col">
                    <Header />
                    <div className="mx-auto flex w-full max-w-screen-xl flex-1 justify-center p-3">
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </div>
            </Providers>
        </>
    );
}

export default App;
