import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import api from "../../utils/api";

type Props = {
  onBack: () => void;
  onVerified: () => void; // Notify parent when OTP is successfully verified
  email: string; // The email to verify OTP for
};

const Otp: React.FC<Props> = ({ onBack, onVerified, email }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error on input change
    if (error) setError("");

    // Automatically focus the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join(""); // Combine the OTP digits
    if (otpCode.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/verify-otp", { email, otp: otpCode });
      setError("");
      onVerified(); // Notify parent that OTP is successfully verified
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="text-black hover:bg-gray-100 rounded-full p-2"
          >
            <IoMdArrowBack className="text-xl" />
          </button>
          <h3 className="text-xl font-medium text-center flex-1">
            Confirm Your Email
          </h3>
        </div>

        {/* Instruction */}
        <div className="text-center text-gray-800 text-base font-medium">
          Enter the OTP sent to <strong>{email}</strong>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              name={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

        {/* Submit Button */}
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            className={`w-full py-2 rounded-md text-white font-medium ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
            }`}
            disabled={loading || otp.some((digit) => digit === "")}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
