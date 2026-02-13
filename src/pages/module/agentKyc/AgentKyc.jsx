// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FiEye } from "react-icons/fi";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { LayoutDashboard } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";

// import {
//   fetchAgentDetails,
//   approveAgentKyc,
// } from "../../../redux/slice/kyc/kycSlice";

// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// const statusStyles = {
//   submitted: "bg-yellow-100 text-yellow-700",
//   approved: "bg-green-100 text-green-700",
//   rejected: "bg-red-100 text-red-700",
// };

// const AgentKyc = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { list, loading, pagination
//   } = useSelector((state) => state.agentKyc);

//   useEffect(() => {
//     dispatch(fetchAgentDetails());
//   }, [dispatch]);
//   const handleApprove = (agentId) => {
//     dispatch(approveAgentKyc({ agentId, approved: true }));
//   };

//   const handleReject = (agentId) => {
//     const reason = prompt("Enter rejection reason");
//     if (!reason) return;

//     dispatch(
//       approveAgentKyc({
//         agentId,
//         approved: false,
//         rejectionReason: reason,
//       })
//     );
//   };

//   if (loading) {
//     return (
//       <div className="h-[60vh]">
//         <LoaderSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="mt-5 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
//         <h1 className="text-2xl font-semibold text-white">
//           Agent KYC Management
//         </h1>

//         <div className="text-[15px] flex items-center gap-2 text-blue-100 mt-2">
//           <NavLink to="/dashboard" className="flex items-center gap-1">
//             <LayoutDashboard size={16} />
//           </NavLink>
//           <span>&gt;</span>
//           <span className="text-white">Agent KYC Management</span>
//         </div>
//       </div>
//       <div className="overflow-x-auto bg-white rounded p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
//         <table className="min-w-full text-gray-700">
//           <thead className="bg-[#1d476e33] ">
//             <tr>
//               <th className="px-4 py-3 text-center">SR.NO</th>

//               <th className="px-4 py-3 text-center">Agent</th>
//               <th className="px-4 py-3 text-center">Phone</th>
//               <th className="px-4 py-3 text-center">Status</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {list.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="py-10 text-center text-gray-400">
//                   No KYC requests found
//                 </td>
//               </tr>
//             )}

//             {list.map((row, index) => {
//               const status = row.kycStatus || "submitted";

//               return (
//                 <tr key={row._id} className="hover:bg-gray-50 border-b border-gray-200">
//                   <td className="px-4 py-3 text-center font-medium" >{(pagination.page - 1) * pagination.limit + index + 1}</td>

//                   <td className="px-4 py-3 text-center font-medium">
//                     {row.name}
//                   </td>

//                   <td className="px-4 py-3 text-center">
//                     {row.phone}
//                   </td>

//                   <td className="px-4 py-3 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
//                     >
//                       {status.toUpperCase()}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3 text-center">
//                     <div className="inline-flex gap-2">
//                       <button
//                         onClick={() => navigate(`/agentkyc/viewkyc/${row._id}`)}
//                         className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-700"
//                       >
//                         <FiEye />
//                       </button>
//                       {row.kycStatus === "submitted" && (
//                         <>
//                           <button
//                             onClick={() => handleApprove(row._id)}
//                             className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-700"
//                           >
//                             <FaCheckCircle />
//                           </button>

//                           <button
//                             onClick={() => handleReject(row._id)}
//                             className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-700"
//                           >
//                             <FaTimesCircle />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="flex justify-center gap-3 mt-4">
//           <button
//             disabled={pagination.page === 1}
//             onClick={() => dispatch(fetchAgentDetails(pagination.page - 1))}
//             className="px-2 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span className="text-sm ">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>

//           <button
//             disabled={pagination.page === pagination.totalPages}
//             onClick={() => dispatch(fetchAgentDetails(pagination.page + 1))}
//             className="px-2 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AgentKyc;







import React, { useState } from "react";
import { LayoutDashboard, Users, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ================= STATIC MOCK DATA ================= */
const MOCK_KYC_LIST = [
    { _id: "101", name: "Rahul Sharma", phone: "+91 9876543210", kycStatus: "submitted", email: "rahul@example.com" },
    { _id: "102", name: "Anjali Gupta", phone: "+91 8888877777", kycStatus: "approved", email: "anjali@example.com" },
    { _id: "103", name: "Vikram Singh", phone: "+91 9990001112", kycStatus: "rejected", email: "vikram@example.com" },
    { _id: "104", name: "Suresh Raina", phone: "+91 7776665554", kycStatus: "submitted", email: "suresh@example.com" },
    { _id: "105", name: "Priya Verma", phone: "+91 9123456789", kycStatus: "approved", email: "priya@example.com" },
];

const statusStyles = {
    submitted: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
};

const AgentKyc = () => {
    const navigate = useNavigate();
    const [list, setList] = useState(MOCK_KYC_LIST);
    const [loading] = useState(false);

    // Static Pagination State
    const [pagination] = useState({ page: 1, totalPages: 1, limit: 10 });

    const handleApprove = (agentId) => {
        setList(list.map(agent => agent._id === agentId ? { ...agent, kycStatus: 'approved' } : agent));
        toast.success("Agent KYC Approved Successfully");
    };

    const handleReject = (agentId) => {
        const reason = prompt("Enter rejection reason");
        if (!reason) return;
        setList(list.map(agent => agent._id === agentId ? { ...agent, kycStatus: 'rejected' } : agent));
        toast.error("Agent KYC Rejected");
    };

    return (
        <div className="p-6 min-h-screen">
            {/* 🔹 Orange Gradient Header (Matches your other components) */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Users className="w-8 h-8" />
                            Agent KYC Management
                        </h1>
                        <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                            <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                                <LayoutDashboard size={16} />
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <span className="text-white font-medium">Agent KYC Management</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-200 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search agents..." 
                            className="bg-white/10 border border-white/20 text-white placeholder:text-orange-200 text-sm rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white/20 transition-all w-64"
                        />
                    </div>
                </div>
            </div>

            {/* 🔹 Table Content Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">SR.NO</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Agent Details</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Phone Number</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {list.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 font-medium">
                                        No KYC requests found
                                    </td>
                                </tr>
                            ) : (
                                list.map((row, index) => (
                                    <tr key={row._id} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-6 py-5 text-center text-sm font-semibold text-gray-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                                                    {row.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{row.name}</p>
                                                    <p className="text-xs text-gray-500">{row.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center text-sm font-medium text-gray-600">
                                            {row.phone}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${statusStyles[row.kycStatus]}`}>
                                                {row.kycStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/agentkyc/viewkyc/${row._id}`)}
                                                    className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                    title="View KYC"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                
                                                {row.kycStatus === "submitted" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(row._id)}
                                                            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(row._id)}
                                                            className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Custom Pagination Bar */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900">{list.length}</span> agents
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex gap-1">
                            <button className="w-9 h-9 rounded-lg bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-200">1</button>
                        </div>
                        <button className="p-2 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all disabled:opacity-50" disabled>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentKyc;