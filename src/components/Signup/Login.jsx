// import { Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../../redux/slice/login/loginSlice";
// import { toast } from "react-toastify";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.login);

//   const formik = useFormik({
//     initialValues: {
//       phone: "",
//     },

//     validate: (values) => {
//       const errors = {};

//       if (!values.phone) {
//         errors.phone = "phone number is required";
//       } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
//         errors.phone = "Enter valid 10 digit phone number";
//       }

//       return errors;
//     },

//     onSubmit: async (values) => {
//       const result = await dispatch(sendOtp(values.phone));

//       if (sendOtp.fulfilled.match(result)) {
//         navigate("/verify-otp");
//       } else {
//         toast.error(result.payload?.message || "Failed to send OTP");
//       }
//     },
//   });

// return (
//   <div className="min-h-screen flex items-center justify-center 
//     bg-linear-to-br from-orange-50 via-white to-blue-50">

//     <div className="flex w-full h-screen overflow-hidden 
//       bg-white transition-transform duration-300 ">

//       {/* LEFT SECTION */}
//       <div className="hidden md:flex w-1/2 p-10 items-center justify-center 
//         bg-linear-to-br from-orange-400 via-orange-500 to-blue-500 
//         animate-gradient">

//         <img
//           src="https://olx-admin.netlify.app/assets/Tablet%20login-rafiki-CPRoiH2-.png"
//           alt="login"
//           className="w-full max-w-2xl drop-shadow-2xl"
//         />
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center items-center">

//         <h2 className="text-3xl font-bold text-orange-500 mb-2 text-center">
//           Welcome Back
//         </h2>

//         <p className="text-gray-500 font-medium mb-8 text-center">
//           Login with your registered phone number
//         </p>

//         <form onSubmit={formik.handleSubmit} className="space-y-6">

//           {/* PHONE INPUT */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Phone Number
//             </label>

//             <div className="flex items-center border border-orange-400 rounded-lg px-3 py-2
//               transition-all duration-200
//               focus-within:border-orange-500
//               focus-within:ring-2 focus-within:ring-orange-200">

//               <Phone className="text-orange-500 w-5 h-5" />

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 className="w-full px-3 outline-none text-gray-700 placeholder-gray-400 "
//                 value={formik.values.phone}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 maxLength={10}
//               />
//             </div>

//             {formik.touched.phone && formik.errors.phone && (
//               <p className="text-red-500 text-xs mt-1">
//                 {formik.errors.phone}
//               </p>
//             )}
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-full font-semibold text-white
//               bg-orange-500 shadow-lg
//               hover:bg-orange-600 hover:shadow-xl
//               active:scale-95
//               transition-all duration-200
//               disabled:opacity-60"
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>

//         </form>
//       </div>
//     </div>
//   </div>
// );
// }






//following code is without api integration

// import React, { useState } from "react";
// import { Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";

// export default function Login() {
//   const navigate = useNavigate();
  
//   // 🔹 Local state for loading instead of Redux
//   const [loading, setLoading] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       phone: "",
//     },

//     validate: (values) => {
//       const errors = {};

//       if (!values.phone) {
//         errors.phone = "phone number is required";
//       } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
//         errors.phone = "Enter valid 10 digit phone number";
//       }

//       return errors;
//     },

//     onSubmit: async (values) => {
//       setLoading(true);

//       // 🔹 Simulating API Delay
//       setTimeout(() => {
//         setLoading(false);
//         toast.success("OTP sent successfully (Simulated)");
//         // 🔹 Navigate to verify-otp page
//         navigate("/verify-otp");
//       }, 1500);
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//       bg-linear-to-br from-orange-50 via-white to-blue-50">

//       <div className="flex w-full h-screen overflow-hidden 
//         bg-white transition-transform duration-300 ">

//         {/* LEFT SECTION */}
//         <div className="hidden md:flex w-1/2 p-10 items-center justify-center 
//           bg-linear-to-br from-orange-400 via-orange-500 to-blue-500 
//           animate-gradient">

//           <img
//             src="https://olx-admin.netlify.app/assets/Tablet%20login-rafiki-CPRoiH2-.png"
//             alt="login"
//             className="w-full max-w-2xl drop-shadow-2xl"
//           />
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center items-center">

//           <h2 className="text-3xl font-bold text-orange-500 mb-2 text-center">
//             Welcome Back
//           </h2>

//           <p className="text-gray-500 font-medium mb-8 text-center">
//             Login with your registered phone number
//           </p>

//           <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md">

//             {/* PHONE INPUT */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Phone Number
//               </label>

//               <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 
//                 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-orange-400'}
//                 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200`}>

//                 <Phone className="text-orange-500 w-5 h-5" />

//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Enter your phone number"
//                   className="w-full px-3 outline-none text-gray-700 placeholder-gray-400"
//                   value={formik.values.phone}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   maxLength={10}
//                 />
//               </div>

//               {formik.touched.phone && formik.errors.phone && (
//                 <p className="text-red-500 text-xs mt-1 italic ml-1">
//                   {formik.errors.phone}
//                 </p>
//               )}
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-full font-semibold text-white
//                 bg-orange-500 shadow-lg
//                 hover:bg-orange-600 hover:shadow-xl
//                 active:scale-95
//                 transition-all duration-200
//                 disabled:opacity-60 flex justify-center items-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Sending OTP...
//                 </>
//               ) : "Send OTP"}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






import React from "react";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { sendLoginOtp } from "./loginSlice"; // Apne file structure ke hisaab se path check karein
import { sendLoginOtp } from "../../redux/slice/auth/loginSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 🔹 Redux state se loading status nikalna
  const { loading } = useSelector((state) => state.login);

  useEffect(() => {
  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }
}, []);
  const formik = useFormik({
    initialValues: {
      phone: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = "phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
        errors.phone = "Enter valid 10 digit phone number";
      }
      return errors;
    },

    onSubmit: async (values) => {
      // 🔹 API action dispatch karna
      const resultAction = await dispatch(sendLoginOtp(values.phone));
      
      // 🔹 Agar API call successful rahi (status 200), tabhi navigate karein
      if (sendLoginOtp.fulfilled.match(resultAction)) {
        navigate("/verify-otp");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-blue-50">
      <div className="flex w-full h-screen overflow-hidden bg-white transition-transform duration-300">

        {/* LEFT SECTION - Image side */}
        <div className="hidden md:flex w-1/2 p-10 items-center justify-center bg-linear-to-br from-orange-400 via-orange-500 to-blue-500 animate-gradient">
          <img
            src="https://olx-admin.netlify.app/assets/Tablet%20login-rafiki-CPRoiH2-.png"
            alt="login"
            className="w-full max-w-2xl drop-shadow-2xl"
          />
        </div>

        {/* RIGHT SECTION - Form side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 font-medium mb-8 text-center">
            Login with your registered phone number
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md">
            
            {/* PHONE INPUT */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>

              <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 
                ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-orange-400'}
                focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200`}>

                <Phone className="text-orange-500 w-5 h-5" />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-3 outline-none text-gray-700 placeholder-gray-400"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={10}
                />
              </div>

              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs mt-1 italic ml-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-semibold text-white
                bg-orange-500 shadow-lg
                hover:bg-orange-600 hover:shadow-xl
                active:scale-95
                transition-all duration-200
                disabled:opacity-60 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : "Send OTP"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}