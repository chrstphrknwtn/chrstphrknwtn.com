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
        <p>Slowly but surely I'm getting a portfolio together</p>
      </section>

      <Footer route="/" />
    </Grid>
  </Layout>
)

export default Page
