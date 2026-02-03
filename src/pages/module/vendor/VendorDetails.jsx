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
      vendorType: "Agency",
      executive: 3,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
      amount: 46000,
    },
    {
      id: "2",
      vendorName: "Rahul Roy",
      vendorType: "Executive",
      executive: 3,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 55,
      amount: 86000,
    },
  ];

  const vendor =
    vendorList.find((v) => v.id === id) || vendorList[0];

  const [status, setStatus] = useState("pending");

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


  const executiveNames = [
  "Amit Verma",
  "Neha Singh",
  "Rohit Kumar",
  "Pooja Sharma",
  "Karan Patel",
  "Anjali Mehta",
];

const projectdata = [
  "website developement",
  "CRM developement",
  "App developement"
]

  // 🔹 Dummy Executive Projects (STATIC)
  const executiveProjects = Array.from(
  { length: vendor.executive },
  (_, index) => ({
    executiveName:
      executiveNames[index % executiveNames.length],
    project: projectdata[index % projectdata.length],
    leads: 20 + index * 5,
    approved: 10 + index * 3,
    status: index % 2 === 0 ? "Active" : "Completed",
  })
);


  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Vendor Details
        </h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/vendor">Vendor Management</NavLink>
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

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-500">Amount</p>
            <p className="font-semibold text-green-600">
              ₹{vendor.amount}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg md:col-span-2">
            <p className="text-gray-500">Total Commission</p>
            <p className="font-semibold text-lg text-blue-600">
              ₹{commissionAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* NEW SECTION — Executive Project Table */}
       <div className="mt-10 p-2 rounded-xl ">
  <h3 className="text-xl font-semibold mb-5">
    Executive Project Details
  </h3>

  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      {/* TABLE HEAD */}
      <thead className="bg-[#1d476e33] sticky top-0 z-10">
        <tr className="text-black uppercase text-xs tracking-wider">
          {[
            "Executive",
            "Project",
            "Leads",
            "Approved",
            "Status",
          ].map((col) => (
            <th
              key={col}
              className="p-4 text-center text-sm font-medium"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody className="bg-white border-b border-gray-200 divide-y divide-gray-200">
        {executiveProjects.length === 0 && (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-gray-400"
            >
              No executive project data found
            </td>
          </tr>
        )}

        {executiveProjects.map((item, index) => (
          <tr
            key={index}
            className="hover:bg-gray-50 transition"
          >
            {/* Executive */}
            <td className="px-6 py-4 font-medium text-center">
              {item.executiveName}
            </td>

            {/* Project */}
            <td className="px-6 py-4 font-medium text-center">
              {item.project}
            </td>

            {/* Leads */}
            <td className="px-6 py-4 font-medium text-center">
              {item.leads}
            </td>

            {/* Approved */}
            <td className="px-6 py-4 text-center">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                {item.approved}
              </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4 text-center">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setStatus("approved")}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <CheckCircle size={16} /> Approve
          </button>

          <button
            onClick={() => setStatus("rejected")}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <XCircle size={16} /> Reject
          </button>
        </div>

      </div>
    </div>
  );
};

export default VendorDetails;
