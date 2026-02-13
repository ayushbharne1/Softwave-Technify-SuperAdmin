// import { useMemo, useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import { LayoutDashboard, Search, Filter, Eye, Edit, LayoutGrid, Plus } from "lucide-react";
// import StatusBadge from "./StatusBadge";

// /* 🔹 STATIC LEADS DATA */
// const LEADS_DATA = [
//   {
//     _id: "mongo1",
//     leadId: "LEAD001",
//     name: "Rahul Sharma",
//     phone: "9876543210",
//     status: "new",
//     productId: { projectType: "Home Loan" },
//     price: { amount: 5000 },
//   },
//   {
//     _id: "mongo2",
//     leadId: "LEAD002",
//     name: "Amit Verma",
//     phone: "9123456789",
//     status: "approved",
//     productId: { projectType: "Personal Loan" },
//     price: { amount: 8000 },
//   },
//   {
//     _id: "mongo3",
//     leadId: "LEAD003",
//     name: "Neha Singh",
//     phone: "9001122334",
//     status: "paid",
//     productId: { projectType: "Credit Card" },
//     price: { amount: 3000 },
//   },
// ];

// export default function LeadManagement() {
//   const navigate = useNavigate();

//   const [leads] = useState(LEADS_DATA);
//   const [filter, setFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const normalizeStatus = (status) =>
//     status.charAt(0).toUpperCase() + status.slice(1);

//   const filteredLeads = useMemo(() => {
//     return leads.filter((lead) => {
//       const matchesStatus =
//         filter === "All" || normalizeStatus(lead.status) === filter;

//       const search = searchTerm.toLowerCase();

//       const matchesSearch =
//         lead?.name?.toLowerCase().includes(search) ||
//         lead?.phone?.includes(search) ||
//         lead?.productId?.projectType?.toLowerCase().includes(search);

//       return matchesStatus && matchesSearch;
//     });
//   }, [leads, filter, searchTerm]);

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//               <LayoutDashboard className="w-7 h-7" />
//               Lead Management
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
//               <span className="text-white font-medium">Lead Analytics</span>
//             </div>
//           </div>
//           <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
//             <p className="text-white text-xs uppercase tracking-wider opacity-80">Total Leads</p>
//             <p className="text-white text-xl font-bold">{leads.length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Controls Bar */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-8">
//         {/* Search Bar */}
//         <div className="flex-1 relative">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search leads by name, phone, or product..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
//           />
//         </div>

