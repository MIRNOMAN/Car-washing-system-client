import { Outlet } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"
import ScrollToTop from "./components/shared/ScrollToTop"


function App() {
 

  return (
    <div>
    <Navbar />
    <Outlet />
    <Footer />
    <ScrollToTop />
  </div>
  )
}

export default App
