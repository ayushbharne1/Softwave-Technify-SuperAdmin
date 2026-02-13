// import { Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Resetpassword from "../../assets/Reset password-bro (1).png";
// import { useFormik } from "formik";

// export default function ResetPassword() {
//     const navigate = useNavigate();

//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showPass, setShowPass] = useState(false);
//     const [showConfirmPass, setShowConfirmPass] = useState(false);

//     // const handleResetPassword = () => {
//     //     if (!password || !confirmPassword) {
//     //         toast.error("All fields are required");
//     //         return;
//     //     }

//     //     if (password.length < 6) {
//     //         toast.error("Password must be at least 6 characters");
//     //         return;
//     //     }

//     //     if (password !== confirmPassword) {
//     //         toast.error("Passwords do not match");
//     //         return;
//     //     }

//     //     toast.success("Password reset successfully 🎉");

//     //     setTimeout(() => {
//     //         navigate("/login");
//     //     }, 1500);
//     // };
//     const formik = useFormik({
//         initialValues: {
//             password: "",
//             confirmPassword: "",
//         },

//         validate: (values) => {
//             const errors = {};

//             if (!values.password) {
//                 errors.password = "Password is required";
//             } else if (values.password.length < 6) {
//                 errors.password = "Password must be at least 6 characters";
//             }

//             if (!values.confirmPassword) {
//                 errors.confirmPassword = "Confirm password is required";
//             } else if (values.password !== values.confirmPassword) {
//                 errors.confirmPassword = "Passwords do not match";
//             }

//             return errors;
//         },

//         onSubmit: () => {
//             toast.success("Password reset successfully 🎉");
//             navigate("/")
//         },
//     });

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-300 to-blue-400 px-4">
//             <div className="flex w-full max-w-4xl  rounded-2xl shadow-2xl overflow-hidden">

//                 {/* LEFT IMAGE */}
//                 <div className="hidden md:flex w-1/2  items-center justify-center">
//                     <img
//                         src={Resetpassword}
//                         alt="reset password"
//                         className="w-full max-w-sm"
//                     />
//                 </div>

//                 {/* RIGHT FORM */}
//                 <div className="w-full md:w-1/2 px-10 pt-[70px] pb-10 bg-white">

//                     <h2 className="text-3xl font-bold text-blue-300 mb-2 text-center">
//                         Reset Password
//                     </h2>

//                     <p className="text-gray-600 font-bold text-center mb-8">
//                         Create a new strong password for your account
//                     </p>
//                     <form onSubmit={formik.handleSubmit}>
//                         {/* NEW PASSWORD */}
//                         <div className="mb-5">
//                             <label className="text-sm font-semibold text-gray-600">
//                                 New Password
//                             </label>
//                             <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
//                                 <input
//                                     type={showPass ? "text" : "password"}
//                                     name="password"
//                                     value={formik.values.password}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     placeholder="Enter new password"
//                                     className="w-full px-3 py-2 outline-none"
//                                 />
//                                 <button onClick={() => setShowPass(!showPass)}>
//                                     {showPass ? (
//                                         <EyeOff className="w-5 h-5 text-gray-500" />
//                                     ) : (
//                                         <Eye className="w-5 h-5 text-gray-500" />
//                                     )}
//                                 </button>
//                             </div>
//                             {formik.touched.password && formik.errors.password && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                     {formik.errors.password}
//                                 </p>
//                             )}
//                         </div>

//                         {/* CONFIRM PASSWORD */}
//                         <div className="mb-6">
//                             <label className="text-sm font-semibold text-gray-600">
//                                 Confirm Password
//                             </label>
//                             <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
//                                 <input
//                                     type={showConfirmPass ? "text" : "password"}
//                                     name="confirmPassword"
//                                     value={formik.values.confirmPassword}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     // onChange={(e) => setConfirmPassword(e.target.value)}
//                                     placeholder="Confirm new password"
//                                     className="w-full px-3 py-2 outline-none"
//                                 />
//                                 <button
//                                     onClick={() => setShowConfirmPass(!showConfirmPass)}
//                                 >
//                                     {showConfirmPass ? (
//                                         <EyeOff className="w-5 h-5 text-gray-500" />
//                                     ) : (
//                                         <Eye className="w-5 h-5 text-gray-500" />
//                                     )}
//                                 </button>
//                             </div>
//                             {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                     {formik.errors.confirmPassword}
//                                 </p>
//                             )}
//                         </div>

//                         {/* SUBMIT */}
//                         <button
//                             // onClick={handleResetPassword}
//                             type="submit"
//                             className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
//                         >
//                             Set Password
//                         </button>

//                         {/* BACK BUTTON */}
//                         <div className="flex justify-center mt-6">
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg"
//                             >
//                                 <ArrowLeft />
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     );
// }








import { Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetpasswordImg from "../../assets/Reset password-bro (1).png";
import { useFormik } from "formik";

export default function ResetPassword() {
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm password is required";
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }

            return errors;
        },

        onSubmit: (values) => {
            // Simulated Success
            toast.success("Password reset successfully 🎉");
            setTimeout(() => {
                navigate("/"); // Adjust path to login if needed
            }, 1000);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">

                {/* 🔹 LEFT IMAGE SECTION (Orange Gradient) */}
                <div className="hidden md:flex w-1/2 p-12 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
                    <div className="text-center">
                        <img
                            src={ResetpasswordImg}
                            alt="reset password"
                            className="w-full max-w-sm drop-shadow-2xl brightness-110"
                        />
                        <h3 className="text-white text-2xl font-bold mt-8">Secure Your Account</h3>
                        <p className="text-orange-100 mt-2 font-medium text-sm">Almost there! Just set your new password.</p>
                    </div>
                </div>

                {/* 🔹 RIGHT FORM SECTION */}
                <div className="w-full md:w-1/2 px-8 py-16 md:px-16 flex flex-col justify-center bg-white">
                    <div className="mb-10 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <ShieldCheck className="text-orange-500 w-8 h-8" />
                            <h2 className="text-4xl font-black text-orange-500">
                                Reset Password
                            </h2>
                        </div>
                        <p className="text-gray-500 font-semibold">
                            Create a new strong password for your account
                        </p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* NEW PASSWORD */}
                        <div>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                New Password
                            </label>
                            <div className={`flex items-center border-2 rounded-2xl px-4 mt-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-orange-100 ${formik.touched.password && formik.errors.password ? 'border-red-300' : 'border-gray-100 focus-within:border-orange-400'}`}>
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter new password"
                                    className="w-full py-4 outline-none font-medium text-gray-700 bg-transparent"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-orange-500">
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-2 font-bold ml-2 italic">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                Confirm Password
                            </label>
                            <div className={`flex items-center border-2 rounded-2xl px-4 mt-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-orange-100 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-100 focus-within:border-orange-400'}`}>
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Confirm your password"
                                    className="w-full py-4 outline-none font-medium text-gray-700 bg-transparent"
                                />
                                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="text-gray-400 hover:text-orange-500">
                                    {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-2 font-bold ml-2 italic">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            Update Password
                        </button>

                        {/* BACK BUTTON */}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                    <ArrowLeft size={16} />
                                </div>
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}