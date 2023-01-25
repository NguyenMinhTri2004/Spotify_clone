import '../styles/globals.css'
import "../styles/loading.css"
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import '../Assets/boxicons-2.1.4/css/boxicons.min.css';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    
        <SessionProvider
          session={pageProps.session}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
  )
}
