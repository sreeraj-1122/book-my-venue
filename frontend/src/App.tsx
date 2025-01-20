import { RouterProvider } from "react-router-dom"
import router from "./routes/route"
import './fonts.css'
const App = () => {
  return (
       <RouterProvider router={router} />
  )
}

export default App