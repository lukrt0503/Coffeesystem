import '../styles/globals.css';
import '../styles/business-color.css';
import '../styles/customStyle.scss';
import ProgressBar from 'nextjs-progressbar';
import React from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LayoutWebsite from 'src/shared/components/layout/LayoutWebsite';
import Head from 'next/head';
import { Bai_Jamjuree } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from 'src/shared/stores';
import { useRouter } from 'next/router';

const interText = Bai_Jamjuree({
  subsets: ['vietnamese'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

const ConfigLayout = ({
  children,
  getLayout,
}: {
  children: React.ReactElement;
  getLayout: (page: ReactElement) => React.ReactNode;
}) => {
  return (
    <main className={interText.className}>
      {/* TODO change theme */}
      <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
        {getLayout(children)}
      </NextThemesProvider>
    </main>
  );
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getLayout = Component.getLayout ?? (page => <LayoutWebsite>{page}</LayoutWebsite>);
  const handleRouteChangeStart = () => {
    setLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, []);
  return (
    <main className={interText.className}>
      <Head>
        <title>Website Coffee</title>
        <meta name='description' content='Website Coffee' />
        <meta name='keywords' content='Coffee' />
        <meta property='og:type' content='website' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/favicon.ico' />
      </Head>
      <CookiesProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ConfigLayout getLayout={getLayout}>
              <>
                <ProgressBar color='#3498db' height={3} />
                <Component {...pageProps} />
              </>
            </ConfigLayout>
          </QueryClientProvider>
        </Provider>
      </CookiesProvider>
    </main>
  );
}
