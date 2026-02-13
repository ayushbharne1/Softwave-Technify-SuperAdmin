// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Edit, LayoutDashboard, Trash, Search, PlusCircle } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { fetchAgents } from "../../../redux/slice/agent/agentGetSlice";
// import { FiEye } from "react-icons/fi";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
// import { deleteAgentById } from "../../../redux/slice/agent/agentDeleteSlice";
// import { toggleAgentStatus } from "../../../redux/slice/agent/agentStatus";

// export default function AgentManagements() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get agents state from Redux
//   const { agents, loading, error } = useSelector((state) => state.agentGet);

//   // Search state
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch agents on mount
//   useEffect(() => {
//     dispatch(fetchAgents());
//   }, [dispatch]);

//   // Toggle isActive locally
//   const toggleStatus = (id) => {
//     const updatedAgents = agents.map((agent) =>
//       agent.id === id ? { ...agent, isActive: !agent.isActive } : agent,
//     );
//     dispatch({
//       type: "agentGet/fetchAgents/fulfilled",
//       payload: updatedAgents,
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;

//     const res = await dispatch(deleteAgentById(id));

//     if (res.meta.requestStatus === "fulfilled") {
//       // delete ke baad agentGetSlice ko update karo
//       dispatch(fetchAgents());
//     }
//   };

//   const handleStatusToggle = async (id) => {
//     const res = await dispatch(toggleAgentStatus(id));

//     if (res.meta.requestStatus === "fulfilled") {
//       dispatch(fetchAgents()); // latest status ke liye
//     }
//   };

//   // Filter agents based on search term
//   const filteredAgents = agents.filter((agent) =>
//     agent.name?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   // Pagination calculations (based on filtered agents)
//   const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // Get current page agents - FIXED
//   const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);

//   // Reset to page 1 when search term changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   // Pagination handlers
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Debug log
//   useEffect(() => {
//     console.log("Total agents:", agents.length);
//     console.log("Filtered agents:", filteredAgents.length);
//     console.log("Current page:", currentPage);
//     console.log("Total pages:", totalPages);
//     console.log("Current agents:", currentAgents.length);
//     console.log(
//       "Showing:",
//       indexOfFirstItem + 1,
//       "to",
//       Math.min(indexOfLastItem, filteredAgents.length),
//     );
//   }, [
//     agents,
//     filteredAgents,
//     currentPage,
//     totalPages,
//     currentAgents,
//     indexOfFirstItem,
//     indexOfLastItem,
//   ]);

//   if (loading && agents.length === 0) {
//     return <LoaderSpinner />;
//   }

//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//               <LayoutDashboard className="w-7 h-7" />
//               Agent Management
//             </h1>
//             <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
//               <NavLink
//                 to="/dashboard"
//                 className="flex items-center gap-1 hover:text-white transition-colors"
//               >
//                 <span className="bg-white/20 px-3 py-1 rounded-lg">
//                   Dashboard
//                 </span>
//               </NavLink>
//               <span className="text-white/60">›</span>
//               <span className="text-white font-medium">Agent Management</span>
//             </div>
//           </div>
//           <div className="bg-white/20 px-4 py-2 rounded-lg">
//             <p className="text-white text-sm">{agents.length} Total Agents</p>
//           </div>
//         </div>
//       </div>

//       {/* Controls Bar */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         {/* Search Bar */}
//         <div className="flex-1 relative">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search agents by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
//           />
//         </div>

//         {/* Add Agent Button */}
//         <button
//           className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//           onClick={() => navigate("/agent/form")}
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add Agent
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//         {/* Table Header */}
//         <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
//           <h2 className="text-xl font-bold text-gray-800">Agent Analytics</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             {/* Table Head */}
//             <thead className="bg-linear-to-r from-gray-50 to-gray-100">
//               <tr className="text-sm text-gray-700">
//                 <th className="px-6 py-4 text-center font-semibold">Sr. No</th>
//                 <th className="px-6 py-4 text-center font-semibold">Name</th>
//                 <th className="px-6 py-4 text-center font-semibold">Phone</th>
//                 <th className="px-6 py-4 text-center font-semibold">
//                   Referral ID
//                 </th>
//                 <th className="px-6 py-4 text-center font-semibold">Status</th>
//                 <th className="px-6 py-4 text-center font-semibold">
//                   KYC Status
//                 </th>
//                 <th className="px-6 py-4 text-center font-semibold">Actions</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-200 text-center">
//               {currentAgents.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center">
//                       <Search className="w-12 h-12 text-gray-300 mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         No agents found
//                       </h3>
//                       <p className="text-gray-500">
//                         {searchTerm
//                           ? "Try adjusting your search criteria"
//                           : "No agents available at the moment"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 currentAgents.map((agent, index) => {
//                   const srNo = indexOfFirstItem + index + 1;

//                   return (
//                     <tr
//                       key={agent._id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       {/* Sr. No */}
//                       <td className="px-6 py-4">
//                         <span className="font-semibold text-gray-800">
//                           {srNo}
//                         </span>
//                       </td>

