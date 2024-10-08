import Header from '@/components/header/Header';
import Modal from '@/components/modal/Modal';
import Toast from '@/components/toast/Toast';
import HalfPage from '@/containers/group/groupId/tasklist/HalfPage/HalfPage';
import ReactQueryProviders from '@/hooks/useReactQuery';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/components/calendar/calendar.css';
import { ThemeProvider } from '@/hooks/useThemeContext';
import '@/components/switch/ThemeSwitch.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProviders>
      <ThemeProvider>
        <Header />
        <Modal />
        <HalfPage />
        <Toast />
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryProviders>
  );
}