//         {/* Filter Dropdown */}
//         <div className="relative">
//           <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="w-full lg:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm appearance-none cursor-pointer"
//           >
//             {["All", "New", "Submitted", "Approved", "Rejected", "Paid"].map(
//               (status) => (
//                 <option key={status}>{status}</option>
//               ),
//             )}
//           </select>
//         </div>
//         <button
//           onClick={() => navigate("/leadmanagement/add-lead")}
//           className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 active:scale-95 transition-all duration-200"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Add Lead</span>
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//         {/* Table Header */}
//         <div className="px-6 py-4 justify-center border-b text-center border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             Lead Referral Analytics
//           </h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-center">
//             {/* Table Head */}
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr className="text-sm text-gray-700 uppercase tracking-wider">
//                 <th className="px-6 py-4 font-semibold">Sr. No</th>
//                 <th className="px-6 py-4 font-semibold">Lead ID</th>
//                 <th className="px-6 py-4 font-semibold">Name</th>
//                 <th className="px-6 py-4 font-semibold">Mobile</th>
//                 <th className="px-6 py-4 font-semibold">Product</th>
//                 <th className="px-6 py-4 font-semibold">Status</th>
//                 <th className="px-6 py-4 font-semibold">Price</th>
//                 <th className="px-6 py-4 font-semibold">Actions</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-200">
//               {filteredLeads.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center">
//                       <Search className="w-12 h-12 text-gray-300 mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         No leads found
//                       </h3>
//                       <p className="text-gray-500">
//                         Try adjusting your search or filter criteria
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredLeads.map((lead, index) => (
//                   <tr
//                     key={lead._id}
//                     className="hover:bg-orange-50/30 transition-colors group"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {index + 1}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">
//                         {lead.leadId}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-gray-800">{lead.name}</p>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-600">
//                         {lead.phone}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
//                         {lead.productId.projectType}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <StatusBadge status={normalizeStatus(lead.status)} />
//                     </td>

//                     <td className="px-6 py-4">
//                       <p className="font-bold text-gray-800">
//                         ₹{lead.price.amount.toLocaleString()}
//                       </p>
//                     </td>

//                     {/* 🔹 Actions Column with View & Edit */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-3">
//                         {/* View Button */}
//                         <button
//                           onClick={() =>
//                             navigate(
//                               `/leadmanagement/lead-details/${lead.leadId}`,
//                               { state: { lead } }
//                             )
//                           }
//                           className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all"
//                           title="View Details"
//                         >
//                           <Eye className="w-5 h-5" /> 
//                         </button>

//                         {/* Edit Button */}
//                         <button
//                           onClick={() =>
//                             navigate(
//                               `/leadmanagement/edit-lead/${lead.leadId}`,
//                               { state: { lead } }
//                             )
//                           }
//                           className="p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-all"
//                           title="Update Lead"
//                         >
//                           <Edit className="w-5 h-5" /> 
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <span>
//               Showing <span className="font-bold text-gray-800">{filteredLeads.length}</span> of <span className="font-bold text-gray-800">{leads.length}</span> leads
//             </span>
//             <div className="flex items-center gap-2">
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white hover:text-orange-500 transition-colors disabled:opacity-50" disabled>
//                 Previous
//               </button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white hover:text-orange-500 transition-colors">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useMemo, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard, Search, Filter, Eye, Edit, Plus, Loader2 } from "lucide-react";
// import { fetchAllLeads } from "./getAllLeadSlice"; // Adjust path
import { fetchAllLeads } from "../../../redux/slice/leadManagement/getAllLeadSlice";
import StatusBadge from "./StatusBadge";

export default function LeadManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get data from Redux
  const { leads, loading, error } = useSelector((state) => state.allLeads);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllLeads());
  }, [dispatch]);

  const normalizeStatus = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A";

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter((lead) => {
      const matchesStatus =
        filter === "All" || normalizeStatus(lead.status) === filter;

      const search = searchTerm.toLowerCase();

      // Mapping according to your API response structure
      const matchesSearch =
        lead?.client?.name?.toLowerCase().includes(search) ||
        lead?.client?.phone?.includes(search) ||
        lead?.projectId?.projectName?.toLowerCase().includes(search) ||
        lead?.leadId?.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [leads, filter, searchTerm]);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Lead Management
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Lead Analytics</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
            <p className="text-white text-xs uppercase tracking-wider opacity-80">Total Leads</p>
            <p className="text-white text-xl font-bold">{leads?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search leads by name, phone, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full lg:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm appearance-none cursor-pointer"
          >
            {["All", "New", "Submitted", "Approved", "Rejected", "Paid"].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => navigate("/leadmanagement/add-lead")}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 active:scale-95 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b justify-center border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Lead Referral Analytics
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-sm text-gray-700 uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Sr. No</th>
                <th className="px-6 py-4 font-semibold">Lead ID</th>
                <th className="px-6 py-4 font-semibold">Client Name</th>
                <th className="px-6 py-4 font-semibold">Mobile</th>
                <th className="px-6 py-4 font-semibold">Product/Project</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-2" />
                      <p className="text-gray-500">Fetching leads...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-red-500 font-medium">
                    {error}
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No leads found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <tr key={lead._id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                        {lead.leadId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{lead?.client?.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead?.client?.phone}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
                        {lead?.projectId?.projectName || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={normalizeStatus(lead.status)} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">
                        ₹{(lead?.projectId?.price || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate(`/leadmanagement/lead-details/${lead.leadId}`, { state: { lead } })}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate(`/leadmanagement/edit-lead/${lead.leadId}`, { state: { lead } })}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-all"
                          title="Update Lead"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing <span className="font-bold text-gray-800">{filteredLeads.length}</span> of <span className="font-bold text-gray-800">{leads.length}</span> leads
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}