// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
// import {
//   fetchAgentById,
//   clearAgent,
// } from "../../../redux/slice/agent/agentViewSlice";
// import { LayoutDashboard, CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Briefcase, Percent, User, Shield, CreditCard, FileText } from "lucide-react";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// const AgentView = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { agent, loading, error } = useSelector(
//     (state) => state.agentView
//   );

//   useEffect(() => {
//     dispatch(fetchAgentById(id));
//     return () => {
//       dispatch(clearAgent());
//     };
//   }, [dispatch, id]);

//   if (loading)
//     return <div className="text-center mt-10">
//       <LoaderSpinner/>
//     </div>;

//   if (error)
//     return <p className="text-center mt-10 text-red-500">{error}</p>;

//   if (!agent) return null;

//   // Calculate values
//   const profileCompletion = agent.profileCompletionPercentage || 0;
//   const kycCompleted = agent.isKycCompleted ? "Yes" : "No";
//   const isActive = agent.isActive ? "Yes" : "No";
//   const isBlocked = agent.isBlocked ? "Yes" : "No";

//   const getStatusBadge = () => {
//     if (agent.isActive && !agent.isBlocked) {
//       return (
//         <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
//           <CheckCircle size={16} /> Active
//         </span>
//       );
//     }
//     if (agent.isBlocked) {
//       return (
//         <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-xl text-sm font-medium">
//           <XCircle size={16} /> Blocked
//         </span>
//       );
//     }
//     return (
//       <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-medium">
//         <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
//         Pending
//       </span>
//     );
//   };

//   // KYC Status Data
//   const kycData = [
//     { label: "Aadhaar", verified: agent.aadhaarDetails?.isVerified || false },
//     { label: "PAN", verified: agent.panDetails?.isVerified || false },
//     { label: "Bank", verified: agent.bankDetails?.isVerified || false },
//   ];

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-white">
//               Agent Details
//             </h1>
//             <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
//               <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
//                 <LayoutDashboard size={16} />
//               </NavLink>
//               <span className="text-white/60">›</span>
//               <NavLink to="/agent" className="flex items-center gap-1 hover:text-white transition-colors">
//                 Agent Management
//               </NavLink>
//               <span className="text-white/60">›</span>
//               <span className="text-white font-medium">{agent.name}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             {getStatusBadge()}
//             <div className="bg-white/20 px-4 py-2 rounded-lg">
//               <p className="text-white text-sm">ID: AGENT-{agent._id?.slice(-6)}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto">
//         {/* Agent Information Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{agent.name}</h2>
//               <p className="text-gray-600 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 {agent.occupation || "Freelancer"} • {agent.gender || "Not Specified"}
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <span className="text-sm text-gray-600">Referral ID: </span>
//               <span className="text-sm font-medium text-gray-800">{agent.referralId || "N/A"}</span>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Mail className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email Address</p>
//                 <p className="font-medium text-gray-800">{agent.email || "—"}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Phone className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Phone Number</p>
//                 <p className="font-medium text-gray-800">{agent.phone || "—"}</p>
//               </div>
//             </div>

//             <div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <MapPin className="w-5 h-5 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm text-gray-500">Full Address</p>
//                 <p className="font-medium text-gray-800">
//                   {agent.address || "—"}, {agent.city || "—"}, {agent.state || "—"} {agent.pincode || "—"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <Calendar className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Date of Birth</p>
//                 <p className="font-medium text-gray-800">{agent.dateOfBirth?.split("T")[0] || "—"}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <Percent className="w-5 h-5 text-emerald-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Profile Completion</p>
//                 <p className="font-medium text-gray-800">{profileCompletion}%</p>
//               </div>
//             </div>
//           </div>

//           {/* Status Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
//               <p className="text-sm text-gray-600 mb-2">KYC Status</p>
//               <p className="text-2xl font-bold text-orange-700">{agent.kycStatus || "Pending"}</p>
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
//               <p className="text-sm text-gray-600 mb-2">KYC Completed</p>
//               <p className="text-2xl font-bold text-green-700">{kycCompleted}</p>
//             </div>

