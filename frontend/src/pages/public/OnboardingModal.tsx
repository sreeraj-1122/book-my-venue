import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { FaHome, FaUser } from "react-icons/fa";
import Tooltip from "../../components/common/Tooltip";
type Props = {
  onClose: () => void;
  userEmail?: string;
  user?: {};
};
type OnboardingFormData = {
 firstName: string;
 lastName: string;
 phone: string;
 role: 'CUSTOMER' | 'OWNER' | null;
 picture?: File;
};

const OnboardingModal: React.FC<Props> = ({ onClose,userEmail,user }) => {
  console.log(user);
  
 const [formData, setFormData] = useState<OnboardingFormData>({
   firstName: '',
   lastName: '',
   phone: '',
   role: null
 });
 console.log(formData)
 const [picture, setPicture] = useState<File | null>(null);
 const [roleError, setRoleError] = useState(false);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleRole = (role: 'CUSTOMER' | 'OWNER') => {
   setFormData(prev => ({ ...prev, role }));
   setRoleError(false);
 };

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     setPicture(e.target.files[0]);
   }
 };

 const handleSubmit = async (e: FormEvent) => {
   e.preventDefault();
   if (!formData.role) {
     setRoleError(true);
     return;
   }

   const submitData = new FormData();
   Object.keys(formData).forEach(key => {
     if (formData[key as keyof OnboardingFormData] !== null) {
       submitData.append(key, formData[key as keyof OnboardingFormData] as string);
     }
   });
   console.log(submitData)

   if (picture) {
     submitData.append('picture', picture);
   }

   try {
     const response = await axios.post('/api/auth/update', submitData, {
       headers: { 'Content-Type': 'multipart/form-data' },
       withCredentials: true,
     });
     
     console.log('Profile updated:', response.data);
     onClose();
   } catch (error) {
     console.error('Update failed', error);
   }
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-0">
     <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
       <div className="flex items-center justify-between p-4 border-b rounded-t">
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
         <div className="md:space-y-4 space-y-2 bg-white sm:p-2">
           <h2 className="block text-sm font-medium text-gray-700">
             Select Your Profile
           </h2>
           <div className="flex flex-col md:flex-row justify-between gap-4">
             <Tooltip content="Users can book available properties.">
               <button
                 type="button"
                 className={`flex flex-col justify-center items-center w-full h-20 rounded-md transition-colors duration-300 border ${
                   formData.role === "CUSTOMER"
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
                   formData.role === "OWNER"
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
               value={userEmail}
               className="w-full mt-2 border p-2 rounded-md"
               readOnly
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
                 value={formData.firstName}
                 onChange={handleInputChange}
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
                 value={formData.lastName}
                 onChange={handleInputChange}
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
               value={formData.phone}
               onChange={handleInputChange}
               className="w-full mt-2 border p-2 rounded-md"
               required
               placeholder="Mobile number"
             />
           </div>
           <div className="mt-4">
             <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
               Profile Image (Optional)
             </label>
             <input
               type="file"
               id="picture"
               name="picture"
               accept="image/*"
               onChange={handleFileUpload}
               className="w-full mt-2 border p-2 rounded-md"
             />
           </div>
           <button
             type="submit"
             className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark transition duration-300"
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