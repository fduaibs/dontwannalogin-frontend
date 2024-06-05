import { AnnotationProvider } from '../context/AnnotationContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnnotationProvider>
      <Component {...pageProps} />
    </AnnotationProvider>
  )
}

export default MyApp;
