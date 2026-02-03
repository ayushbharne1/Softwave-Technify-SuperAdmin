import { Edit, LayoutDashboard, Eye, Trash2, PlusCircle, Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Vendor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const vendors = [
    {
      id: 1,
      vendorName: "Abhishekh Sharma",
      executive: 3,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
      commission: "15%"
    },
    {
      id: 2,
      vendorName: "Rahul Roy",
      executive: 3,
      pending: 10,
      totalLeads: 90,
      approvedLeads: 55,
      commission: "12%"
    },
    {
      id: 3,
      vendorName: "Priya Patel",
      executive: 2,
      pending: 5,
      totalLeads: 120,
      approvedLeads: 85,
      commission: "18%"
    },
    {
      id: 4,
      vendorName: "Amit Verma",
      executive: 4,
      pending: 15,
      totalLeads: 200,
      approvedLeads: 140,
      commission: "20%"
    },
    {
      id: 5,
      vendorName: "Neha Singh",
      executive: 2,
      pending: 3,
      totalLeads: 75,
      approvedLeads: 50,
      commission: "10%"
    },
  ];

  const filteredVendors = vendors.filter(vendor => 
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Vendor Management</h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <LayoutDashboard size={16} />
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Vendor Analytics</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">{vendors.length} Total Vendors</p>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vendors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
          />
        </div>

        {/* Add Vendor Button */}
        <button
          className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          onClick={() => navigate("/vendor/addvendor")}
        >
          <PlusCircle className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">Vendor Referral Analytics</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-linear-to-r from-gray-50 to-gray-100">
              <tr className="text-sm text-gray-700">
                <th className="px-6 py-4 text-left font-semibold">Vendor</th>
                <th className="px-6 py-4 text-left font-semibold">Executive</th>
                <th className="px-6 py-4 text-left font-semibold">Pending</th>
                <th className="px-6 py-4 text-left font-semibold">Total Leads</th>
                <th className="px-6 py-4 text-left font-semibold">Approved</th>
                <th className="px-6 py-4 text-left font-semibold">Rejected</th>
                <th className="px-6 py-4 text-left font-semibold">Commission</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No vendors found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => {
                  const rejectedLeads = vendor.totalLeads - vendor.approvedLeads;
                  const conversionRate = ((vendor.approvedLeads / vendor.totalLeads) * 100).toFixed(0);

                  return (
                    <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                      {/* Vendor Name */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{vendor.vendorName}</p>
                      </td>

                      {/* Executive */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {vendor.executive}
                        </span>
                      </td>

                      {/* Pending */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                          {vendor.pending}
                        </span>
                      </td>

                      {/* Total Leads */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{vendor.totalLeads}</span>
                      </td>

                      {/* Approved */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                          {vendor.approvedLeads}
                        </span>
                      </td>

                      {/* Rejected */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                          {rejectedLeads}
                        </span>
                      </td>

                      {/* Commission */}
                      <td className="px-6 py-4">
                        <div className="bg-linear-to-r from-emerald-50 to-emerald-100 p-2 rounded-lg">
                          <p className="text-center font-bold text-emerald-700">{vendor.commission}</p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/vendor/view/${vendor.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/vendor/edit/${vendor.id}`)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit Vendor"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => alert(`Delete Vendor ID: ${vendor.id}`)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Vendor"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-linear-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredVendors.length} of {vendors.length} vendors</span>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg">1</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;