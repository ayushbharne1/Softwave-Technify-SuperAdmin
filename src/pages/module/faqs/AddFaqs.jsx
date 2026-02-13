
// import React from "react";
// import { LayoutDashboard, FileText, Save, ChevronLeft, Plus } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { addFaq } from "../../../redux/slice/faq/AddfaSlice";

// const AddFaq = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.addfaq);

//     const formik = useFormik({
//         initialValues: {
//             question: "",
//             answer: "",
//         },

//         validate: (values) => {
//             const errors = {};

//             if (!values.question.trim()) {
//                 errors.question = "Question is required";
//             } else if (values.question.length < 2) {
//                 errors.question = "Question must be at least 2 characters";
//             }

//             if (!values.answer.trim()) {
//                 errors.answer = "Answer is required";
//             } else if (values.answer.length < 2) {
//                 errors.answer = "Answer must be at least 2 characters";
//             }

//             return errors;
//         },

//         onSubmit: async (values) => {
//             const result = await dispatch(addFaq(values));

//             if (addFaq.fulfilled.match(result)) {
//                 toast.success("FAQ added successfully", {
//                     toastId: "faq-add-success"
//                 });
//                 navigate("/faqs");
//             } else {
//                 toast.error(result.payload || "Token expired", {
//                     toastId: "faq-add-error"
//                 });
//             }
//         }
//     });

//     return (
//         <div className="p-6 min-h-screen x">
//             {/* 🔹 Orange Gradient Header with Breadcrumbs */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-white">Add New FAQ</h1>
//                         <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
//                             <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
//                                 <LayoutDashboard size={16} />
//                             </NavLink>
//                             <span className="text-white/60">›</span>
//                             <NavLink to="/faqs" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
//                                 <FileText size={16} className="ml-1" />
//                                 FAQ Management
//                             </NavLink>
//                             <span className="text-white/60">›</span>
//                             <span className="text-white font-medium">Add FAQ</span>
//                         </div>
//                     </div>
//                     <div className="bg-white/20 px-4 py-2 rounded-lg">
//                         <p className="text-white text-sm">Create New FAQ Entry</p>
//                     </div>
//                 </div>
//             </div>

//             {/* 🔹 Main Form Card */}
//             <div className="max-w-full mx-auto">
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//                     {/* Header */}
//                     <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
//                                 <Plus className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-800">New FAQ</h2>
//                                 <p className="text-gray-600">Fill in the details to create a new FAQ entry</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form */}
//                     <form onSubmit={formik.handleSubmit} className="p-8 space-y-8">
//                         {/* QUESTION FIELD */}
//                         <div className="space-y-3">
//                             <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-2xl border-2 border-blue-100">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
//                                     <FileText className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Question <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="question"
//                                         value={formik.values.question}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         placeholder="Enter your FAQ question here..."
//                                         className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all font-medium text-lg bg-white shadow-sm ${
//                                             formik.touched.question && formik.errors.question
//                                                 ? "border-red-400 bg-red-50 focus:border-red-400"
//                                                 : "border-transparent focus:border-blue-400 hover:border-blue-200"
//                                         }`}
//                                     />
//                                     {formik.touched.question && formik.errors.question && (
//                                         <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                                             <span className="w-4 h-4">!</span>
//                                             {formik.errors.question}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ANSWER FIELD */}
//                         <div className="space-y-3">
//                             <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-25 rounded-2xl border-2 border-emerald-100">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md mt-1">
//                                     <FileText className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Answer <span className="text-red-500">*</span>
//                                     </label>
//                                     <textarea
//                                         name="answer"
//                                         rows={6}
//                                         value={formik.values.answer}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         placeholder="Enter detailed answer to the question..."
//                                         className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-0 resize-vertical transition-all font-medium text-base bg-white shadow-sm ${
//                                             formik.touched.answer && formik.errors.answer
//                                                 ? "border-red-400 bg-red-50 focus:border-red-400"
//                                                 : "border-transparent focus:border-emerald-400 hover:border-emerald-200"
//                                         }`}
//                                     />
//                                     {formik.touched.answer && formik.errors.answer && (
//                                         <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                                             <span className="w-4 h-4">!</span>
//                                             {formik.errors.answer}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ACTION BUTTONS */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-2 py-6 rounded-b-2xl">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate("/faqs")}
//                                 className="flex items-center justify-center gap-2 flex-1 sm:w-auto px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                             >
//                                 <ChevronLeft size={18} />
//                                 Cancel
//                             </button>

