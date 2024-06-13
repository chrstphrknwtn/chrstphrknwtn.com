import './header.css'

type Props = {
  route?: string
}

const header = ({ route }: Props) => (
  <header className="header">
    {route === '/' ? (
      <h1>Christopher Newton</h1>
    ) : (
      <h2>
        <a href="/">Christopher Newton</a>
      </h2>
    )}
    <p>
      Designer → Design Engineer
      <br />
      Seattle, Washington
    </p>
  </header>
)

export default header
