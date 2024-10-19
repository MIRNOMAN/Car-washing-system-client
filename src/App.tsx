import { Outlet } from "react-router-dom"


function App() {
 

  return (
    <div className="overflow-hidden">
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gray-50"><Outlet /></div>
            {/* <Footer /> */}
        </div>
  )
}

export default App
