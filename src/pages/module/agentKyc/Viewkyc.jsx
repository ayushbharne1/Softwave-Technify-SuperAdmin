// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
// import { LayoutDashboard } from "lucide-react";
// import { toast } from "react-toastify";

// import {
//     fetchAgentDetails,
//     approveAgentKyc,
//     clearSelectedAgent,
// } from "../../../redux/slice/kyc/kycSlice";

// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// /* =======================
//    VIEW KYC COMPONENT
// ======================= */
// const ViewKyc = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     const { list, selectedAgent, loading } = useSelector(
//         (state) => state.agentKyc || {}
//     );

//     /* =======================
//        FETCH DATA
//     ======================= */
//     useEffect(() => {
//         if (id) {
//             // 🔹 If agent already in list, reuse it
//             const existingAgent = list?.find((a) => a._id === id);
//             if (existingAgent) {
//                 // optional: show instantly
//                 // selectedAgent redux me already null hoga, so direct set nahi kar rahe
//             }
//         }

//         return () => {
//             dispatch(clearSelectedAgent());
//         };
//     }, [dispatch, id, list]);

//     /* =======================
//        LOADING
//     ======================= */
//     if (loading) {
//         return (
//             <div className="mt-20 flex justify-center">
//                 <LoaderSpinner />
//             </div>
//         );
//     }

//     /* =======================
//        DATA SOURCE
//     ======================= */
//     const agent =
//         selectedAgent || list.find((item) => item._id === id);

//     if (!agent) {
//         return (
//             <p className="mt-10 text-center text-gray-500">
//                 No KYC data found
//             </p>
//         );
//     }

//     /* =======================
//        APPROVE
//     ======================= */
//     const handleApprove = () => {
//         dispatch(approveAgentKyc(agent._id))
//             .unwrap()
//             .then(() => toast.success("KYC Approved"))
//             .catch(() => toast.error("Approval failed"));
//     };

//     /* =======================
//        UI
//     ======================= */
//     return (
//         <div className="mx-auto mt-6 max-w-7xl">
//             {/* ===== HEADER ===== */}
//             <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg">
//                 <h1 className="text-2xl font-semibold text-white">
//                     Agent KYC Details
//                 </h1>

//                 <div className="text-sm text-white flex items-center gap-2 mt-2">
//                     <NavLink to="/dashboard">
//                         <LayoutDashboard size={16} />
//                     </NavLink>
//                     <span>&gt;</span>
//                     <NavLink to="/agentkyc">Agent KYC</NavLink>
//                     <span>&gt;</span>
//                     <span>View</span>
//                 </div>
//             </div>

//             {/* ===== BASIC INFO ===== */}
//             <div className="mt-6 bg-white rounded-2xl shadow p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Info label="Agent Name" value={agent.name} />
//                     <Info label="Phone Number" value={agent.phone} />
//                     <StatusBadge status={agent.kycStatus} />
//                 </div>

//                 {agent.kycStatus === "submitted" && (
//                     <button
//                         onClick={handleApprove}
//                         className="mt-6 px-5 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
//                     >
//                         Approve KYC
//                     </button>
//                 )}
//             </div>

//             {/* ===== DOCUMENT DETAILS ===== */}
//             <div className="mt-6 space-y-6">
//                 {/* Aadhaar */}
//                 <DocCard title="Aadhaar Details">
//                     <DocRow
//                         label="Aadhaar Number"
//                         value={agent.aadhaarDetails?.aadhaarNumber}
//                     />
//                     <DocRow
//                         label="Verification Status"
//                         value={
//                             agent.aadhaarDetails?.isVerified
//                                 ? "Verified"
//                                 : "Not Verified"
//                         }
//                         highlight
//                     />
//                 </DocCard>

