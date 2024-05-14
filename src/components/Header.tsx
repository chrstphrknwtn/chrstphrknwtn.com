import './header.css'

const links = [
  {
    label: 'Work',
    href: '/'
  },
  {
    label: 'Projects',
    href: '/projects'
  },
  {
    label: 'About',
    href: '/about'
  }
]

const header = ({ route }: { route?: string }) => (
  <>
    <div className="header-title">
      <h1>
        <a href="/">Christopher Newton</a>
      </h1>
      <span>Product Designer</span>
    </div>

    <nav className="header-nav">
      <ul>
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} className={link.href === route ? 'active' : ''}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </>
)

export default header
