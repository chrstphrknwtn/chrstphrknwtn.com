import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import ExtLink from 'src/components/ExtLink'

import './about.css'

const Page = () => (
  <Layout>
    <Grid as="article">
      <Header route="/about" />
      <section className="about">
        <h2 className="subhead">About</h2>
        <p>I'm a designer who has strayed into software engineering.</p>
        <p>
          Originally from Melbourne I started my career as a freelance graphic
          artist in ad agencies and design studios in London.
        </p>
        <p>
          I then joined online retailer{' '}
          <ExtLink href="https://ssense.com">SSENSE</ExtLink> in Montréal,
          wearing many hats in true startup fashion. Everything from building a
          photo retouching team, to redesigning & rebuilding the ecommerce
          frontend when <span className="smcp">HTML5</span>,{' '}
          <span className="smcp">CSS3</span> & jQuery were the new things, to
          managing the creative input/output as the only designer on staff.
        </p>
        <p>
          Feeling the sting of imposter syndrome, I returned to Melbourne to
          complete a Master of Design in Graphic Communication, while
          freelancing at ad agencies and writing a lot ActionScript.
        </p>
        <p>
          After some extended downtime in Paris, I joined a fitness startup in
          Berlin prototyping interaction design concepts for their
          augmented-reality 'Smart Trainer' product, and designing the SaaS
          platform for gym trainers and members.
        </p>
        <p>
          For the last six years I've been working on{' '}
          <ExtLink href="https://fieldfolio.com">Fieldfolio</ExtLink>, a B2B
          platform for wholesalers in Australia and New Zealand, a business my
          family and I own and operate.
        </p>
      </section>

      <section className="contact">
        <h2 className="subhead">Contact</h2>
        <p>
          206 698 6762
          <br />
          hello@chrstphrknwtn.com
        </p>
      </section>

      <Footer />
    </Grid>
  </Layout>
)

export default Page
