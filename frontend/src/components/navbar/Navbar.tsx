import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Auth from "../Auth page/Auth";
import Otp from "../Auth page/Otp";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const routes = [
    { name: "My Booking", path: "/my-booking" },
    { name: "Profile", path: "/profile" },
    { name: "Wishlists", path: "/wishlists" },
  ];

  const handleAuthComplete = (email: string) => {
    // Store email and open OTP modal
    setUserEmail(email);
    setShowAuthModal(false);
    setShowOtpModal(true);
  };

  const handleCloseModals = () => {
    // Close both modals
    setShowAuthModal(false);
    setShowOtpModal(false);
  };

  const handleOtpVerified = () => {
    // Close OTP modal upon successful verification
    setShowOtpModal(false);
  };

  return (
    <>
      <div className="flex items-center h-16 shadow-lg justify-between px-10">
        <div className="flex items-center gap-4">
          <Logo />
          {routes.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`text-primaryfont hover:text-gray-600 cursor-pointer py-0 font-medium text-base ms-5 ${
                location.pathname === path
                  ? "border-b-2 border-primary py-1"
                  : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6 mr-8">
          <button
            onClick={() => setShowAuthModal(true)}
            className="font-medium px-5 h-9 py-1 text-bgPrimary border border-gray-200 rounded-2xl hover:bg-gray-100 hover:shadow-sm"
          >
            Login
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="font-medium px-5 h-9 py-1 text-bgPrimary border border-gray-200 rounded-2xl hover:bg-gray-100 hover:shadow-sm"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Render Auth Modal */}
      {showAuthModal && (
        <Auth
          onClose={handleCloseModals}
          onContinue={(email) => handleAuthComplete(email)}
        />
      )}

      {/* Render OTP Modal */}
      {showOtpModal && (
        <Otp
          onBack={() => setShowOtpModal(false)}
          onVerified={handleOtpVerified}
          email={userEmail}
        />
      )}
    </>
  );
};

export default Navbar;
