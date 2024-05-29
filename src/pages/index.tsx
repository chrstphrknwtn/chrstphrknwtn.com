import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import './index.css'

const Page = () => (
  <Layout>
    <Grid className="stretch">
      <Header route="/" />
      <section className="projects">
        {/* <h2 className="subhead">Recent Projects</h2>
        <ul className="projects-list">
          <li>
            <a href="/email-authoring">
              Transactional email authoring (that doesn't suck)
            </a>
            <p className="project-date">2024</p>
          </li>
        </ul> */}
      </section>

      <Footer />
    </Grid>
  </Layout>
)

export default Page
