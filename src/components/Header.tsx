import Icon from './Icon'

const links = [
  {
    aria: 'View my GitHub Profile',
    icon: 'github',
    label: 'github/chrstphrknwtn',
    href: '//github.com/chrstphrknwtn',
    external: true
  },
  {
    aria: 'Connect with me on LinkedIn',
    icon: 'linkedin',
    label: 'linkedin/chrstphrknwtn',
    href: '//www.linkedin.com/in/chrstphrknwtn',
    external: true
  },
  {
    aria: 'Send me an email',
    icon: 'email',
    label: 'hello@chrstphrknwtn.com',
    href: 'mailto:hello@chrstphrknwtn.com',
    external: true
  }
]

export default () => (
  <header className="header">
    <h1>Christopher Newton</h1>

    <ul>
      {links.map(link => (
        <li key={link.href}>
          <a
            aria-label={link.aria}
            href={link.href}
            target={link.external ? '_blank' : ''}
            rel="noreferrer">
            {link.icon && <Icon className="icon" name={link.icon} />}
            <span className="link-label">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </header>
)
