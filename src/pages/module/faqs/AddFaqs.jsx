import React from "react";
import { LayoutDashboard, Save } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFaq } from "../../../redux/slice/faq/AddFaqSlice";
const AddFaq = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.addfaq);
    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.question.trim()) {
                errors.question = "Question is required";
            } else if (values.question.length < 2) {
                errors.question = "Question must be at least 2 characters";
            }

            if (!values.answer.trim()) {
                errors.answer = "Answer is required";
            } else if (values.answer.length < 2) {
                errors.answer = "Answer must be at least 2 characters";
            }

            return errors;
        },

        // onSubmit: (values) => {
        //     const existingFaqs =
        //         JSON.parse(localStorage.getItem("faqs")) || [];

        //     const newFaq = {
        //         id: Date.now(),
        //         question: values.question,
        //         answer: values.answer,
        //         status: values.status,
        //     };

        //     localStorage.setItem(
        //         "faqs",
        //         JSON.stringify([...existingFaqs, newFaq])
        //     );

        //     toast.success("FAQ added successfully!");
        //     navigate("/faqs");
        // },
        onSubmit: async (values) => {
            const result = await dispatch(addFaq(values));

            if (addFaq.fulfilled.match(result)) {
                toast.success("FAQ added successfully");
                navigate("/faqs");
            } else {
                toast.error(result.payload || "Token expired");
            }
        }


    });

    return (
        <>
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-white">
                    Add FAQ
                </h1>

                <div className="text-[15px] text-white flex items-center gap-2 mt-2">
                    <NavLink to="/dashboard" className="hover:text-blue-200 transition">
                        <LayoutDashboard size={16} />
                    </NavLink>
                    <span>&gt;</span>
                    <NavLink to="/faqs" className="hover:text-blue-200 transition">
                        FAQs
                    </NavLink>
                    <span>&gt;</span>
                    <span>Add FAQ</span>
                </div>
            </div>

            {/* FORM CARD */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    FAQ Details
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* QUESTION */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Question
                        </label>
                        <input
                            type="text"
                            name="question"
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter FAQ question"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none
                ${formik.touched.question && formik.errors.question
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />
                        {formik.touched.question && formik.errors.question && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.question}
                            </p>
                        )}
                    </div>

                    {/* ANSWER */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Answer
                        </label>
                        <textarea
                            name="answer"
                            rows={5}
                            value={formik.values.answer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter FAQ answer"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none
                ${formik.touched.answer && formik.errors.answer
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />
                        {formik.touched.answer && formik.errors.answer && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.answer}
                            </p>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-start gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/faqs")}
                            className="px-6 py-2 rounded-lg border font-semibold text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] text-white font-semibold shadow hover:opacity-90 transition"
                        >
                            <Save size={18} />
                            {loading ? "Saving..." : "Save FAQ"}

                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFaq;