//                 {/* PAN */}
//                 <DocCard title="PAN Details">
//                     <DocRow
//                         label="PAN Number"
//                         value={agent.panDetails?.panNumber}
//                     />
//                     <DocRow
//                         label="Verification Status"
//                         value={
//                             agent.panDetails?.isVerified
//                                 ? "Verified"
//                                 : "Not Verified"
//                         }
//                         highlight
//                     />
//                 </DocCard>

//                 {/* Bank */}
//                 <DocCard title="Bank Account Details">
//                     <DocRow
//                         label="Bank Name"
//                         value={agent.bankDetails?.bankName}
//                     />
//                     <DocRow
//                         label="Account Number"
//                         value={agent.bankDetails?.accountNumber}
//                     />
//                     <DocRow
//                         label="IFSC Code"
//                         value={agent.bankDetails?.ifscCode}
//                     />
//                     <DocRow
//                         label="Verification Status"
//                         value={
//                             agent.bankDetails?.isVerified
//                                 ? "Verified"
//                                 : "Not Verified"
//                         }
//                         highlight
//                     />
//                 </DocCard>
//             </div>
//         </div>
//     );
// };

// export default ViewKyc;

// /* =======================
//    SMALL COMPONENTS
// ======================= */

// const Info = ({ label, value }) => (
//     <div>
//         <p className="text-xs text-gray-400 uppercase">{label}</p>
//         <p className="text-sm font-semibold text-gray-800">
//             {value || "N/A"}
//         </p>
//     </div>
// );

// const StatusBadge = ({ status }) => {
//     const styles =
//         status === "approved"
//             ? "bg-green-100 text-green-700"
//             : status === "rejected"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-yellow-100 text-yellow-700";

//     return (
//         <div>
//             <p className="text-xs text-gray-400 uppercase">
//                 KYC Status
//             </p>
//             <span
//                 className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-semibold ${styles}`}
//             >
//                 {status?.toUpperCase()}
//             </span>
//         </div>
//     );
// };

// const DocCard = ({ title, children }) => (
//     <div className="bg-white rounded-2xl shadow p-6">
//         <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">
//             {title}
//         </h3>
//         <div className="space-y-3">{children}</div>
//     </div>
// );

// const DocRow = ({ label, value, highlight }) => (
//     <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
//         <span className="text-sm text-gray-500">{label}</span>
//         <span
//             className={`text-sm font-semibold ${highlight
//                     ? value === "Verified"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     : "text-gray-800"
//                 }`}
//         >
//             {value || "N/A"}
//         </span>
//     </div>
// );






import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShieldCheck, CreditCard, Landmark, CheckCircle, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

/* ================= STATIC MOCK DATA ================= */
const MOCK_KYC_DATA = [
    {
        _id: "101",
        name: "Rahul Sharma",
        phone: "+91 9876543210",
        kycStatus: "submitted",
        aadhaarDetails: { aadhaarNumber: "xxxx-xxxx-1234", isVerified: true },
        panDetails: { panNumber: "ABCDE1234F", isVerified: true },
        bankDetails: { bankName: "SBI", accountNumber: "3322114455", ifscCode: "SBIN0001234", isVerified: false }
    },
    {
        _id: "102",
        name: "Anjali Gupta",
        phone: "+91 8888877777",
        kycStatus: "approved",
        aadhaarDetails: { aadhaarNumber: "xxxx-xxxx-5678", isVerified: true },
        panDetails: { panNumber: "FGHIJ5678K", isVerified: true },
        bankDetails: { bankName: "HDFC", accountNumber: "9988776655", ifscCode: "HDFC0000123", isVerified: true }
    }
];

