import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const PublicLayout = () => {
  return (
    <div className="flex flex-col justify-between ">
    <Navbar />
    <div className="pb-28 px-8">
        <Outlet />  
    </div>
    <Footer />
</div>
  )
}

export default PublicLayout