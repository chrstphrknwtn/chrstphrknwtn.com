import ExtLink from './ExtLink'

import './footer.css'

const Footer = ({ route }: { route?: string }) => (
  <nav className="footer-nav">
    <ul>
      <li className={route === '/' ? 'disable' : ''}>
        <a className="encircle" href="/">
          ←
        </a>
      </li>
      <li>
        <ExtLink href="https://github.com/chrstphrknwtn">GitHub</ExtLink>
      </li>
      <li>
        <ExtLink href="https://www.linkedin.com/in/chrstphrknwtn">
          LinkedIn
        </ExtLink>
      </li>
    </ul>
  </nav>
)

export default Footer
