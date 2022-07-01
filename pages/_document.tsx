import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/favicon.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon.png"
          />
          <meta name="theme-color" content="#fff" />
          <title>Sonergy</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
