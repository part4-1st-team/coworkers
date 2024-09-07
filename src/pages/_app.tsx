import Header from '@/components/header/Header';
import Modal from '@/components/modal/Modal';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '../components/calendar/calendar.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Modal />
      <Component {...pageProps} />
    </>
  );
}
