import React, { useState } from "react";
import Tooltip from "../../components/common/Tooltip";
import { FaHome, FaUser } from "react-icons/fa";

type Props = {
  onClose: () => void;
};

const OnboardingModal: React.FC<Props> = ({ onClose }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roleError, setRoleError] = useState(false);

  const handleRole = (role: string) => {
    setSelectedRole(role);
    setRoleError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setRoleError(true);
      return;
    }
    console.log("Form submitted with role:", selectedRole);
    // Proceed with form submission logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-0 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md ">
        <div className="flex items-center justify-between p-4 md:p-4 border-b rounded-t ">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h3 className="text-xl font-semibold text-gray-900 flex-1 text-center">
            Complete Your Profile
          </h3>
        </div>
        <form className="space-y-4 p-4" onSubmit={handleSubmit}>
          <div className="md:space-y-4 space-y-2  bg-white sm:p-2">
            <h2 className="block text-sm font-medium text-gray-700">
              Select Your Profile
            </h2>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Tooltip content="Users can book available properties.">
                <button
                  type="button"
                  className={`flex flex-col justify-center items-center w-full h-20 rounded-md transition-colors duration-300 border ${
                    selectedRole === "CUSTOMER"
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => handleRole("CUSTOMER")}
                >
                  <FaUser className="text-3xl" />
                  <span className="text-sm">User</span>
                </button>
              </Tooltip>
              <Tooltip content="Owners can list their properties for rent.">
                <button
                  type="button"
                  className={`flex flex-col justify-center items-center border w-full h-20 rounded-md transition-colors duration-300 ${
                    selectedRole === "OWNER"
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => handleRole("OWNER")}
                >
                  <FaHome className="text-3xl" />
                  <span>Owner</span>
                </button>
              </Tooltip>
            </div>
            {roleError && (
              <span className="text-red-500 text-md">Please select your role</span>
            )}
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-2 border p-2 rounded-md"
                required
              />
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full mt-2 border p-2 rounded-md"
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full mt-2 border p-2 rounded-md"
                  required
                  placeholder="Last Name"

                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full mt-2 border p-2 rounded-md"
                required
                placeholder="Mobile number"

              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark transition duration-300 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
