import 'src/site.css'

import Layout from 'src/components/Layout'
import ExtLink from 'src/components/ExtLink'

import './index.css'

const Page = () => (
  <Layout>
    <main className="main">
      <header className="header">
        <h1>Christopher Newton</h1>
        <p>
          Designer → Design Engineer
          <br />
          Seattle, Washington
        </p>
      </header>

      <section className="intro">
        <p>
          I've occupied the grey area between design and engineering for some
          time, wearing many hats. The hat I like most is design engineer,
          building tools, components and design systems for myself and others.
        </p>
        <div className="contact-row">
          <div className="contact-label">Email</div>
          <div>
            <a href="mailto:hello@chrstphrknwtn.com">hello@chrstphrknwtn.com</a>
          </div>
        </div>
        <div className="contact-row">
          <div className="contact-label">Github</div>
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
