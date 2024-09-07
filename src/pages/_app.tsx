import Header from '@/components/header/Header';
import '@/styles/globals.css';
import '../components/calendar/calendar.css';
import type { AppProps } from 'next/app';
import ReactQueryProviders from '@/hooks/useReactQuery';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProviders>
      <Header />
      <Component {...pageProps} />
    </ReactQueryProviders>
  );
}
