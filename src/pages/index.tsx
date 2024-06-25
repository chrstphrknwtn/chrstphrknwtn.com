import 'src/site.css'

import Layout from 'src/components/Layout'
import Header from 'src/components/Header'
import ExtLink from 'src/components/ExtLink'

import './index.css'

const Page = () => (
  <Layout>
    <main className="main">
      <Header route="/" />

      <section className="intro">
        <div className="contact-row">
          <div className="contact-label">Email</div>
          <div>
            <a href="mailto:hello@chrstphrknwtn.com">hello@chrstphrknwtn.com</a>
          </div>
        </div>
        <div className="contact-row">
          <div className="contact-label">GitHub</div>
          <div>
            <ExtLink href="https://github.com/chrstphrknwtn">
              @chrstphrknwtn
            </ExtLink>
          </div>
        </div>
      </section>
    </main>
  </Layout>
)

export default Page