//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
//               <p className="text-sm text-gray-600 mb-2">Active</p>
//               <p className="text-2xl font-bold text-blue-700">{isActive}</p>
//             </div>

//             <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
//               <p className="text-sm text-gray-600 mb-2">Blocked</p>
//               <p className="text-2xl font-bold text-red-700">{isBlocked}</p>
//             </div>
//           </div>

//           {/* KYC Verification Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {kycData.map((item, index) => (
//               <div key={index} className={`rounded-xl p-5 border ${item.verified ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'}`}>
//                 <p className="text-sm text-gray-600 mb-2">{item.label}</p>
//                 <p className={`text-2xl font-bold ${item.verified ? 'text-emerald-700' : 'text-gray-500'}`}>
//                   {item.verified ? 'Verified' : 'Pending'}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* OTP & System Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
//               <p className="text-sm text-gray-600 mb-2">OTP Verified</p>
//               <p className="text-xl font-bold text-blue-700">{agent.otp?.verified ? "Yes" : "No"}</p>
//               <p className="text-xs text-gray-500 mt-1">Attempts: {agent.otp?.attempts || 0}</p>
//             </div>
            
//             <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
//               <p className="text-sm text-gray-600 mb-2">Registration Step</p>
//               <p className="text-xl font-bold text-purple-700">{agent.registrationStep || "—"}</p>
//             </div>
//           </div>

          
//         </div>

//         {/* System Information Table */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-800">System & Registration Details</h3>
//               <p className="text-gray-600 mt-1">Technical information and timestamps</p>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr className="text-sm text-gray-700">
//                   <th className="px-6 py-4 text-left font-semibold">Field</th>
//                   <th className="px-6 py-4 text-left font-semibold">Value</th>
//                   <th className="px-6 py-4 text-left font-semibold">Status/Details</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <tr className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-800">Created At</td>
//                   <td className="px-6 py-4">{agent.createdAt?.split("T")[0] || "—"}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Registration start</td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-800">Registration Completed</td>
//                   <td className="px-6 py-4">{agent.registrationCompletedAt?.split("T")[0] || "—"}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${agent.registrationCompletedAt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                       {agent.registrationCompletedAt ? 'Completed' : 'Pending'}
//                     </span>
//                   </td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-800">Last Updated</td>
//                   <td className="px-6 py-4">{agent.updatedAt?.split("T")[0] || "—"}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Profile changes</td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-800">Login Attempts</td>
//                   <td className="px-6 py-4">{agent.loginAttempts || 0}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Security tracking</td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-800">OTP Resend Count</td>
//                   <td className="px-6 py-4">{agent.otpResendCount || 0}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Verification attempts</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AgentView;





// following code is without api integration code

import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, CheckCircle, XCircle, Mail, Phone, MapPin, 
  Calendar, Percent, User 
} from "lucide-react";

// Mock Data - Wahi data jo AgentManagement mein use kiya tha
const MOCK_AGENTS = [
  { 
    _id: "1", 
    name: "Dhruv", 
    phone: "8888888888", 
    email: "dhruv@example.com",
    referralId: "632925", 
    isActive: true, 
    isBlocked: false,
    kycStatus: "pending",
    isKycCompleted: false,
    occupation: "Insurance Agent",
    gender: "Male",
    address: "123, Street Name",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    dateOfBirth: "1995-05-15T00:00:00Z",
    profileCompletionPercentage: 75,
    aadhaarDetails: { isVerified: true },
    panDetails: { isVerified: false },
    bankDetails: { isVerified: false },
    otp: { verified: true, attempts: 1 },
    registrationStep: "KYC_PENDING",
    createdAt: "2024-01-10T10:00:00Z",
    registrationCompletedAt: null,
    updatedAt: "2024-02-01T12:00:00Z",
    loginAttempts: 2,
    otpResendCount: 1
  },
  { 
    _id: "2", 
    name: "Aditi", 
    phone: "9685699962", 
    email: "aditi@example.com",
    referralId: "608532", 
    isActive: true, 
    isBlocked: false,
    kycStatus: "pending",
    isKycCompleted: false
  },
  { 
    _id: "3", 
    name: "ANIKET Devendra", 
    phone: "8329241658", 
    email: "aniket@example.com",
    referralId: "925036", 
    isActive: true, 
    isBlocked: false,
    kycStatus: "pending",
    isKycCompleted: false
  }
];

