import 'src/site.css'

import Layout from 'src/components/layout'
import Grid from 'src/components/grid'
import Header from 'src/components/header'

const Page = () => (
  <Layout>
    <Grid>
      <Header route="/projects" />
    </Grid>
  </Layout>
)

export default Page
