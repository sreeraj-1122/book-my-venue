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

interface AuthProps {
  onClose: () => void;
  onContinue: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onContinue }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;

      const { data } = await api.post("/api/auth/google", {
        credential,
      });
      console.log(data);
      dispatch(setUser({ user: data?.user, token: data?.token }));
      toast.success(data?.message);
      onClose();
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Failed to sign in with Google."
      );
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.success("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/auth/send-otp", { email });
      console.log(response.data);
      onContinue(email); // Pass email to parent to show OTP screen
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="text-black hover:bg-gray-100 p-2 rounded-full"
            aria-label="Close"
          >
            <IoMdClose className="text-lg" />
          </button>
          <h3 className="text-lg font-medium text-center flex-1">
            Log in or Sign up
          </h3>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Welcome to BookMyVenue
            </h2>
            <p className="text-sm text-gray-500">
              Log in or sign up to continue.
            </p>
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
              required
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
            className={`w-full py-2 text-white font-medium rounded-md cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark active:scale-95"
            }`}
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        {/* Google Sign-In */}
        <div className="flex items-center my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
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
  );
};

export default Auth;