const AgentView = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API Fetch
    const foundAgent = MOCK_AGENTS.find((a) => a._id === id);
    setAgent(foundAgent);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-center mt-10 p-10 font-bold">Loading...</div>;

  if (!agent) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl font-bold">Agent not found!</p>
        <NavLink to="/agent" className="text-blue-500 underline">Back to List</NavLink>
      </div>
    );
  }

  // UI calculations
  const profileCompletion = agent.profileCompletionPercentage || 0;
  const kycCompleted = agent.isKycCompleted ? "Yes" : "No";
  const isActive = agent.isActive ? "Yes" : "No";
  const isBlocked = agent.isBlocked ? "Yes" : "No";

  const getStatusBadge = () => {
    if (agent.isActive && !agent.isBlocked) {
      return (
        <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
          <CheckCircle size={16} /> Active
        </span>
      );
    }
    if (agent.isBlocked) {
      return (
        <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-xl text-sm font-medium">
          <XCircle size={16} /> Blocked
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-medium">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        Pending
      </span>
    );
  };

  const kycData = [
    { label: "Aadhaar", verified: agent.aadhaarDetails?.isVerified || false },
    { label: "PAN", verified: agent.panDetails?.isVerified || false },
    { label: "Bank", verified: agent.bankDetails?.isVerified || false },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Agent Details</h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <LayoutDashboard size={16} />
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/agent" className="flex items-center gap-1 hover:text-white transition-colors">
                Agent Management
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">{agent.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge()}
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-white text-sm">ID: AGENT-{agent._id?.slice(-6)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{agent.name}</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                {agent.occupation || "Freelancer"} • {agent.gender || "Not Specified"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-sm text-gray-600">Referral ID: </span>
              <span className="text-sm font-medium text-gray-800">{agent.referralId || "N/A"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800">{agent.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">{agent.phone || "—"}</p>
              </div>
            </div>

            <div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Address</p>
                <p className="font-medium text-gray-800">
                  {agent.address || "—"}, {agent.city || "—"}, {agent.state || "—"} {agent.pincode || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-800">{agent.dateOfBirth?.split("T")[0] || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Percent className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profile Completion</p>
                <p className="font-medium text-gray-800">{profileCompletion}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 text-center">
              <p className="text-sm text-gray-600 mb-2">KYC Status</p>
              <p className="text-2xl font-bold text-orange-700">{agent.kycStatus || "Pending"}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200 text-center">
              <p className="text-sm text-gray-600 mb-2">KYC Completed</p>
              <p className="text-2xl font-bold text-green-700">{kycCompleted}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 text-center">
              <p className="text-sm text-gray-600 mb-2">Active</p>
              <p className="text-2xl font-bold text-blue-700">{isActive}</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-5 border border-red-200 text-center">
              <p className="text-sm text-gray-600 mb-2">Blocked</p>
              <p className="text-2xl font-bold text-red-700">{isBlocked}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kycData.map((item, index) => (
              <div key={index} className={`rounded-xl p-5 border ${item.verified ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'}`}>
                <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                <p className={`text-2xl font-bold ${item.verified ? 'text-emerald-700' : 'text-gray-500'}`}>
                  {item.verified ? 'Verified' : 'Pending'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Details Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">System & Registration Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-left">
                <tr className="text-sm text-gray-700">
                  <th className="px-6 py-4 font-semibold">Field</th>
                  <th className="px-6 py-4 font-semibold">Value</th>
                  <th className="px-6 py-4 font-semibold">Status/Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Created At</td>
                  <td className="px-6 py-4">{agent.createdAt?.split("T")[0] || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Initial sign-up</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Registration Completed</td>
                  <td className="px-6 py-4">{agent.registrationCompletedAt?.split("T")[0] || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${agent.registrationCompletedAt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {agent.registrationCompletedAt ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Last Login Attempts</td>
                  <td className="px-6 py-4">{agent.loginAttempts || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">System Security</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentView;