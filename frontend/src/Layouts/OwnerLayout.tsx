import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const OwnerLayout = () => {
  return (
    <div className="flex flex-col bg-gradient">
			<Navbar />

			<div className="mx-auto w-full px-4 lg:px-20 pb-28 pt-32">
				<Outlet />
			</div>
			<Footer />
		</div>
  )
}

export default OwnerLayout