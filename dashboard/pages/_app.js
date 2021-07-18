import '../styles/globals.css'
import Layout from '../components/Layout';
import 'bulma/css/bulma.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
   )
}

export default MyApp;
