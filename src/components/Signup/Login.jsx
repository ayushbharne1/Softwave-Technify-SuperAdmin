import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../redux/slice/login/loginSlice";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.login);

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
      const result = await dispatch(sendOtp(values.phone));

      if (sendOtp.fulfilled.match(result)) {
        navigate("/verify-otp");
      } else {
        toast.error(result.payload?.message || "Failed to send OTP");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-300 to-blue-400 px-4">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT SECTION */}
        <div className="hidden md:flex w-1/2 p-10 items-center justify-center">
          <img
            src="https://olx-admin.netlify.app/assets/Tablet%20login-rafiki-CPRoiH2-.png"
            alt="login"
            className="w-full max-w-sm"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 font-medium mb-8 text-center">
            Login with your registered phone number.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* phone NUMBER */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                phone Number
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
                <Phone className="text-blue-500 w-5 h-5" />
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
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:opacity-95 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}