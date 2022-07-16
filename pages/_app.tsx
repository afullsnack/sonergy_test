import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { WalletContext } from "../lib/contexts/wallet";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <WalletContext.Provider
          value={{
            address,
            setAddress,
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </WalletContext.Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
