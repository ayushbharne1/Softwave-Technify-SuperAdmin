
import { LayoutDashboard, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const VendorDetails = () => {
  const { id } = useParams();

  // 🔹 Vendor Data (static)
  const vendorList = [
    {
      id: "1",
      vendorName: "Abhishek Sharma",
      vendorType: "Affiliate",
      executive: 5,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
      amount: 46000,
    },
    {
      id: "2",
      vendorName: "Rahul Roy",
      vendorType: "Channel Partner",
      executive: 3,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 55,
      amount: 86000,
    },
  ];

  // 🔹 Find vendor by id
  const vendor =
    vendorList.find((v) => v.id === id) || vendorList[0];

  // 🔹 Status State
  const [status, setStatus] = useState("pending");

  // 🔹 20% Commission Calculation
  const commissionAmount = Math.round(vendor.amount * 0.2);

  const getStatusBadge = () => {
    if (status === "approved")
      return (
        <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
          <CheckCircle size={16} /> Approved
        </span>
      );

    if (status === "rejected")
      return (
        <span className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm">
          <XCircle size={16} /> Rejected
        </span>
      );

    return (
      <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm">
        Pending
      </span>
    );
  };

  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Vendor Details
        </h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/vendors" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span>Vendor Management</span>
          <span>&gt;</span>
          <span>Vendor Details</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white p-6 rounded-2xl shadow w-full mx-auto">
        {/* Title + Status */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Vendor Information
          </h2>
          {getStatusBadge()}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Vendor Name</p>
            <p className="font-semibold">{vendor.vendorName}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Vendor Type</p>
            <p className="font-semibold">{vendor.vendorType}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Executive</p>
            <p className="font-semibold">{vendor.executive}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Pending</p>
            <p className="font-semibold">{vendor.pending}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Total Leads</p>
            <p className="font-semibold">{vendor.totalLeads}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Approved Leads</p>
            <p className="font-semibold text-green-600">
              {vendor.approvedLeads}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg md:col-span-2">
            <p className="text-gray-500">Total amount</p>
            <p className="font-semibold text-lg text-blue-600">
              ₹{commissionAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={() => setStatus("approved")}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <CheckCircle size={16} /> Approve
            </button>

            <button
              onClick={() => setStatus("rejected")}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
