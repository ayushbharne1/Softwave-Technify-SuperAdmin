// import React from "react";
// import { LayoutDashboard, FileText, Edit, ArrowLeft, Eye, Clock, ChevronLeft } from "lucide-react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ViewFaq = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const { faqs = [] } = useSelector(state => state.getfaq);
//     const faq = faqs.find((f) => f._id === id);

//     if (!faq) {
//         return (
//             <div className="p-6 min-h-screen  flex items-center justify-center">
//                 <div className="text-center max-w-md">
//                     <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                         <FileText className="w-12 h-12 text-red-500" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ Not Found</h2>
//                     <p className="text-gray-600 mb-8">The FAQ you're looking for doesn't exist or has been removed.</p>
//                     <button 
//                         onClick={() => navigate("/faqs")}
//                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all mx-auto"
//                     >
//                         <ChevronLeft size={18} />
//                         Back to FAQs
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 min-h-screen">
//             {/* 🔹 Orange Gradient Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//                             <Eye className="w-8 h-8" />
//                             View FAQ
//                         </h1>
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
//                             <span className="text-white font-medium">View FAQ</span>
//                         </div>
//                     </div>
//                     <div className="bg-white/20 px-4 py-2 rounded-lg">
//                         <p className="text-white text-sm">FAQ ID: {id?.slice(-6)}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* 🔹 Main Content Card */}
//             <div className="max-w-full mx-auto">
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//                     {/* Header */}
//                     <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
//                         <div className="flex items-start lg:items-center justify-between gap-4 flex-wrap">
//                             <div className="flex items-center gap-4 flex-1 min-w-0">
//                                 <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
//                                     <FileText className="w-7 h-7 text-white" />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <h2 className="text-2xl font-bold text-gray-900 leading-tight truncate">
//                                         {faq.question}
//                                     </h2>
//                                     <div className="flex items-center gap-4 mt-2">
//                                         <div className="flex items-center gap-1 text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
//                                             <Clock className="w-4 h-4" />
//                                             FAQ Entry
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-8">
//                         {/* Answer Section */}
//                         <div className="space-y-6 mb-10">
//                             <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-25 rounded-3xl border border-emerald-100 shadow-lg">
//                                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl mt-1">
//                                     <FileText className="w-6 h-6 text-white" />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-center gap-2 mb-4">
//                                         <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                                         <h3 className="text-xl font-bold text-gray-900">Answer</h3>
//                                     </div>
//                                     <div className="prose prose-sm max-w-none leading-relaxed">
//                                         <p className="text-gray-800 text-lg whitespace-pre-wrap">
//                                             {faq.answer}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                             <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
//                                         <FileText className="w-5 h-5 text-white" />
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">Question</p>
//                                     </div>
//                                 </div>
//                                 <p className="text-gray-900 font-semibold text-lg leading-relaxed whitespace-pre-wrap">
//                                     {faq.question}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-8 rounded-b-3xl">
//                             <button
//                                 onClick={() => navigate("/faqs")}
//                                 className="flex items-center justify-center gap-2 flex-1 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//                             >
//                                 <ChevronLeft size={20} />
//                                 Back to FAQs
//                             </button>

//                             <button
//                                 onClick={() => navigate(`/faqs/edit/${faq._id}`)}
//                                 className="flex items-center justify-center gap-2 flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//                             >
//                                 <Edit size={20} />
//                                 Edit FAQ
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewFaq;





import React, { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Edit, Eye, Clock, ChevronLeft } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

/* ================= STATIC MOCK DATA (Same as Main Page) ================= */
const INITIAL_FAQS = [
    {
        _id: "1",
        question: "How do I reset my password?",
        answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email address to create a new password."
    },
    {
        _id: "2",
        question: "Is there a mobile app available?",
        answer: "Yes, our mobile app is available for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store."
    },
    {
        _id: "3",
        question: "How can I contact customer support?",
        answer: "You can contact our customer support team via the 'Help' section in your dashboard, or by emailing us directly at support@example.com. We are available 24/7."
    }
];

const ViewFaq = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Local state to hold the found FAQ
    const [faq, setFaq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate finding FAQ from the static list
        const foundFaq = INITIAL_FAQS.find((f) => f._id === id);
        setFaq(foundFaq);
        setLoading(false);
    }, [id]);

    /* ================= LOADING STATE ================= */
    if (loading) {
        return <div className="p-6 min-h-screen flex items-center justify-center text-orange-500 font-bold">Loading...</div>;
    }

    /* ================= NOT FOUND STATE ================= */
    if (!faq) {
        return (
            <div className="p-6 min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ Not Found</h2>
                    <p className="text-gray-600 mb-8">The FAQ you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate("/faqs")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all mx-auto"
                    >
                        <ChevronLeft size={18} />
                        Back to FAQs
                    </button>
                </div>
            </div>
        );
    }

    /* ================= VIEW UI ================= */
    return (
        <div className="p-6 min-h-screen">
            {/* 🔹 Orange Gradient Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Eye className="w-8 h-8" />
                            View FAQ
                        </h1>
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
                            <span className="text-white font-medium">View FAQ</span>
                        </div>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="text-white text-sm">FAQ ID: {id?.slice(-6)}</p>
                    </div>
                </div>
            </div>

            {/* 🔹 Main Content Card */}
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
                        <div className="flex items-start lg:items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                                    <FileText className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                        {faq.question}
                                    </h2>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full border border-orange-100">
                                            <Clock className="w-4 h-4" />
                                            FAQ Entry
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Answer Display */}
                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-25 rounded-3xl border border-emerald-100 shadow-md">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg mt-1">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <h3 className="text-xl font-bold text-gray-900">Answer</h3>
                                    </div>
                                    <div className="prose prose-sm max-w-none leading-relaxed">
                                        <p className="text-gray-800 text-lg whitespace-pre-wrap">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Question Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-700 uppercase tracking-wide">Original Question</p>
                                    </div>
                                </div>
                                <p className="text-gray-900 font-semibold text-lg leading-relaxed">
                                    {faq.question}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                            <button
                                onClick={() => navigate("/faqs")}
                                className="flex items-center justify-center gap-2 flex-1 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
                            >
                                <ChevronLeft size={20} />
                                Back to FAQs
                            </button>

                            <button
                                onClick={() => navigate(`/faqs/edit/${faq._id}`)}
                                className="flex items-center justify-center gap-2 flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
                            >
                                <Edit size={20} />
                                Edit FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFaq;