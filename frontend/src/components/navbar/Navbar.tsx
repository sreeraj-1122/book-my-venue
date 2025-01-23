import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Auth from "../../pages/public/Auth";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const { user, token } = useSelector((state: RootState) => state.auth);
  console.log("User:", user);

  console.log(`user nav ${user} ,--, token: ${token}`);
  const routes = [
    { name: "My Booking", path: "/my-booking" },
    { name: "Profile", path: "/profile" },
    { name: "Wishlists", path: "/wishlists" },
  ];

  const handleCloseModal = () => {
    setShowAuthModal(false);
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
        {token ? (
         <img
         src={user?.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
         className="w-10 h-10 rounded-full object-fill"
       />
       
        ) : (
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
          
        )}
      </div>

      {/* Render Auth Modal */}
      {showAuthModal && (
        <Auth
          onClose={handleCloseModal}
          isOpen={showAuthModal}
        />
      )}

      
    </>
  );
};

export default Navbar;
