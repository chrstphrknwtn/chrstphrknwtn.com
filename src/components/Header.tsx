import Grid from './Grid'

import './header.css'

const links = [
  {
    label: 'Work',
    href: '/'
  },
  {
    label: 'Bookshelf',
    href: '/bookshelf'
  }
]

type Props = {
  route?: string
  next?: string
  prev?: string
}

const header = ({ route }: Props) => (
  <Grid as="header" className="content-header">
    <div className="name">
      {route === '/' ? (
        <h1>
          Christopher Newton
          <br />
        </h1>
      ) : (
        <h2>
          <a href="/">Christopher Newton</a>
        </h2>
      )}
      <span className="title">Product Designer</span>
    </div>

    <nav className="content-nav">
      <ul>
        {links.map(link => (
          <li key={link.href}>
            <a className={route === link.href ? 'active' : ''} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </Grid>
)

export default header
