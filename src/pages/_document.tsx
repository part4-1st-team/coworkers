import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <body>
        <Main />
        <div id='_modal' />
        <div id='_half' />
        <div id='_toast' />
        <NextScript />
      </body>
    </Html>
  );
}