//                             <button
//                                 type="submit"
//                                 disabled={loading || !formik.isValid}
//                                 className="flex items-center justify-center gap-2 flex-1 sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                         Saving...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Save size={20} />
//                                         Save FAQ
//                                     </>
//                                 )}
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default AddFaq;
                             






import React, { useState } from "react";
import { LayoutDashboard, FileText, Save, ChevronLeft, Plus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const AddFaq = () => {
    const navigate = useNavigate();
    
    // 🔹 API loading ki jagah local state loading
    const [loading, setLoading] = useState(false);

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

        onSubmit: async (values) => {
            setLoading(true);

            try {
                // 🔹 Simulating API Delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // 🔹 Local Storage integration
                const existingFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
                
                const newFaq = {
                    id: Date.now(), // Unique ID generation
                    ...values,
                    createdAt: new Date().toISOString()
                };

                const updatedFaqs = [newFaq, ...existingFaqs];
                localStorage.setItem("faqs", JSON.stringify(updatedFaqs));

                toast.success("FAQ added successfully", {
                    toastId: "faq-add-success"
                });

                navigate("/faqs");
            } catch (error) {
                toast.error("Something went wrong while saving FAQ", {
                    toastId: "faq-add-error"
                });
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="p-6 min-h-screen">
            {/* 🔹 Orange Gradient Header with Breadcrumbs */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Add New FAQ</h1>
                        <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                            <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                                <LayoutDashboard size={16} />
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <NavLink to="/faqs" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                                <FileText size={16} className="ml-1" />
                                FAQ Management
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <span className="text-white font-medium">Add FAQ</span>
                        </div>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-white text-sm">Create New FAQ Entry</p>
                    </div>
                </div>
            </div>

            {/* 🔹 Main Form Card */}
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">New FAQ</h2>
                                <p className="text-gray-600">Fill in the details to create a new FAQ entry</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="p-8 space-y-8">
                        {/* QUESTION FIELD */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-2xl border-2 border-blue-100">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Question <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={formik.values.question}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your FAQ question here..."
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all font-medium text-lg bg-white shadow-sm ${
                                            formik.touched.question && formik.errors.question
                                                ? "border-red-400 bg-red-50 focus:border-red-400"
                                                : "border-transparent focus:border-blue-400 hover:border-blue-200"
                                        }`}
                                    />
                                    {formik.touched.question && formik.errors.question && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="w-4 h-4 font-bold">!</span>
                                            {formik.errors.question}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ANSWER FIELD */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-25 rounded-2xl border-2 border-emerald-100">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Answer <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="answer"
                                        rows={6}
                                        value={formik.values.answer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter detailed answer to the question..."
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-0 resize-vertical transition-all font-medium text-base bg-white shadow-sm ${
                                            formik.touched.answer && formik.errors.answer
                                                ? "border-red-400 bg-red-50 focus:border-red-400"
                                                : "border-transparent focus:border-emerald-400 hover:border-emerald-200"
                                        }`}
                                    />
                                    {formik.touched.answer && formik.errors.answer && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="w-4 h-4 font-bold">!</span>
                                            {formik.errors.answer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-2 py-6 rounded-b-2xl">
                            <button
                                type="button"
                                onClick={() => navigate("/faqs")}
                                className="flex items-center justify-center gap-2 flex-1 sm:w-auto px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <ChevronLeft size={18} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading || !formik.isValid}
                                className="flex items-center justify-center gap-2 flex-1 sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save FAQ
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFaq;