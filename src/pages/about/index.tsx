import 'src/site.css'

import Layout from 'src/components/layout'
import Grid from 'src/components/grid'
import Header from 'src/components/header'

import './about.css'

const jobs = [
  {
    who: ['Fieldfolio'],
    where: 'Melbourne / Seattle',
    when: '2018 → Present',
    what: 'Product Designer',
    why: 'Fieldfolio for iPad, B2B Marketplace, Seller Dashboard'
  },
  {
    who: ['Pixformance'],
    where: 'Berlin',
    when: '2014 → 2018',
    what: 'Product Designer',
    why: 'AR Fitness Trainer, Member Platform'
  },
  {
    who: ['Clemender BBDO', 'JWT', 'Marmalade'],
    where: 'Melbourne',
    when: '2014',
    what: 'Designer, freelance',
    why: 'Digital campaign design and production for National Australia Bank, LaTrobe University, Mazda, Mercedes Benz.'
  },
  {
    who: ['AJF'],
    where: 'Melbourne',
    when: '2013 → 2014',
    what: 'Designer',
    why: 'Digital campaign design and production for Formula One, GM Holden, University of Melbourne.'
  },
  {
    who: ['RMIT'],
    where: 'Melbourne',
    when: '2012 → 2013',
    what: 'Master of Design',
    why: '(Graphic Communication) (Dist)'
  },
  {
    who: ['SSENSE'],
    where: 'Montreal',
    when: '2009 → 2011',
    what: 'Designer',
    why: 'Fashion ecommerce'
  },
  {
    who: [
      'Burton',
      'Levi‘s UK',
      'M&C Saatchi',
      'Tag TDI',
      'TopShop',
      'and more...'
    ],
    where: 'London',
    when: '2006 → 2008',
    what: 'Designer / Artworker, freelance',
    why: 'Various in-house and agency jobs, design and production for Chivas, Disney, The Glenlivet, Kodak, Fujifilm, Vodafone, and more.'
  },
  {
    who: ['Harcourt Institute'],
    where: 'Melbourne',
    when: '2005 → 2006',
    what: 'Designer, freelance',
    why: 'T-shirt graphics & illustration for Globe, Mossimo, M-One-11, and Target.'
  },
  {
    who: ['RMIT'],
    where: 'Melbourne',
    when: '2004 → 2005',
    what: 'Diploma of Art',
    why: '(Graphic Art)'
  }
]

const Page = () => (
  <Layout>
    <Grid as="article">
      <Header route="/about" />

      <section className="intro">
        <p>
          I'm Christopher, an Australian living in the Pacific Northwest with my
          wife and our neighbours cat.
        </p>
        <p>
          I'm a product designer spending more and more time writing code and
          making software.
        </p>
        <p>
          <a href="mailto:hello@chrstphrkntn.com">hello@chrstphrknwtn.com</a>
        </p>
        <p>
          <a href="https://github.com/chrstphrknwtn">GitHub /chrstphrknwtn</a>
          <br />
          <a href="https://linkedin.com/in/chrstphrknwtn">
            LinkedIn /chrstphrknwtn
          </a>
        </p>
      </section>

      <figure className="portrait">
        <img src="https://2.gravatar.com/avatar/7e4f47dcecda6e22071840df8f5c22d2533f9cd3902cb601b9e4323cbd7bb6db?size=1024" />
      </figure>

      <section className="timeline">
        <h2 className="timeline-heading">Timeline</h2>

        {jobs.map(job => (
          <section key={job.who[0]} className="timeline-item">
            <header>
              <h3>
                {job.who.map(who => (
                  <div key={who}>{who}</div>
                ))}
              </h3>
              <time>{job.when}</time>
            </header>
            <p>{job.where}</p>
            <h4>{job.what}</h4>
            <p>{job.why}</p>
          </section>
        ))}
      </section>
    </Grid>
  </Layout>
)

export default Page
