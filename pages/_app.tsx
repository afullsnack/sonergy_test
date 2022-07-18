import type { AppProps } from "next/app";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { IPFSProvider } from "../lib/contexts/ipfsContext";
import { WalletProvider } from "../lib/contexts/walletContext";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <WalletProvider>
          <IPFSProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </IPFSProvider>
        </WalletProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
