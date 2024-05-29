import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import ExtLink from 'src/components/ExtLink'

import './about.css'

const tumblrs = [
  { domain: '0x001a.com', subject: 'graphic design' },
  { domain: '0x001e.com', subject: 'painting' },
  { domain: '0x002b.com', subject: 'photography' },
  { domain: '0x003d.com', subject: 'architecture' }
]

const Page = () => (
  <Layout>
    <Grid as="article">
      <Header route="/about" />
      <section className="full">
        <h2 className="subhead">Now</h2>
        <p>
          I'm a designer living in the Pacific Northwest{' '}
          <span className="smcp">USA</span>, who has strayed into software
          engineering.
        </p>
        <p>
          These days I enjoy building interactive things in code while leaning
          on my experience as a designer.
        </p>
      </section>
      <section className="full">
        <h2 className="subhead">Before now</h2>
        <p>
          Originally from Melbourne, Australia, I started my career in London,{' '}
          <span className="smcp">UK</span>, freelancing as graphic artist in ad
          agencies and design studios.
        </p>
        <p>
          I then joined online retailer{' '}
          <ExtLink href="https://ssense.com">
            <span className="smcp">SSENSE</span>
          </ExtLink>{' '}
          in Montréal, Canada, wearing many hats in true startup fashion.
          Everything from building a photo retouching team, to redesigning and
          rebuilding the ecommerce frontend when{' '}
          <span className="smcp">HTML5</span>,{' '}
          <span className="smcp">CSS3</span> and jQuery were the new things, to
          managing the creative input/output as the only designer on staff.
        </p>
        <p>
          Feeling the sting of imposter syndrome, I returned to Melbourne to
          complete a Master of Design (Graphic Communication) at{' '}
          <ExtLink href="https://rmit.edu.au">
            <span className="smcp">RMIT</span>
          </ExtLink>
          , while freelancing in ad agencies and writing a lot of ActionScript.
        </p>
        <p>
          After some extended downtime in Paris, I joined a fitness startup in
          Berlin, prototyping interaction design concepts for an
          augmented-reality 'Smart Trainer' product, and designing and{' '}
          maintaining a SaaS platform for gym trainers and members.
        </p>
        <p>
          For the last six years I've been working on{' '}
          <ExtLink href="https://fieldfolio.com">Fieldfolio</ExtLink>, a{' '}
          <span className="smcp">B2B</span> SaaS platform for wholesalers in
          Australia and New Zealand, a healthy little business my family and I
          own and operate.
        </p>
      </section>

      <section className="full">
        <h2 className="subhead">Contact</h2>
        <p>
          <a href="tel:+12066986762">206 698 6762</a>
          <br />
          <a href="mailto:hello@chrstphrknwtn.com">hello@chrstphrknwtn.com</a>
        </p>
      </section>

      <section className="full">
        <h2 className="subhead">Et cetera</h2>
        <p>
          Reblogged <em>&</em> found images:
        </p>
        {tumblrs.map(tumblr => (
          <span key={tumblr.domain} className="tumblr">
            <dt>
              <ExtLink href={`https://${tumblr.domain}`}>
                {tumblr.domain}
              </ExtLink>
            </dt>
            <dd>
              <em>{tumblr.subject}</em>
            </dd>
          </span>
        ))}
      </section>

      <Footer />
    </Grid>
  </Layout>
)

export default Page
