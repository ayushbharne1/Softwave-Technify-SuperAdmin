
import { useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { FiEye } from "react-icons/fi";
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
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Lead Management</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span className="opacity-80">Lead Management</span>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border rounded-md text-sm"
        >
          {["All", "New", "Submitted", "Approved", "Rejected", "Paid"].map(
            (status) => (
              <option key={status}>{status}</option>
            )
          )}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto p-6 bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#1d476e33] sticky top-0">
            <tr className="uppercase text-xs">
              {["Name", "Mobile", "Product", "Status", "Payout", "Action"].map(
                (col) => (
                  <th key={col} className="p-4 text-center">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No leads found
                </td>
              </tr>
            )}

            {filteredLeads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="text-center py-4">{lead.name}</td>
                <td className="text-center py-4">{lead.phone}</td>
                <td className="text-center py-4">
                  {lead.productId.projectType}
                </td>
                <td className="text-center py-4">
                  <StatusBadge status={normalizeStatus(lead.status)} />
                </td>
                <td className="text-center py-4">
                  ₹{lead.payout.amount}
                </td>
                <td className="text-center py-4">
                  <button
                    onClick={() =>
                      navigate(
                        `/leadmanagement/lead-details/${lead.leadId}`,
                        { state: { lead } }
                      )
                    }
                    className="text-[#0E5FD8]"
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
