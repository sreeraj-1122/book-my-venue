declare global {
  interface Window {
    google: any;
  }
}

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import api from "../../utils/api";

interface AuthProps {
  onClose: () => void;
  onContinue: (email: string) => void; // Pass email to the parent when continuing
}

const Auth: React.FC<AuthProps> = ({ onClose, onContinue }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGoogleScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          window.google?.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
          });

          window.google?.accounts.id.renderButton(
            document.getElementById("googleSignIn"),
            { theme: "outline", size: "large", width: "100%" }
          );
        };
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    try {
      const { data } = await api.post("/api/auth/google", {
        credential: response.credential,
      });

      localStorage.setItem("token", data.token);
      setError("");
      onContinue(email); // Notify parent of successful Google sign-in
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to sign in with Google.");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/send-otp", { email });
      setError("");
      onContinue(email); // Pass email to parent to show OTP screen
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP.");
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
          <h3 className="text-lg font-medium text-center flex-1">Log in or Sign up</h3>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome to BookMyVenue</h2>
            <p className="text-sm text-gray-500">Log in or sign up to continue.</p>
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error on input change
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
              </a>.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !email}
            className={`w-full py-2 text-white font-medium rounded-md ${
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
        <div id="googleSignIn" className="w-full"></div>

        {/* Error Message */}
        {error && (
          <div
            className="mt-4 text-sm text-red-500"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
