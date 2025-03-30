import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <a href="/">Christopher Newton</a>
        <span>Design Engineer</span>
      </header>

      <section className={styles.intro}>
        <div className={styles.contactRow}>
          <div className={styles.contactLabel}>Email</div>
          <div>
            <a href="mailto:hello@chrstphrknwtn.com">hello@chrstphrknwtn.com</a>
          </div>
        </div>
        <div className={styles.contactRow}>
          <div className={styles.contactLabel}>GitHub</div>
          <div>
            <a target="_blank" href="https://github.com/chrstphrknwtn">
              @chrstphrknwtn
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
