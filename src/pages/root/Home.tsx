import FeaturedServices from "../../components/Home/FeaturedServices"
import Hero from "../../components/Home/Hero"
import Footer from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"


const Home = () => {
  return (
    <div>
       <Navbar />
       <Hero/>
       <FeaturedServices/>


       <Footer/>
    </div>
  )
}

export default Home