import Header from '@/components/header/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ReactQueryProviders from '@/hooks/useReactQuery';
import '../components/calendar/calendar.css';
import Modal from '@/components/modal/Modal';
import HalfPortal from '@/containers/group/groupId/tasklist/HalfPortal';
import HalfPage from '@/containers/group/groupId/tasklist/HalfPage';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProviders>
      <Header />
      <Modal />
      <HalfPage />
      <Component {...pageProps} />
    </ReactQueryProviders>
  );
}
