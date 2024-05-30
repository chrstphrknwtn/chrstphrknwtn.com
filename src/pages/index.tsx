import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import ExtLink from 'src/components/ExtLink'

import './index.css'

const Page = () => (
  <Layout>
    <Grid className="stretch">
      <Header route="/" />
      <section className="projects">
        <p>Where's the portfolio?</p>
        <p>
          I've been immersed in my own{' '}
          <ExtLink href="https://fieldfolio.com">startup</ExtLink> for the last
          six years, and I'm pulling together case studies at this very moment.
        </p>
      </section>

      <Footer />
    </Grid>
  </Layout>
)

export default Page
