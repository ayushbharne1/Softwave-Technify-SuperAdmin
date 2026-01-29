// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, NavLink } from "react-router-dom";
// import { ChevronLeft } from "lucide-react";
// import { LayoutDashboard } from "lucide-react";
// import { toast } from "react-toastify";

// import {
//     fetchAgentDetails,
//     clearSelectedAgent,
//     approveAgentKyc,
// } from "../../../redux/slice/kyc/kycSlice";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// const ViewKyc = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { selectedAgent, loading } = useSelector(
//         (state) => state.agentKyc || {}
//     );

//     useEffect(() => {
//         if (id) dispatch(fetchAgentDetails(id));
//         return () => dispatch(clearSelectedAgent());
//     }, [dispatch, id]);

//     if (loading) {
//         return (
//             <div className="mt-20 flex justify-center">
//                 <LoaderSpinner />
//             </div>
//         );
//     }

//     if (!selectedAgent) {
//         return (
//             <p className="mt-10 text-center text-gray-500">
//                 No KYC data found
//             </p>
//         );
//     }

//     const agent = selectedAgent;

//     const handleApprove = () => {
//         dispatch(approveAgentKyc(agent._id))
//             .unwrap()
//             .then(() => toast.success("KYC Approved"))
//             .catch(() => toast.error("Approval failed"));
//     };

//     return (
//         <div className=" mx-auto mt-6 ">
//             {/* ===== HEADER ===== */}
//             <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg">
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
//                     <span>Agent KYC Details</span>
//                 </div>
//             </div>
//             <div className="mt-6 bg-white rounded-2xl shadow p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Info label="Agent Name" value={agent.name} />
//                     <Info label="Phone Number" value={agent.phone} />
//                     <StatusBadge status={agent.kycStatus} />
//                 </div>

//                 {agent.kycStatus === "pending" && (
//                     <button
//                         onClick={handleApprove}
//                         className="mt-6 px-5 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
//                     >
//                         Approve KYC
//                     </button>
//                 )}
//             </div>

//             {/* ===== DOCUMENT CARDS (1 CARD = 1 ROW) ===== */}
//             <div className="mt-6 space-y-6">
//                 {/* Aadhaar */}
//                 <DocCard title="Aadhaar Card Details">
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
//                 <DocCard title="PAN Card Details">
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
//             <p className="text-xs text-gray-400 uppercase">KYC Status</p>
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
//                 ? value === "Verified"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 : "text-gray-800"
//                 }`}
//         >
//             {value || "N/A"}
//         </span>
//     </div>
// );



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { toast } from "react-toastify";

import {
    fetchAgentDetails,
    approveAgentKyc,
    clearSelectedAgent,
} from "../../../redux/slice/kyc/kycSlice";

import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

/* =======================
   VIEW KYC COMPONENT
======================= */
const ViewKyc = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list, selectedAgent, loading } = useSelector(
        (state) => state.agentKyc || {}
    );

    /* =======================
       FETCH DATA
    ======================= */
    useEffect(() => {
        if (id) {
            // 🔹 If agent already in list, reuse it
            const existingAgent = list?.find((a) => a._id === id);
            if (existingAgent) {
                // optional: show instantly
                // selectedAgent redux me already null hoga, so direct set nahi kar rahe
            }
        }

        return () => {
            dispatch(clearSelectedAgent());
        };
    }, [dispatch, id, list]);

    /* =======================
       LOADING
    ======================= */
    if (loading) {
        return (
            <div className="mt-20 flex justify-center">
                <LoaderSpinner />
            </div>
        );
    }

    /* =======================
       DATA SOURCE
    ======================= */
    const agent =
        selectedAgent || list.find((item) => item._id === id);

    if (!agent) {
        return (
            <p className="mt-10 text-center text-gray-500">
                No KYC data found
            </p>
        );
    }

    /* =======================
       APPROVE
    ======================= */
    const handleApprove = () => {
        dispatch(approveAgentKyc(agent._id))
            .unwrap()
            .then(() => toast.success("KYC Approved"))
            .catch(() => toast.error("Approval failed"));
    };

    /* =======================
       UI
    ======================= */
    return (
        <div className="mx-auto mt-6 max-w-7xl">
            {/* ===== HEADER ===== */}
            <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg">
                <h1 className="text-2xl font-semibold text-white">
                    Agent KYC Details
                </h1>

                <div className="text-sm text-white flex items-center gap-2 mt-2">
                    <NavLink to="/dashboard">
                        <LayoutDashboard size={16} />
                    </NavLink>
                    <span>&gt;</span>
                    <NavLink to="/agentkyc">Agent KYC</NavLink>
                    <span>&gt;</span>
                    <span>View</span>
                </div>
            </div>

            {/* ===== BASIC INFO ===== */}
            <div className="mt-6 bg-white rounded-2xl shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Info label="Agent Name" value={agent.name} />
                    <Info label="Phone Number" value={agent.phone} />
                    <StatusBadge status={agent.kycStatus} />
                </div>

                {agent.kycStatus === "submitted" && (
                    <button
                        onClick={handleApprove}
                        className="mt-6 px-5 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                        Approve KYC
                    </button>
                )}
            </div>

            {/* ===== DOCUMENT DETAILS ===== */}
            <div className="mt-6 space-y-6">
                {/* Aadhaar */}
                <DocCard title="Aadhaar Details">
                    <DocRow
                        label="Aadhaar Number"
                        value={agent.aadhaarDetails?.aadhaarNumber}
                    />
                    <DocRow
                        label="Verification Status"
                        value={
                            agent.aadhaarDetails?.isVerified
                                ? "Verified"
                                : "Not Verified"
                        }
                        highlight
                    />
                </DocCard>

                {/* PAN */}
                <DocCard title="PAN Details">
                    <DocRow
                        label="PAN Number"
                        value={agent.panDetails?.panNumber}
                    />
                    <DocRow
                        label="Verification Status"
                        value={
                            agent.panDetails?.isVerified
                                ? "Verified"
                                : "Not Verified"
                        }
                        highlight
                    />
                </DocCard>

                {/* Bank */}
                <DocCard title="Bank Account Details">
                    <DocRow
                        label="Bank Name"
                        value={agent.bankDetails?.bankName}
                    />
                    <DocRow
                        label="Account Number"
                        value={agent.bankDetails?.accountNumber}
                    />
                    <DocRow
                        label="IFSC Code"
                        value={agent.bankDetails?.ifscCode}
                    />
                    <DocRow
                        label="Verification Status"
                        value={
                            agent.bankDetails?.isVerified
                                ? "Verified"
                                : "Not Verified"
                        }
                        highlight
                    />
                </DocCard>
            </div>
        </div>
    );
};

export default ViewKyc;

/* =======================
   SMALL COMPONENTS
======================= */

const Info = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="text-sm font-semibold text-gray-800">
            {value || "N/A"}
        </p>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles =
        status === "approved"
            ? "bg-green-100 text-green-700"
            : status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

    return (
        <div>
            <p className="text-xs text-gray-400 uppercase">
                KYC Status
            </p>
            <span
                className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-semibold ${styles}`}
            >
                {status?.toUpperCase()}
            </span>
        </div>
    );
};

const DocCard = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">
            {title}
        </h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const DocRow = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
        <span className="text-sm text-gray-500">{label}</span>
        <span
            className={`text-sm font-semibold ${highlight
                    ? value === "Verified"
                        ? "text-green-600"
                        : "text-red-600"
                    : "text-gray-800"
                }`}
        >
            {value || "N/A"}
        </span>
    </div>
);
