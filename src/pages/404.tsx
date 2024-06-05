import 'src/site.css'

import Layout from 'src/components/Layout'
import Header from 'src/components/Header'

const Page = () => (
  <Layout>
    <main className="page-container">
      <Header />
      <div>
        <p>404</p>
        <p>Whoops... can't find what you're looking for.</p>
      </div>
    </main>
  </Layout>
)

export default Page
