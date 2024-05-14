import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import ExtLink from 'src/components/ExtLink'

import './projects.css'

const Page = () => (
  <Layout>
    <Grid>
      <Header route="/projects" />

      <h2 className="heading">Side projects and experiments</h2>

      <div className="project">
        <h3>
          <a href="/typelet/">Typelet</a>
        </h3>
        <p>A web component / bookmarklet for inspecting computed font styles</p>
      </div>

      <div className="project">
        <h3>
          <ExtLink href="https://github.com/chrstphrknwtn/ragtag">
            ragtag
          </ExtLink>
        </h3>
        <p>Template literal reducer for lightweight js templating</p>
      </div>

      <div className="project">
        <h3>
          <ExtLink href="https://github.com/supercrabtree/k">k</ExtLink>
        </h3>
        <p>zsh plugin for directory listings with colour and git status</p>
      </div>
    </Grid>
  </Layout>
)

export default Page
