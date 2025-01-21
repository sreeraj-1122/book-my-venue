import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import "./fonts.css";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
