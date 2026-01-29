import React from "react";
import { LayoutDashboard, Edit, ArrowLeft } from "lucide-react";
import { NavLink, useNavigate, useParams, } from "react-router-dom";
import { useSelector } from "react-redux";


const ViewFaq = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const faqs = JSON.parse(localStorage.getItem("faqs")) || [];
    const { faqs = [] } = useSelector(state => state.getfaq);

    const faq = faqs.find((f) => f._id === id);
    console.log("faqqqq", faqs)

    if (!faq) {
        return (
            <p className="text-center text-red-500 mt-10">
                FAQ not Found
            </p>
        );
    }

    return (
        <>
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-white">
                    View FAQ
                </h1>

                <div className="text-[15px] text-white flex items-center gap-2 mt-2">
                    <NavLink to="/dashboard" className="hover:text-blue-200">
                        <LayoutDashboard size={16} />
                    </NavLink>
                    <span>&gt;</span>
                    <NavLink to="/faqs" className="hover:text-blue-200">
                        FAQs
                    </NavLink>
                    <span>&gt;</span>
                    <span>View FAQ</span>
                </div>
            </div>

            {/* CARD */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    FAQ Details
                </h2>

                <div className="space-y-5">
                    {/* QUESTION */}
                    <div>
                        <label className="block text-sm font-semibold  text-gray-800 mb-2">
                            Question
                        </label>
                        <div className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800">
                            {faq.question}
                        </div>
                    </div>

                    {/* ANSWER */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Answer
                        </label>
                        <div className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 leading-relaxed">
                            {faq.answer}
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between items-center pt-8">
                    <button
                        onClick={() => navigate("/faqs")}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg border font-semibold text-gray-600 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    {/* <button
                        onClick={() => navigate(`/faqs/edit/${faq.id}`)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg 
            bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] 
            text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        <Edit size={18} />
                        Edit FAQ
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default ViewFaq;