const ViewKyc = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find agent from static data
        const foundAgent = MOCK_KYC_DATA.find((a) => a._id === id);
        setAgent(foundAgent);
        setLoading(false);
    }, [id]);

    const handleApprove = () => {
        setAgent({ ...agent, kycStatus: "approved" });
        toast.success("Agent KYC Approved Successfully");
    };

    if (loading) return <div className="p-6 text-center text-orange-500 font-bold">Loading KYC Details...</div>;

    if (!agent) {
        return (
            <div className="p-10 text-center">
                <p className="text-gray-500 mb-4">No KYC data found for this agent.</p>
                <button onClick={() => navigate("/agentkyc")} className="text-orange-600 font-bold underline">Back to List</button>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            {/* 🔹 HEADER (Orange Gradient) */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8" />
                            Agent KYC Details
                        </h1>
                        <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                            <NavLink to="/dashboard" className="hover:text-white transition-colors">
                                <LayoutDashboard size={16} />
                            </NavLink>
                            <span className="text-white/60">›</span>
                            <NavLink to="/agentkyc" className="hover:text-white transition-colors">Agent KYC</NavLink>
                            <span className="text-white/60">›</span>
                            <span className="text-white font-medium">View Details</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate("/agentkyc")}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all text-sm font-medium"
                    >
                        <ChevronLeft size={16} /> Back to List
                    </button>
                </div>
            </div>

            {/* 🔹 MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COL: BASIC INFO & STATUS */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-inner">
                            {agent.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{agent.name}</h2>
                        <p className="text-gray-500 text-sm mb-6">{agent.phone}</p>
                        
                        <div className="inline-block px-6 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest mb-6 
                            ${agent.kycStatus === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}">
                            Status: {agent.kycStatus}
                        </div>

                        {agent.kycStatus === "submitted" && (
                            <button
                                onClick={handleApprove}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-emerald-200 transition-all transform hover:-translate-y-1"
                            >
                                <CheckCircle size={20} /> Approve KYC
                            </button>
                        )}
                    </div>
                </div>

                {/* RIGHT COL: DOCUMENT CARDS */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Aadhaar Card */}
                    <DocCard title="Aadhaar Verification" icon={<ShieldCheck className="text-blue-500" />}>
                        <DocRow label="Aadhaar Number" value={agent.aadhaarDetails?.aadhaarNumber} />
                        <DocRow 
                            label="Verification" 
                            value={agent.aadhaarDetails?.isVerified ? "Verified" : "Pending"} 
                            isStatus 
                            verified={agent.aadhaarDetails?.isVerified} 
                        />
                    </DocCard>

                    {/* PAN Card */}
                    <DocCard title="PAN Details" icon={<CreditCard className="text-orange-500" />}>
                        <DocRow label="PAN Number" value={agent.panDetails?.panNumber} />
                        <DocRow 
                            label="Verification" 
                            value={agent.panDetails?.isVerified ? "Verified" : "Pending"} 
                            isStatus 
                            verified={agent.panDetails?.isVerified} 
                        />
                    </DocCard>

                    {/* Bank Account Card */}
                    <DocCard title="Settlement Bank Account" icon={<Landmark className="text-emerald-500" />}>
                        <DocRow label="Bank Name" value={agent.bankDetails?.bankName} />
                        <DocRow label="Account Number" value={agent.bankDetails?.accountNumber} />
                        <DocRow label="IFSC Code" value={agent.bankDetails?.ifscCode} />
                        <DocRow 
                            label="Bank Verification" 
                            value={agent.bankDetails?.isVerified ? "Verified" : "Pending"} 
                            isStatus 
                            verified={agent.bankDetails?.isVerified} 
                        />
                    </DocCard>
                </div>
            </div>
        </div>
    );
};

/* ================= SMALL HELPER COMPONENTS ================= */

const DocCard = ({ title, icon, children }) => (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
            {icon}
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className="p-6 space-y-1">{children}</div>
    </div>
);

const DocRow = ({ label, value, isStatus, verified }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        {isStatus ? (
            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-tighter ${verified ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {value}
            </span>
        ) : (
            <span className="text-sm text-gray-800 font-bold">{value || "N/A"}</span>
        )}
    </div>
);

export default ViewKyc;