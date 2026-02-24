import { Outlet } from 'react-router'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

export default function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  )
}
