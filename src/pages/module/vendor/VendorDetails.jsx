import { LayoutDashboard, CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Briefcase, Percent } from "lucide-react";
import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const VendorDetails = () => {
  const { id } = useParams();

  // 🔹 Vendor Data (static) - Now includes all fields from AddVendor form
  const vendorList = [
    {
      id: "1",
      vendorName: "Abhishek Sharma",
      companyName: "TechSolutions India",
      vendorType: "Agency Partner",
      email: "abhishek@techsolutions.com",
      phone: "+91 9876543210",
      address: "123 Business Street, Mumbai, Maharashtra - 400001",
      executive: 3,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
      amount: 46000,
      commissionRate: "15%",
      joinDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      vendorName: "Rahul Roy",
      companyName: "Digital Growth Partners",
      vendorType: "Executive",
      email: "rahul@digitalgrowth.com",
      phone: "+91 9876543211",
      address: "456 Corporate Avenue, Delhi - 110001",
      executive: 3,
      pending: 10,
      totalLeads: 90,
      approvedLeads: 55,
      amount: 86000,
      commissionRate: "12%",
      joinDate: "2024-02-10",
      status: "active",
    },
    {
      id: "3",
      vendorName: "Priya Patel",
      companyName: "Cloud Innovators Ltd",
      vendorType: "Marketing Agency",
      email: "priya@cloudinnovators.com",
      phone: "+91 9876543212",
      address: "789 Tech Park, Bangalore, Karnataka - 560001",
      executive: 2,
      pending: 5,
      totalLeads: 120,
      approvedLeads: 85,
      amount: 72000,
      commissionRate: "18%",
      joinDate: "2023-11-20",
      status: "active",
    },
  ];

  const vendor = vendorList.find((v) => v.id === id) || vendorList[0];

  const [status, setStatus] = useState(vendor.status || "pending");

  // Calculate values
  const commissionRateNum = parseFloat(vendor.commissionRate) || 0;
  const commissionAmount = Math.round(vendor.amount * (commissionRateNum / 100));
  const rejectedLeads = vendor.totalLeads - vendor.approvedLeads;
  const conversionRate = ((vendor.approvedLeads / vendor.totalLeads) * 100).toFixed(1);

  const getStatusBadge = () => {
    if (status === "active")
      return (
        <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
          <CheckCircle size={16} /> Active
        </span>
      );

    if (status === "inactive")
      return (
        <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-xl text-sm font-medium">
          <XCircle size={16} /> Inactive
        </span>
      );

    return (
      <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-medium">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
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
    "Website Development",
    "CRM Development",
    "App Development"
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
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Vendor Details
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <LayoutDashboard size={16} />
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/vendor" className="flex items-center gap-1 hover:text-white transition-colors">
                Vendor Management
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">{vendor.vendorName}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge()}
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-white text-sm">ID: VENDOR-{vendor.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Vendor Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{vendor.vendorName}</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {vendor.companyName} • {vendor.vendorType}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-sm text-gray-600">Joined: </span>
              <span className="text-sm font-medium text-gray-800">{vendor.joinDate}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800">{vendor.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">{vendor.phone}</p>
              </div>
            </div>

            <div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-800">{vendor.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="font-medium text-gray-800">{vendor.joinDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Percent className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Commission Rate</p>
                <p className="font-medium text-gray-800">{vendor.commissionRate}</p>
              </div>
            </div>
          </div>

          {/* Performance Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Total Leads</p>
              <p className="text-2xl font-bold text-orange-700">{vendor.totalLeads}</p>
            </div>

            <div className="bg-linear-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Approved Leads</p>
              <p className="text-2xl font-bold text-green-700">{vendor.approvedLeads}</p>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Pending Leads</p>
              <p className="text-2xl font-bold text-blue-700">{vendor.pending}</p>
            </div>

            <div className="bg-linear-to-r from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Executives</p>
              <p className="text-2xl font-bold text-purple-700">{vendor.executive}</p>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Amount (₹)</p>
              <p className="text-2xl font-bold text-gray-800">₹{vendor.amount.toLocaleString()}</p>
            </div>
            
            <div className="bg-linear-to-r from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
              <p className="text-sm text-gray-600 mb-2">Commission ({vendor.commissionRate})</p>
              <p className="text-2xl font-bold text-emerald-700">₹{commissionAmount.toLocaleString()}</p>
            </div>
            
            <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-700">{conversionRate}%</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-linear-to-r from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
              <p className="text-sm text-gray-600 mb-2">Rejected Leads</p>
              <p className="text-2xl font-bold text-red-700">{rejectedLeads}</p>
            </div>
            
            <div className="bg-linear-to-r from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
              <p className="text-sm text-gray-600 mb-2">Approval Rate</p>
              <p className="text-2xl font-bold text-amber-700">{conversionRate}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={() => setStatus("active")}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <CheckCircle size={18} /> Mark as Active
            </button>

            <button
              onClick={() => setStatus("inactive")}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <XCircle size={18} /> Mark as Inactive
            </button>
          </div>
        </div>

        {/* Executive Project Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Executive Project Details</h3>
              <p className="text-gray-600 mt-1">{executiveProjects.length} projects managed by {vendor.executive} executives</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="text-sm text-gray-600">
                Total Leads: <strong>{executiveProjects.reduce((acc, proj) => acc + proj.leads, 0)}</strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr className="text-sm text-gray-700">
                  <th className="px-6 py-4 text-left font-semibold">Executive</th>
                  <th className="px-6 py-4 text-left font-semibold">Project</th>
                  <th className="px-6 py-4 text-left font-semibold">Leads</th>
                  <th className="px-6 py-4 text-left font-semibold">Approved</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {executiveProjects.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <div className="w-6 h-6 text-gray-400">!</div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No projects found</h3>
                        <p className="text-gray-500">No executive projects available</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  executiveProjects.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                            {item.executiveName.charAt(0)}
                          </div>
                          {item.executiveName}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.project}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {item.leads}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {item.approved}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Edit Vendor Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;