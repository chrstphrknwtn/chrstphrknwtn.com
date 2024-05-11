import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'

const Page = () => (
  <Layout>
    <Grid>
      <Header route="/" />
    </Grid>
  </Layout>
)

export default Page
