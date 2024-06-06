import 'src/site.css'

import Layout from 'src/components/Layout'
import Grid from 'src/components/Grid'
import Header from 'src/components/Header'
import ExtLink from 'src/components/ExtLink'

import './bookshelf.css'

const booklist = [
  {
    href: 'https://www.versobooks.com/products/1496-non-places',
    coverImgSrc: '/bookshelf/non-places-marc-auge.jpg',
    title: 'Non-Places: An Introduction to Supermodernity',
    author: 'Marc Augé',
    year: '2009'
  },
  {
    href: 'https://archive.org/details/mansrageforchaos0000peck',
    coverImgSrc: '/bookshelf/mans-rage-for-chaos-morse-peckham.jpg',
    title: 'Man’s Rage for Chaos: Biology, Behavior, and the Arts',
    author: 'Morse Peckham',
    year: 1967
  },
  {
    href: 'https://www.collectiveinkbooks.com/zer0-books/our-books/capitalist-realism-new-edition?q=zer0-books/our-books/capitalist-realism',
    coverImgSrc: '/bookshelf/capitalist-realism-mark-fisher.jpg',
    title: 'Capitalist Realism',
    author: 'Mark Fisher',
    year: '2009 (2022)'
  },
  {
    href: 'https://www.oma.com/publications/delirious-new-york',
    coverImgSrc: '/bookshelf/delirious-new-york-rem-koolhaas.jpg',
    title: 'Delirious New York: A Retroactive Manifesto for Manhattan',
    author: 'Rem Koolhaas',
    year: 1978
  },
  {
    href: 'https://archive.org/details/rolandbarthesannettelaversmythologieszlib.org',
    coverImgSrc: '/bookshelf/mythologies-roland-barthes.jpg',
    title: 'Mythologies',
    author: 'Roland Barthes',
    year: 1957
  },
  {
    href: 'https://www.hup.harvard.edu/books/9780674627512',
    coverImgSrc:
      '/bookshelf/notes-on-the-systhesis-of-form-christopher-alexander.jpg',
    title: 'Notes on the Synthesis of Form',
    author: 'Christopher Alexander',
    year: 1964
  },
  {
    href: 'https://archive.org/details/obeygiantlifeini0000poyn_g1v3',
    coverImgSrc: '/bookshelf/obey-the-giant-rick-poynor.jpg',
    title: 'Obey the Giant: Life in the Image World',
    author: 'Rick Poynor',
    year: 2007
  }
]

const Page = () => (
  <Layout>
    <main className="page-container">
      <Header route="/bookshelf" />
      <Grid as="article">
        <section className="content">
          <ul className="bookshelf">
            {booklist.map(book => (
              <li key="title">
                <ExtLink href={book.href}>
                  <div className="bookshelf-item">
                    <figure className="book-cover">
                      <img
                        src={book.coverImgSrc}
                        alt={`${book.title}, ${book.author}`}
                      />
                    </figure>
                    <div>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                  </div>
                </ExtLink>
              </li>
            ))}
          </ul>
        </section>
      </Grid>
    </main>
  </Layout>
)

export default Page
