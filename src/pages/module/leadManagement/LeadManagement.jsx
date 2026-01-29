import { useEffect, useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slice/leads/leadManagement";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
//  DUMMY LEADS DATA

//  LEAD MANAGEMENT
export default function LeadManagement() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const { leads, loading, error } = useSelector((state) => state.leads);

  const normalizeStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  }, [leads, filter, searchTerm])

  if (loading) return <div className="text-center mt-10">
    <LoaderSpinner />
  </div>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;


  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Lead Management</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>

          <span>&gt;</span>
          <span className="opacity-80">
            Lead Management
          </span>
        </div>
      </div>

      {/* FILTER TABS */}

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5FD8]"
        />

        <div className="w-full sm:w-48">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm font-medium bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0E5FD8]"
          >
            {["All", "New", "Submitted", "Approved", "Rejected", "Paid"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto p-6 bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#1d476e33] sticky top-0 z-10 ">
            <tr className="text-black uppercase text-xs tracking-wider">
              {["Name", "Mobile", "Product", "Status", "Payout", "Action"].map(
                (col) => (
                  <th
                    key={col}
                    className="p-4 text-center text-sm font-medium "
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {!loading && filteredLeads.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400"
                >
                  No leads found
                </td>
              </tr>
            )}

            {filteredLeads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 text-center py-4 font-medium">
                  {lead?.name || "-"}
                </td>
                <td className="px-6 text-center py-4 font-medium">
                  {lead?.phone || "-"}
                </td>
                <td className="px-6 text-center py-4 font-medium">
                  {lead?.productId?.projectType || "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={normalizeStatus(lead.status)} />
                </td>
                <td className="px-6 py-4 text-center font-medium">
                  ₹{lead?.payout?.amount ?? 0}
                </td>
                <td className="px-6 text-center py-4">
                  <button
                    title="View"
                    onClick={() =>
                    {
                      navigate(`/leadmanagement/lead-details/${lead.leadId}`, {state: {_id: lead._id}})
                    }
                    }
                    className="text-[#0E5FD8] hover:underline font-medium cursor-pointer"
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
