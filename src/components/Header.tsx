import './header.css'

const links = [
  {
    label: 'About',
    href: '/about'
  }
  // {
  //   label: 'Contact',
  //   href: '/contact'
  // }
]

type Props = {
  route?: string
  next?: string
  prev?: string
}

const header = ({ route, next, prev }: Props) => (
  <header className="site-header">
    <div className="name">
      <h1>
        <a href="/">Christopher Newton</a>
      </h1>
    </div>

    <nav className="site-nav">
      <ul>
        {links.map(link => (
          <li key={link.href}>
            <a
              className={route === link.href ? 'disable' : ''}
              href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default header
