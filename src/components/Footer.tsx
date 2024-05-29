import ExtLink from './ExtLink'

import './footer.css'

const Footer = () => (
  <nav className="footer-nav">
    <ul>
      <li>
        <ExtLink href="https://github.com/chrstphrknwtn/">
          @chrstphrknwtn
        </ExtLink>
      </li>
      <li>
        <ExtLink href="https://github.com/chrstphrknwtn/chrstphrknwtn.com">
          Source
        </ExtLink>
      </li>
    </ul>
  </nav>
)

export default Footer