//                       {/* Name */}
//                       <td className="px-6 py-4">
//                         <p className="font-semibold text-gray-800">
//                           {agent.name || "—"}
//                         </p>
//                       </td>

//                       {/* Phone */}
//                       <td className="px-6 py-4">
//                         <span className="text-gray-700">
//                           {agent.phone || "—"}
//                         </span>
//                       </td>

//                       {/* Referral ID */}
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
//                           {agent.referralId || "—"}
//                         </span>
//                       </td>

//                       {/* Status */}
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleStatusToggle(agent._id)}
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             agent.isActive
//                               ? "bg-green-50 text-green-700"
//                               : "bg-red-50 text-red-700"
//                           }`}
//                         >
//                           {agent.isActive ? "Active" : "Inactive"}
//                         </button>
//                       </td>

//                       {/* KYC Status */}
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium capitalize">
//                           {agent.kycStatus || "pending"}
//                         </span>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-9 py-4">
//                         <div className="flex items-center gap-3">
//                           <button
//                             onClick={() => navigate(`/agent/view/${agent._id}`)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="View Details"
//                           >
//                             <FiEye size={18} />
//                           </button>
//                           <button
//                             onClick={() => navigate(`/agent/edit/${agent._id}`)}
//                             className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
//                             title="Edit Agent"
//                           >
//                             <Edit size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(agent._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title="Delete Agent"
//                           >
//                             <Trash size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer - Pagination */}
//         <div className="px-6 py-4 border-t border-gray-200 bg-linear-to-r from-gray-50 to-white">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <span>
//               Showing {currentAgents.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
//               {Math.min(indexOfLastItem, filteredAgents.length)} of{" "}
//               {filteredAgents.length} agents
//             </span>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
//                   currentPage === 1
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 Previous
//               </button>

//               {/* Page Numbers */}
//               <div className="flex items-center gap-2">
//                 {totalPages > 0 && (
//                   <>
//                     <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">
//                       {currentPage}
//                     </span>
//                     <span className="text-gray-500">of</span>
//                     <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">
//                       {totalPages}
//                     </span>
//                   </>
//                 )}
//               </div>

//               <button
//                 onClick={handleNextPage}
//                 disabled={
//                   currentPage === totalPages || filteredAgents.length === 0
//                 }
//                 className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
//                   currentPage === totalPages || filteredAgents.length === 0
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// following code is without api integration
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Edit, LayoutDashboard, Trash, Search, PlusCircle } from "lucide-react";
import { FiEye } from "react-icons/fi";

// Mock Data - Yeh aapka API data replace karega
const MOCK_AGENTS = [
  { _id: "1", name: "Dhruv", phone: "8888888888", referralId: "632925", isActive: true, kycStatus: "pending" },
  { _id: "2", name: "Aditi", phone: "9685699962", referralId: "608532", isActive: true, kycStatus: "pending" },
  { _id: "3", name: "ANIKET Devendra", phone: "8329241658", referralId: "925036", isActive: true, kycStatus: "pending" },
];

export default function AgentManagements() {
  const navigate = useNavigate();

  // Local State for Agents
  const [agents, setAgents] = useState(MOCK_AGENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toggle Status Function (Local only)
  const handleStatusToggle = (id) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent._id === id ? { ...agent, isActive: !agent.isActive } : agent
      )
    );
  };

  // Delete Function (Local only)
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    setAgents((prev) => prev.filter((agent) => agent._id !== id));
  };

  // Filter Logic
  const filteredAgents = agents.filter((agent) =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Calculations
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Agent Management
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Agent Management</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">{agents.length} Total Agents</p>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search agents by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm"
          />
        </div>

        <button
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          onClick={() => navigate("/agent/form")}
        >
          <PlusCircle className="w-5 h-5" />
          Add Agent
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">Agent Analytics</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="text-sm text-gray-700">
                <th className="px-6 py-4 text-center font-semibold">Sr. No</th>
                <th className="px-6 py-4 text-center font-semibold">Name</th>
                <th className="px-6 py-4 text-center font-semibold">Phone</th>
                <th className="px-6 py-4 text-center font-semibold">Referral ID</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">KYC Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              {currentAgents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12">
                    <div className="flex flex-col items-center">
                      <Search className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700">No agents found</h3>
                    </div>
                  </td>
                </tr>
              ) : (
                currentAgents.map((agent, index) => (
                  <tr key={agent._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{agent.name || "—"}</td>
                    <td className="px-6 py-4 text-gray-700">{agent.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {agent.referralId || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(agent._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          agent.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {agent.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium capitalize">
                        {agent.kycStatus || "pending"}
                      </span>
                    </td>
                    <td className="px-9 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => navigate(`/agent/view/${agent._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                          <FiEye size={18} />
                        </button>
                        <button onClick={() => navigate(`/agent/edit/${agent._id}`)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg" title="Edit Agent">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(agent._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete Agent">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {currentAgents.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
              {Math.min(indexOfLastItem, filteredAgents.length)} of {filteredAgents.length} agents
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">{currentPage}</span>
                <span className="text-gray-500">of</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">{totalPages || 1}</span>
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || filteredAgents.length === 0}
                className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages || filteredAgents.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}