import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux"; 
import api from "../../utils/api";
import { setUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

type Props = {
  onBack: () => void;
  onVerified: () => void; // Notify parent when OTP is successfully verified
  email: string; 
};

const Otp: React.FC<Props> = ({ onBack, onVerified, email }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const dispatch = useDispatch(); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


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
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/auth/verify-otp", { email, otp: otpCode });
      console.log(response.data.user); 
      dispatch(setUser({user:response.data.user,token:response.data.token})); 
      toast.success(response.data.message)
      onVerified(); 
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to verify OTP.");
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
