import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ForgotImg from "../../assets/Forgot password-bro.png";

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Invalid email address";
            }

            return errors;
        },

        onSubmit: async (values) => {
            const generatedOtp = generateOtp();
            setOtp(generatedOtp);

            localStorage.setItem("resetOtp", generatedOtp.toString());
            localStorage.setItem("resetEmail", values.email);

            const toastId = toast.loading("Sending OTP to email...");

            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));

                toast.update(toastId, {
                    render: "OTP sent successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 1500,
                });

                setTimeout(() => setOtpSent(true), 1600);
            } catch {
                toast.update(toastId, {
                    render: "Failed to send OTP",
                    type: "error",
                    isLoading: false,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-300 to-blue-400 px-4">

            {otpSent ? (
                /* OTP SUCCESS UI */
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center mb-4">
                        <Lock className="text-white" />
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                        OTP Sent Successfully!
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Please use this OTP to verify your account
                    </p>

                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-500">Your OTP Code</p>
                        <p className="text-4xl font-bold text-blue-600 tracking-widest">
                            {otp}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Sent to: {formik.values.email}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/verify-otp")}
                        className="w-full bg-gradient-to-r from-blue-500 to-pink-300 text-white py-3 rounded-full font-semibold shadow-lg"
                    >
                        Continue to Verification
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                        This OTP will expire in 10 minutes
                    </p>
                </div>
            ) : (
                /* EMAIL FORM UI */
                <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">

                    {/* LEFT IMAGE */}
                    <div className="hidden md:flex w-1/2 p-10 items-center justify-center bg-white">
                        <img
                            src={ForgotImg}
                            alt="forget password"
                            className="w-full max-w-sm"
                        />
                    </div>

                    {/* RIGHT FORM */}
                    <div className="w-full md:w-1/2 px-10 py-20 bg-white">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">
                            Forget Password
                        </h2>

                        <p className="text-gray-600 text-center font-medium mb-8">
                            Enter your registered email to receive OTP
                        </p>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-5">
                                <label className="text-sm font-bold text-gray-600">
                                    E-mail ID
                                </label>

                                <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
                                    <Mail className="text-blue-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-3 py-2 outline-none"
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-3 rounded-full font-semibold shadow-lg"
                            >
                                {loading ? "Sending OTP..." : "Get OTP"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
