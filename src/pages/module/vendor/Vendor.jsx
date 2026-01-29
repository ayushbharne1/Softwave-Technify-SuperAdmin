import { LayoutDashboard } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Vendor = () => {
  const vendors = [
    {
      id: 1,
      vendorName: "HDFC Bank",
      vendorType: "Bank",
      totalLinksShared: 520,
      totalClicks: 410,
      totalLeads: 180,
      approvedLeads: 120,
      totalCommission: 86000,
    },
    {
      id: 2,
      vendorName: "Bajaj Finserv",
      vendorType: "NBFC",
      totalLinksShared: 300,
      totalClicks: 210,
      totalLeads: 90,
      approvedLeads: 55,
      totalCommission: 42000,
    },
  ];

  const getStatusBadge = (approved, total) => {
    const rate = (approved / total) * 100;

    if (rate >= 70)
      return "bg-green-100 text-green-700";
    if (rate >= 40)
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Vendor Management
        </h1>

        <div className="text-sm text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span>Vendor Analytics</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-5">
          Vendor Referral Analytics
        </h2>

        <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200">
  {/* TABLE HEAD */}
  <thead className="bg-[#1d476e33] sticky top-0 z-10">
    <tr className="text-black uppercase text-xs tracking-wider">
      {[
        "Vendor",
        "Links Shared",
        "Clicks",
        "Approved",
        "Rejected",
        "Status",
        "Commission",
      ].map((col) => (
        <th
          key={col}
          className="p-4 text-left text-sm font-medium"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>

  {/* TABLE BODY */}
  <tbody className="bg-white divide-y divide-gray-200">
    {vendors.length === 0 && (
      <tr>
        <td
          colSpan="7"
          className="text-center py-6 text-gray-400"
        >
          No vendor data found
        </td>
      </tr>
    )}

    {vendors.map((v) => {
      const rejectedLeads =
        v.totalLeads - v.approvedLeads;

      const conversionRate = (
        (v.approvedLeads / v.totalLeads) *
        100
      ).toFixed(0);

      return (
        <tr
          key={v.id}
          className="hover:bg-gray-50 transition"
        >
          {/* Vendor */}
          <td className="px-6 py-4 font-medium">
            <div>{v.vendorName}</div>
            <div className="text-xs text-gray-500">
              {v.vendorType}
            </div>
          </td>

          {/* Links Shared */}
          <td className="px-6 py-4 font-medium">
            {v.totalLinksShared}
          </td>

          {/* Clicks */}
          <td className="px-6 py-4 font-medium">
            {v.totalClicks}
          </td>

          {/* Approved */}
          <td className="px-6 py-4">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              {v.approvedLeads}
            </span>
          </td>

          {/* Rejected */}
          <td className="px-6 py-4">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
              {rejectedLeads}
            </span>
          </td>

          {/* Status */}
          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                conversionRate >= 70
                  ? "bg-green-100 text-green-700"
                  : conversionRate >= 40
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {conversionRate}% Conversion
            </span>
          </td>

          {/* Commission */}
          <td className="px-6 py-4 font-semibold">
            ₹{v.totalCommission.toLocaleString()}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

        </div>
      </div>
    </div>
  );
};

export default Vendor;
