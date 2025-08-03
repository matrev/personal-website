import Layout from 'components/layout'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/global.css'
 
export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Head>
        <title>matrev</title>
    </Head>
      <Component {...pageProps} />
  </Layout>
}