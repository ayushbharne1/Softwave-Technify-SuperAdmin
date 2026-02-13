// import { Eye, Edit2, Trash2, LayoutDashboard, Search, Plus, FileText, ChevronDown } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";

// import { getFaqs } from "../../../redux/slice/faq/GetFaqSlice";
// import { deleteFaq, resetDelete } from "../../../redux/slice/faq/DeleteFaqSlice";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// export default function Faqs() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {
//         faqs = [],
//         loading,
//         error
//     } = useSelector((state) => state.getfaq);
//     const {
//         loading: deleteLoading,
//         success: deleteSuccess,
//         error: deleteError
//     } = useSelector((state) => state.delfaq);

//     /* ================= LOCAL STATE ================= */
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedFaqId, setSelectedFaqId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [expandedFaqId, setExpandedFaqId] = useState(null); 

//     /* ================= FETCH FAQS ================= */
//     useEffect(() => {
//         dispatch(getFaqs());
//     }, [dispatch]);

//     /* ================= DELETE SUCCESS ================= */
//     useEffect(() => {
//         if (deleteSuccess) {
//             toast.success("FAQ deleted successfully", {
//                 toastId: "faq-delete-success"
//             });
//             setShowDeleteModal(false);
//             setSelectedFaqId(null);
//             dispatch(resetDelete());
//             dispatch(getFaqs());
//         }
//     }, [deleteSuccess, dispatch]);

//     /* ================= DELETE ERROR ================= */
//     useEffect(() => {
//         if (deleteError) {
//             toast.error(deleteError, {
//                 toastId: "faq-delete-error"
//             });
//             dispatch(resetDelete());
//         }
//     }, [deleteError, dispatch]);

//     /* ================= HANDLERS ================= */
//     const handleDeleteClick = (id) => {
//         setSelectedFaqId(id);
//         setShowDeleteModal(true);
//     };

//     const toggleFaqExpand = (faqId) => {
//         setExpandedFaqId(expandedFaqId === faqId ? null : faqId); // Toggle expand/collapse
//     };

//     const confirmDelete = () => {
//         if (selectedFaqId) {
//             dispatch(deleteFaq(selectedFaqId));
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//         setSelectedFaqId(null);
//     };

//     /* ================= SEARCH FILTER ================= */
//     const filteredFaqs = faqs.filter(
//         (faq) =>
//             faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     /* ================= UI STATES ================= */
//     if (loading) {
//         return (
//             <div className="">
//                 <LoaderSpinner size="lg" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 min-h-screen flex items-center justify-center">
//                 <div className="text-center max-w-md">
//                     <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                         <FileText className="w-10 h-10 text-red-500" />
//                     </div>
//                     <p className="text-xl font-semibold text-gray-800 mb-2">{error}</p>
//                     <button 
//                         onClick={() => dispatch(getFaqs())}
//                         className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 min-h-screen">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
//                         <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
//                             <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
//                                 <LayoutDashboard size={16} />
//                             </NavLink>
//                             <span className="text-white/60">›</span>
//                             <span className="text-white font-medium">FAQ Management</span>
//                         </div>
//                     </div>
//                     {/* <div className="bg-white/20 px-4 py-2 rounded-lg">
//                         <p className="text-white text-sm">{faqs.length} Total FAQs</p>
//                     </div> */}
//                 </div>
//             </div>

//             {/* Controls Bar */}
//             <div className="flex flex-col lg:flex-row gap-4 mb-8">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                         type="text"
//                         placeholder="Search FAQs by question or answer..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
//                     />
//                 </div>

//                 <button
//                     onClick={() => navigate("/faqs/add")}
//                     className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 whitespace-nowrap"
//                 >
//                     <Plus size={20} />
//                     Add New FAQ
//                 </button>
//             </div>

//             {/* FAQs Grid */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//                 <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                     <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                         <FileText size={24} className="text-orange-500" />
//                         FAQ List
//                     </h3>
//                     {/* <p className="text-gray-600 mt-1">{filteredFaqs.length} FAQs found</p> */}
//                 </div>

