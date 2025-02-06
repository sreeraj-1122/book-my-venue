import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { setUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import OnboardingModal from "./OnboardingModal";
import { useNavigate } from "react-router-dom";
import { handleLoginSuccess } from "../../services/user.service";
import { ROLES } from "../../components/constants/roles";

type Props = {
  onPrev: () => void;
  onClose: () => void;
  email: string;
};

const OtpModel: React.FC<Props> = ({ onPrev, onClose, email }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const navigate = useNavigate();
	const [newUser, setNewUser] = useState({});
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

    // const resendOtp = async () => {
    //   try {
    //     await axiosInstance.post('/auth/otp', { email });
    //     setOtp('');
    //     toast.success('OTP send');
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
    // Automatically focus the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        otp: otpCode,
      });
      console.log(response.data)
      if (response.data.data.isNewUser && response.data.data.email) {
				setNewUser(response.data.data);
				setShowOnboarding(true);
			} else {
				handleLoginSuccess(response.data.data);
				if (response.data.data.role === ROLES.OWNER) {
					navigate('/owner/property');
				} else {
					closeAll();
				}
				dispatch(setUser(response.data.data));
			}
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };
  const closeAll = () => {
    setShowOnboarding(false);
    onClose();
  };
  return (
    <>
      {!showOnboarding ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={onPrev}
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
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
                disabled={loading || otp.some((digit) => digit === "")}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      ) : (
				showOnboarding && <OnboardingModal user={newUser} onClose={closeAll} />
      )}
    </>
  );
};

export default OtpModel;
