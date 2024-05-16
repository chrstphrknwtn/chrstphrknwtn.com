import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'

import './404.css'

const Page = () => (
  <Layout>
    <Grid className="fourzerofour">
      <div>
        <a className="escape" href="/">
          esc
        </a>
        <p>404 — Not Found</p>
      </div>
    </Grid>
  </Layout>
)

export default Page
