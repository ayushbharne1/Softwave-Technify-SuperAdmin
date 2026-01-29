import React from "react";
import { LayoutDashboard, Save } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editFaq } from "../../../redux/slice/faq/EditfaqSlice";

const EditFaq = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { faqs } = useSelector((state) => state.getfaq);
    const faq = faqs.find((f) => f._id === id);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: faq?.question || "",
            answer: faq?.answer || "",
            status: faq?.status || "Active",
        },
        validate: (values) => {
            const errors = {};
            if (!values.question.trim()) errors.question = "Question is required";
            if (!values.answer.trim()) errors.answer = "Answer is required";
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await dispatch(
                    editFaq({
                        id,
                        faqData: values,
                    })
                ).unwrap();

                toast.success("FAQ updated successfully");
                navigate("/faqs");
            } catch (err) {
                toast.error(err || "Failed to update FAQ");
            }
        },
    });

    if (!faq) {
        return <p className="text-center text-red-500 mt-10">FAQ not found</p>;
    }

    return (
        <>
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-white">Edit FAQ</h1>
                <div className="text-[15px] text-white flex items-center gap-2 mt-2">
                    <NavLink to="/dashboard">
                        <LayoutDashboard size={16} />
                    </NavLink>
                    <span>&gt;</span>
                    <NavLink to="/faqs">FAQs</NavLink>
                    <span>&gt;</span>
                    <span>Edit</span>
                </div>
            </div>

            {/* FORM */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-semibold text-sm">Question</label>
                        <input
                            name="question"
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            className="w-full p-3 border rounded-lg mt-1"
                        />
                        {formik.errors.question && (
                            <p className="text-red-500 text-sm">{formik.errors.question}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-semibold text-sm">Answer</label>
                        <textarea
                            name="answer"
                            rows={5}
                            value={formik.values.answer}
                            onChange={formik.handleChange}
                            className="w-full p-3 border rounded-lg mt-1"
                        />
                        {formik.errors.answer && (
                            <p className="text-red-500 text-sm">{formik.errors.answer}</p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/faqs")}
                            className="px-6 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] text-white"
                        >
                            <Save size={18} />
                            Update FAQ
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditFaq;
