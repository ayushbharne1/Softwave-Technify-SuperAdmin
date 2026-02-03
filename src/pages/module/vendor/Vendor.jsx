import { LayoutDashboard } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vendor = () => {
  const vendors = [
    {
      id: 1,
      vendorName: "Abhishekh sharma",
      executive: 5,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
    },
    {
      id: 2,
      vendorName: "Rahul roy",
      executive: 3,
      pending: 10,
      totalLeads: 90,
      approvedLeads: 55,
    },
  ];

  // const getStatusBadge = (approved, total) => {
  //   const rate = (approved / total) * 100;

  //   if (rate >= 70) return "bg-green-100 text-green-700";
  //   if (rate >= 40) return "bg-yellow-100 text-yellow-700";
  //   return "bg-red-100 text-red-700";
  // };
  const navigate = useNavigate();

  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Vendor Management</h1>

        <div className="text-sm text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span>Vendor Analytics</span>
        </div>
      </div>

 {/* Add vendor */}
          <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
          onClick={() => navigate("/vendors/addvendor")}
        >
          Add Vendor
        </button>
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
                  "Executive",
                  "Pending",
                  "Approved",
                  "Rejected",
                  "Commission",
                  "Actions",
                ].map((col) => (
                  <th key={col} className="p-4 text-center text-sm font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="bg-white border-b border-gray-200 divide-y divide-gray-200">
              {vendors.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No vendor data found
                  </td>
                </tr>
              )}

              {vendors.map((v) => {
                const rejectedLeads = v.totalLeads - v.approvedLeads;

                const conversionRate = Math.min(
                  (v.approvedLeads / v.totalLeads) * 100,
                  20,
                ).toFixed(0);

                return (
                  <tr key={v.id} className="hover:bg-gray-50 transition">
                    {/* Vendor */}
                    <td className="px-6 py-4 font-medium text-center">
                      {v.vendorName}
                    </td>

                    {/* Executive */}
                    <td className="px-6 py-4 font-medium text-center">
                      {v.executive}
                    </td>

                    {/* Pending */}
                    <td className="px-6 py-4 font-medium text-center">
                      {v.pending}
                    </td>

                    {/* Approved */}
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        {v.approvedLeads}
                      </span>
                    </td>

                    {/* Rejected */}
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                        {rejectedLeads}
                      </span>
                    </td>

                    {/* Commission % */}
                    <td className="px-5 py-4 text-center">{conversionRate}%</td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex gap-3 justify-center">
                        <Eye
                          size={18}
                          className="text-blue-600 cursor-pointer"
                          onClick={() => navigate(`/vendors/view/${v.id}`)}
                        />
                        <Trash2
                          size={18}
                          className="text-red-600 cursor-pointer"
                          onClick={() => alert(`Delete Vendor ID: ${v.id}`)}
                        />
                      </div>
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
