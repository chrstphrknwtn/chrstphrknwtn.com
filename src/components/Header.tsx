import './header.css'

const links = [
  {
    label: 'Work',
    href: '/work'
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

type Props = {
  route?: string
  next?: string
  prev?: string
}

const header = ({ route, next, prev }: Props) => (
  <>
    <div className="header-title">
      <h1>
        <a href="/">Christopher Newton</a>
      </h1>
    </div>

    <nav className="header-nav">
      <ul>{}</ul>
    </nav>
  </>
)

export default header
