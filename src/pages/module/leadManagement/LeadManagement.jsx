import { useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Search, Filter, Eye, PlusCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

/* 🔹 STATIC LEADS DATA */
const LEADS_DATA = [
  {
    _id: "mongo1",
    leadId: "LEAD001",
    name: "Rahul Sharma",
    phone: "9876543210",
    status: "new",
    productId: { projectType: "Home Loan" },
    payout: { amount: 5000 },
  },
  {
    _id: "mongo2",
    leadId: "LEAD002",
    name: "Amit Verma",
    phone: "9123456789",
    status: "approved",
    productId: { projectType: "Personal Loan" },
    payout: { amount: 8000 },
  },
  {
    _id: "mongo3",
    leadId: "LEAD003",
    name: "Neha Singh",
    phone: "9001122334",
    status: "paid",
    productId: { projectType: "Credit Card" },
    payout: { amount: 3000 },
  },
];

export default function LeadManagement() {
  const navigate = useNavigate();

  const [leads] = useState(LEADS_DATA);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const normalizeStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        filter === "All" || normalizeStatus(lead.status) === filter;

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        lead?.name?.toLowerCase().includes(search) ||
        lead?.phone?.includes(search) ||
        lead?.productId?.projectType?.toLowerCase().includes(search);

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
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span className="bg-white/20 px-3 py-1 rounded-lg">
                  Dashboard
                </span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Lead Analytics</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">{leads.length} Total Leads</p>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search leads by name, phone, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full lg:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm"
          >
            {["All", "New", "Submitted", "Approved", "Rejected", "Paid"].map(
              (status) => (
                <option key={status}>{status}</option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg text-center overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">
            Lead Referral Analytics
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="text-sm text-gray-700 ">
                <th className="px-6 py-4 text-center font-semibold">Sr. No</th>
                <th className="px-6 py-4 text-center font-semibold">Lead ID</th>
                <th className="px-6 py-4 text-center font-semibold">Name</th>
                <th className="px-6 py-4 text-center font-semibold">Mobile</th>
                <th className="px-6 py-4 text-center font-semibold">Product</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Payout</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No leads found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Sr. No */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">
                        {index + 1}
                      </span>
                    </td>

                    {/* Lead ID */}
                    <td className="px-6 py-4">
                      <span className="font-mono bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        {lead.leadId}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{lead.name}</p>
                    </td>

                    {/* Mobile */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium">
                        {lead.phone}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                        {lead.productId.projectType}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={normalizeStatus(lead.status)} />
                    </td>

                    {/* Payout */}
                    <td className="px-6 py-4">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 rounded-lg">
                        <p className="text-center font-bold text-green-700">
                          ₹{lead.payout.amount.toLocaleString()}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-9 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/leadmanagement/lead-details/${lead.leadId}`,
                              { state: { lead } },
                            )
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
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
        <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredLeads.length} of {leads.length} leads
            </span>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg">
                1
              </span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
