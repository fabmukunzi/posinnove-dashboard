import '../styles/globals.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import antdTheme from '@utils/config/antdConfig';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { CustomProvider } from 'rsuite';

const roboto = Poppins({
  weight: '400',
  subsets: ['latin'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <CustomProvider>
      <main className={roboto.className}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </main>
      </CustomProvider>
    </ConfigProvider>
  );
}
