import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Footer from 'src/components/Footer'

import './index.css'

const Page = () => (
  <Layout>
    <Grid className="stretch">
      <section className="intro">
        <h1>
          Hi,
          <br />
          I'm Christopher
        </h1>
        <p>I'm a designer living in the Pacific Northwest</p>
        <p>After six years in a startup a new portfolio is on it's way</p>
        <p>
          <a href="mailto:hello@chrstphrknwtn.com">hello@chrstphrknwtn.com</a>
        </p>
      </section>

      <Footer route="/" />
    </Grid>
  </Layout>
)

export default Page
