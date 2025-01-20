import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layouts/CommonLayout";
import HomePage from "../pages/Home Page/HomePage";
import MyBooking from "../pages/Booking Page/MyBooking";
import ProfilePage from './../pages/Profile Page/ProfilePage';
import WishlistPage from "../pages/Wishlist Page/WishlistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "", element: <HomePage /> }, // Default route
          { path: 'my-booking', element: <MyBooking /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'Wishlists', element: <WishlistPage /> },
    ],
  },
  {
    //   path: '*', // Fallback for unmatched routes
    //   element: <NotFound />,
  },
]);
export default router;
