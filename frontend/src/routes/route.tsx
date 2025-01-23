import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import PublicLayout from "../Layouts/PublicLayout";
import TermsOfService from "../pages/public/TermsOfService";
import PrivacyPolicy from "../pages/public/privacyPolicy";
import CancelAndRefund from "../pages/public/CancelAndRefund";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: 'terms-of-service', element: <TermsOfService /> },
			{ path: 'privacy-policy', element: <PrivacyPolicy /> },
			{ path: 'cancel-refund-policy', element: <CancelAndRefund /> },
    ],
  },
  {
    //   path: '*', // Fallback for unmatched routes
    //   element: <NotFound />,
  },
]);
export default router;
