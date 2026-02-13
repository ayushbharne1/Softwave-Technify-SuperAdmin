// import React from "react";
// import { LayoutDashboard, Save } from "lucide-react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { editFaq } from "../../../redux/slice/faq/EditfaqSlice";

// const EditFaq = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { faqs } = useSelector((state) => state.getfaq);
//     const faq = faqs.find((f) => f._id === id);

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             question: faq?.question || "",
//             answer: faq?.answer || "",
//             status: faq?.status || "Active",
//         },
//         validate: (values) => {
//             const errors = {};
//             if (!values.question.trim()) errors.question = "Question is required";
//             if (!values.answer.trim()) errors.answer = "Answer is required";
//             return errors;
//         },
//         onSubmit: async (values) => {
//             try {
//                 await dispatch(
//                     editFaq({
//                         id,
//                         faqData: values,
//                     })
//                 ).unwrap();

//                 toast.success("FAQ updated successfully");
//                 navigate("/faqs");
//             } catch (err) {
//                 toast.error(err || "Failed to update FAQ");
//             }
//         },
//     });

//     if (!faq) {
//         return <p className="text-center text-red-500 mt-10">FAQ not found</p>;
//     }

//     return (
//         <>
//             {/* HEADER */}
//             <div className="bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-8 mt-6">
//                 <h1 className="text-2xl font-semibold text-white">Edit FAQ</h1>
//                 <div className="text-[15px] text-white flex items-center gap-2 mt-2">
//                     <NavLink to="/dashboard">
//                         <LayoutDashboard size={16} />
//                     </NavLink>
//                     <span>&gt;</span>
//                     <NavLink to="/faqs">FAQs</NavLink>
//                     <span>&gt;</span>
//                     <span>Edit</span>
//                 </div>
//             </div>

//             {/* FORM */}
//             <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//                 <form onSubmit={formik.handleSubmit} className="space-y-6">
//                     <div>
//                         <label className="font-semibold text-sm">Question</label>
//                         <input
//                             name="question"
//                             value={formik.values.question}
//                             onChange={formik.handleChange}
//                             className="w-full p-3 border rounded-lg mt-1"
//                         />
//                         {formik.errors.question && (
//                             <p className="text-red-500 text-sm">{formik.errors.question}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label className="font-semibold text-sm">Answer</label>
//                         <textarea
//                             name="answer"
//                             rows={5}
//                             value={formik.values.answer}
//                             onChange={formik.handleChange}
//                             className="w-full p-3 border rounded-lg mt-1"
//                         />
//                         {formik.errors.answer && (
//                             <p className="text-red-500 text-sm">{formik.errors.answer}</p>
//                         )}
//                     </div>

//                     <div className="flex gap-4">
//                         <button
//                             type="button"
//                             onClick={() => navigate("/faqs")}
//                             className="px-6 py-2 border rounded-lg"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] text-white"
//                         >
//                             <Save size={18} />
//                             Update FAQ
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default EditFaq;





import React, { useState, useEffect } from "react";
import { LayoutDashboard, Save, FileText, ChevronLeft, Edit3, HelpCircle } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

/* ================= STATIC MOCK DATA ================= */
const INITIAL_FAQS = [
    { _id: "1", question: "How do I reset my password?", answer: "To reset your password...", status: "Active" },
    { _id: "2", question: "Is there a mobile app available?", answer: "Yes, our mobile app...", status: "Active" },
    { _id: "3", question: "How can I contact customer support?", answer: "You can contact...", status: "Active" }
];

const EditFaq = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faq, setFaq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundFaq = INITIAL_FAQS.find((f) => f._id === id);
        setFaq(foundFaq);
        setLoading(false);
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: faq?.question || "",
            answer: faq?.answer || "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.question.trim()) errors.question = "Question is required";
            if (!values.answer.trim()) errors.answer = "Answer is required";
            return errors;
        },
        onSubmit: (values) => {
            console.log("Updated Values:", values);
            toast.success("FAQ updated successfully");
            navigate("/faqs");
        },
    });

    if (loading) return <div className="p-6 text-center text-orange-500 font-bold">Loading...</div>;

    if (!faq) {
        return (
            <div className="p-6 min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ Not Found</h2>
                    <button onClick={() => navigate("/faqs")} className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl mx-auto">
                        <ChevronLeft size={18} /> Back to FAQs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            {/* 🔹 Orange Gradient Header (Matches ViewFaq) */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            {/* <Edit3 className="w-8 h-8" /> */}
                            Edit FAQ
                        </h1>
                        <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                            <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                                <LayoutDashboard size={16} />
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <NavLink to="/faqs" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                                <FileText size={16} />
                                FAQ Management
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <span className="text-white font-medium">Edit FAQ</span>
                        </div>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-white text-sm">Editing ID: {id?.slice(-6)}</p>
                    </div>
                </div>
            </div>

            {/* 🔹 Main Form Card */}
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <HelpCircle className="text-white w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Modify FAQ Details</h2>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="p-8 space-y-8">
                        {/* Question Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                                Question
                            </label>
                            <input
                                type="text"
                                name="question"
                                value={formik.values.question}
                                onChange={formik.handleChange}
                                className={`w-full p-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-100 ${
                                    formik.errors.question ? 'border-red-300' : 'border-gray-100 focus:border-orange-400'
                                }`}
                                placeholder="Write the question here..."
                            />
                            {formik.errors.question && <p className="text-red-500 text-xs font-bold ml-2">{formik.errors.question}</p>}
                        </div>

                        {/* Answer Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                                Answer
                            </label>
                            <textarea
                                name="answer"
                                rows={6}
                                value={formik.values.answer}
                                onChange={formik.handleChange}
                                className={`w-full p-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none focus:bg-white focus:ring-4 focus:ring-orange-100 ${
                                    formik.errors.answer ? 'border-red-300' : 'border-gray-100 focus:border-orange-400'
                                }`}
                                placeholder="Provide the detailed answer..."
                            />
                            {formik.errors.answer && <p className="text-red-500 text-xs font-bold ml-2">{formik.errors.answer}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate("/faqs")}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                            >
                                <ChevronLeft size={20} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 transition-all transform hover:-translate-y-1"
                            >
                                <Save size={20} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFaq;