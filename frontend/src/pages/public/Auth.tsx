declare global {
  interface Window {
    google: any;
  }
}

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import OtpModel from "./OtpModel";
import OnboardingModal from "./OnboardingModal";

interface AuthProps {
  onClose: () => void;
  isOpen: boolean;
}

const Auth: React.FC<AuthProps> = ({ onClose, isOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();

  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;

      const { data } = await api.post("/api/auth/google", {
        credential,
      });
      console.log(data);
      dispatch(setUser({ user: data?.user, token: data?.token }));
      setNewUser(data?.user)
      setIsNewUser(true);
      toast.success(data?.message);
   
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Failed to sign in with Google."
      );
    }
  };
 
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error(
        "You must agree to the terms and conditions before proceeding."
      );
      return;
    }
    if (!email) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/auth/send-otp", { email });
      console.log(response.data);
      setIsOtpSent(true);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };
  {
    /* Render OTP Modal */
  }

  // const goto = (url) => {
	// 	window.open(url, '_blank');
	// };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {!isOtpSent ? (
            !isNewUser ? (
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md py-6">
                {/* Header */}
                <div className="flex items-center justify-between mx-6">
                  <button
                    onClick={onClose}
                    className="text-black hover:bg-gray-100 p-0 rounded-full"
                    aria-label="Close"
                  >
                    <IoMdClose className="text-lg" />
                  </button>
                  <h3 className="text-base font-medium text-center flex-1">
                    Log in or Sign up
                  </h3>
                </div>
                <hr className="my-5" />
                <form onSubmit={handleEmailSubmit} className="space-y-6 mx-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      Welcome to BookMyVenue
                    </h2>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter your email"
                      className="w-full mt-1 p-2 border rounded-md focus:ring-primary focus:border-primary outline-none"
                      aria-label="Email"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="mt-1"
                      aria-label="Accept terms and conditions"
                    />
                    <p className="text-sm text-gray-600">
                      I have read and understood the{" "}
                      <a href="#" className="text-primary underline">
                        privacy policy
                      </a>{" "}
                      and the{" "}
                      <a href="#" className="text-primary underline">
                        terms of service
                      </a>
                      .
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className={`w-full py-2 text-white font-medium rounded-md cursor-pointer hover:bg-gray-400 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-dark active:scale-95"
                    }`}
                  >
                    {loading ? "Sending..." : "Continue"}
                  </button>
                </form>

                {/* Google Sign-In */}
                <div className="flex items-center m-6 ">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="mx-4 text-sm text-gray-500">or</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="mx-6">
                  <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => {
                      toast.error("Google sign-in failed. Please try again.");
                    }}
                    text="continue_with"
                    shape="rectangular"
                    size="large"
                  />
                </div>
              </div>
            ) : (
              <OnboardingModal onClose={onClose} user={newUser}/>
            )
          ) : (
            <>
              <OtpModel
                email={email}
                onPrev={() => setIsOtpSent(false)}
                onClose={onClose}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
