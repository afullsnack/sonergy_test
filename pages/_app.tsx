import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
