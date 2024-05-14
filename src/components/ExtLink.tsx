const ExtLink = ({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) => (
  <a href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
)

export default ExtLink