//                 <div className="p-6">
//                     {filteredFaqs.length === 0 ? (
//                         <div className="text-center py-20">
//                             <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                                 <FileText className="w-12 h-12 text-gray-400" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-gray-800 mb-2">No FAQs Found</h3>
//                             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                                 {searchTerm ? "Try adjusting your search terms" : "No FAQs available. Create your first FAQ!"}
//                             </p>
//                             <button
//                                 onClick={() => navigate("/faqs/add")}
//                                 className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
//                             >
//                                 <Plus size={18} />
//                                 Create First FAQ
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             {filteredFaqs.map((faq, index) => (
//                                 <div key={faq._id} className="group bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden">
//                                     {/* FAQ Header with + Button */}
//                                     <div 
//                                         className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-start justify-between gap-4"
//                                         onClick={() => toggleFaqExpand(faq._id)}
//                                     >
//                                         <div className="flex items-start gap-4 flex-1">
//                                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md transition-all ${expandedFaqId === faq._id ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-orange-100 to-orange-200'}`}>
//                                                 <FileText className={`w-5 h-5 transition-all ${expandedFaqId === faq._id ? 'text-white' : 'text-orange-600'}`} />
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                                 <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-1 group-hover:text-orange-700">
//                                                     {faq.question}
//                                                 </h4>
//                                                 <p className="text-xs text-gray-500 font-medium">#{index + 1}</p>
//                                             </div>
//                                         </div>
                                        
//                                         {/* + Toggle Button */}
//                                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 ${expandedFaqId === faq._id ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-100 hover:bg-orange-200'}`}>
//                                             <ChevronDown 
//                                                 size={20} 
//                                                 className={`transition-all duration-300 ${expandedFaqId === faq._id ? 'rotate-180 text-white' : 'text-orange-600'}`}
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* ✅ EXPANDED CONTENT with Answer + Actions */}
//                                     {expandedFaqId === faq._id && (
//                                         <div className="border-t border-gray-100 bg-gradient-to-b from-orange-50 to-white">
//                                             {/* Answer */}
//                                             <div className="p-6 pt-0 mt-3">
//                                                 <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
//                                                     <h5 className="font-semibold text-gray-800 text-sm mb-2 uppercase tracking-wide text-orange-600">Answer</h5>
//                                                     <p className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
//                                                         {faq.answer}
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                             {/* Action Buttons */}
//                                             <div className="px-6 pb-6">
//                                                 <div className="flex items-center gap-3">
//                                                     <button
//                                                         onClick={() => navigate(`/faqs/view/${faq._id}`)}
//                                                         className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
//                                                         title="View Details"
//                                                     >
//                                                         <Eye size={16} />
//                                                         <span className="text-sm">View</span>
//                                                     </button>

//                                                     <button
//                                                         onClick={() => navigate(`/faqs/edit/${faq._id}`)}
//                                                         className="flex-1 flex items-center justify-center gap-2 p-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
//                                                         title="Edit FAQ"
//                                                     >
//                                                         <Edit2 size={16} />
//                                                         <span className="text-sm">Edit</span>
//                                                     </button>

//                                                     <button
//                                                         onClick={() => handleDeleteClick(faq._id)}
//                                                         className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
//                                                         title="Delete FAQ"
//                                                     >
//                                                         <Trash2 size={16} />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* DELETE MODAL (Same as before) */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                                     <Trash2 className="w-6 h-6 text-red-600" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-xl font-bold text-gray-900">Delete FAQ</h3>
//                                     <p className="text-gray-600 mt-1">Are you sure you want to delete this FAQ?</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="p-6">
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                                 This action cannot be undone. This will permanently delete the FAQ and remove it from your list.
//                             </p>
//                         </div>
//                         <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex items-center justify-end gap-3">
//                             <button
//                                 onClick={cancelDelete}
//                                 className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:shadow-sm transition-all"
//                                 disabled={deleteLoading}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={confirmDelete}
//                                 disabled={deleteLoading}
//                                 className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {deleteLoading ? (
//                                     <>
//                                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                         Deleting...
//                                     </>
//                                 ) : (
//                                     "Delete FAQ"
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }





import { Eye, Edit2, Trash2, LayoutDashboard, Search, Plus, FileText, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Loader ko check karne ke liye import rakha hai
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

/* ================= STATIC MOCK DATA ================= */
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

export default function Faqs() {
    const navigate = useNavigate();

    /* ================= LOCAL STATE ================= */
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFaqId, setSelectedFaqId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedFaqId, setExpandedFaqId] = useState(null); 
    const [deleteLoading, setDeleteLoading] = useState(false);

    /* ================= INITIAL LOAD (SIMULATED) ================= */
    useEffect(() => {
        // API fetch ko simulate karne ke liye
        const timer = setTimeout(() => {
            setFaqs(INITIAL_FAQS);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    /* ================= HANDLERS ================= */
    const handleDeleteClick = (id) => {
        setSelectedFaqId(id);
        setShowDeleteModal(true);
    };

    const toggleFaqExpand = (faqId) => {
        setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
    };

    const confirmDelete = () => {
        if (selectedFaqId) {
            setDeleteLoading(true);
            
            // Delete action simulate karne ke liye
            setTimeout(() => {
                setFaqs(faqs.filter(faq => faq._id !== selectedFaqId));
                setDeleteLoading(false);
                setShowDeleteModal(false);
                setSelectedFaqId(null);
                toast.success("FAQ deleted successfully");
            }, 1000);
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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoaderSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
                        <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                            <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                                <LayoutDashboard size={16} />
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <span className="text-white font-medium">FAQ Management</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search FAQs by question or answer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={() => navigate("/faqs/add")}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 whitespace-nowrap"
                >
                    <span className="bg-white/20 p-1 rounded-lg"><Plus size={20} /></span>
                    Add New FAQ
                </button>
            </div>

            {/* FAQs Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText size={24} className="text-orange-500" />
                        FAQ List
                    </h3>
                </div>

                <div className="p-6">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No FAQs Found</h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                {searchTerm ? "Try adjusting your search terms" : "No FAQs available. Create your first FAQ!"}
                            </p>
                            <button
                                onClick={() => navigate("/faqs/add")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <Plus size={18} />
                                Create First FAQ
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div key={faq._id} className="group bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden">
                                    <div 
                                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-start justify-between gap-4"
                                        onClick={() => toggleFaqExpand(faq._id)}
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md transition-all ${expandedFaqId === faq._id ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-orange-100 to-orange-200'}`}>
                                                <FileText className={`w-5 h-5 transition-all ${expandedFaqId === faq._id ? 'text-white' : 'text-orange-600'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-1 group-hover:text-orange-700">
                                                    {faq.question}
                                                </h4>
                                                <p className="text-xs text-gray-500 font-medium">#{index + 1}</p>
                                            </div>
                                        </div>
                                        
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 ${expandedFaqId === faq._id ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-100 hover:bg-orange-200'}`}>
                                            <ChevronDown 
                                                size={20} 
                                                className={`transition-all duration-300 ${expandedFaqId === faq._id ? 'rotate-180 text-white' : 'text-orange-600'}`}
                                            />
                                        </div>
                                    </div>

                                    {expandedFaqId === faq._id && (
                                        <div className="border-t border-gray-100 bg-gradient-to-b from-orange-50 to-white">
                                            <div className="p-6 pt-0 mt-3">
                                                <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
                                                    <h5 className="font-semibold text-gray-800 text-sm mb-2 uppercase tracking-wide text-orange-600">Answer</h5>
                                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="px-6 pb-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); navigate(`/faqs/view/${faq._id}`); }}
                                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
                                                    >
                                                        <Eye size={16} />
                                                        <span className="text-sm">View</span>
                                                    </button>

                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); navigate(`/faqs/edit/${faq._id}`); }}
                                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
                                                    >
                                                        <Edit2 size={16} />
                                                        <span className="text-sm">Edit</span>
                                                    </button>

                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(faq._id); }}
                                                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Trash2 className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Delete FAQ</h3>
                                    <p className="text-gray-600 mt-1">Are you sure you want to delete this FAQ?</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 text-sm leading-relaxed">
                                This action cannot be undone. This will permanently delete the FAQ and remove it from your list.
                            </p>
                        </div>
                        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex items-center justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleteLoading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:from-red-600 transition-all disabled:opacity-50"
                            >
                                {deleteLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete FAQ"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}