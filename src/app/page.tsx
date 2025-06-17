import styles from './home.module.css'

const links: Array<[string, string, string, boolean?]> = [
  ['Email', 'mailto:hello@chrstphrknwtn.com', 'hello@chrstphrknwtn.com'],
  ['GitHub', 'https://github.com/chrstphrknwtn', '@chrstphrknwtn', true]
]

export default function Home() {
  return (
    <section className={styles.content}>
      <p>
        My focus is how interfaces feel and behave, driven by intuition and
        taste. Here you'll find design artefacts, interface explorations, and
        prototypes. Less portfolio, more workshop.
      </p>

      <table className={styles.links}>
        <tbody>
          {links.map(l => (
            <tr key={l[0]}>
              <td className={styles.linkLabel}>{l[0]}</td>
              <td>
                <a target={l[3] ? '_blank' : '_self'} href={l[1]}>
                  {l[2]}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
