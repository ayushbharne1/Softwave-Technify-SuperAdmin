import { Eye, Edit2, Trash2, LayoutDashboard, PlusIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { getFaqs } from "../../../redux/slice/faq/GetFaqSlice";
import { deleteFaq, resetDelete } from "../../../redux/slice/faq/DeleteFaqSlice";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

export default function Faqs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        faqs = [],
        loading,
        error
    } = useSelector((state) => state.getfaq);
    const {
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError
    } = useSelector((state) => state.delfaq);

    /* ================= LOCAL STATE ================= */
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFaqId, setSelectedFaqId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    /* ================= FETCH FAQS ================= */
    useEffect(() => {
        dispatch(getFaqs());
    }, [dispatch]);

    /* ================= DELETE SUCCESS ================= */
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("FAQ deleted successfully");
            setShowDeleteModal(false);
            setSelectedFaqId(null);
            dispatch(resetDelete());
            dispatch(getFaqs());
        }
    }, [deleteSuccess, dispatch]);

    /* ================= DELETE ERROR ================= */
    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError);
            dispatch(resetDelete());
        }
    }, [deleteError, dispatch]);

    /* ================= HANDLERS ================= */
    const handleDeleteClick = (id) => {
        setSelectedFaqId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedFaqId) {
            dispatch(deleteFaq(selectedFaqId));
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedFaqId(null);
    };

    /* ================= SEARCH FILTER ================= */
    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ================= UI STATES ================= */
    if (loading) {
        return <div className=" h-[60vh]">
            <LoaderSpinner></LoaderSpinner>
        </div>
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-white">FAQs</h1>

                <div className="text-[15px] text-white flex items-center gap-2 mt-2">
                    <NavLink to="/dashboard">
                        <LayoutDashboard size={16} />
                    </NavLink>
                    <span>&gt;</span>
                    <span>FAQs</span>
                </div>
            </div>

            {/* ================= SEARCH + ADD ================= */}
            <div className="mb-6 flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={() => navigate("/faqs/addfaqs")}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white px-4 py-2 rounded"
                >
                    <PlusIcon size={18} />
                    Add FAQ
                </button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full  divide-y divide-gray-400">
                    <thead className="bg-[#1d476e33]">
                        <tr className="uppercase text-black text-sm">
                            <th className="px-4 py-3 text-center">Sr.No.</th>
                            <th className="px-4 py-3 text-center">Question</th>
                            <th className="px-4 py-3 text-center">Answer</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {filteredFaqs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-400">
                                    No FAQs found
                                </td>
                            </tr>
                        )}

                        {filteredFaqs.map((faq, index) => (
                            <tr key={faq._id} className="transition border-b border-gray-300">
                                <td className="text-center py-3">{index + 1}</td>
                                <td className="text-center py-3">{faq.question}</td>
                                <td className="text-center py-3">{faq.answer}</td>

                                <td className="text-center py-3">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => navigate(`/faqs/viewfaqs/${faq._id}`)}>
                                            <Eye size={16} className="text-blue-600 hover:text-blue-800" />
                                        </button>

                                        <button onClick={() => navigate(`/faqs/editfaqs/${faq._id}`)}>
                                            <Edit2 size={16} className="text-blue-600 hover:text-blue-800" />
                                        </button>

                                        <button onClick={() => handleDeleteClick(faq._id)}>
                                            <Trash2 size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= DELETE MODAL ================= */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[400px]">
                        <p className="text-lg mb-4">
                            Are you sure you want to delete this FAQ?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                disabled={deleteLoading}
                                className="bg-red-600 text-white px-4 py-1 rounded"
                            >
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
