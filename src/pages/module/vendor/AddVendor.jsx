import { LayoutDashboard, PlusCircle, User, Phone, Mail, MapPin, Percent, IndianRupee } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AddVendor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: "",
    companyName: "",
    vendorType: "affiliate",
    email: "",
    phone: "",
    address: "",
    executive: "",
    pending: "",
    totalLeads: "",
    approvedLeads: "",
    commissionRate: "",
    amount: "",
    status: "active",
    joinDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCommission = () => {
    if (formData.approvedLeads && formData.amount) {
      const commission = (parseFloat(formData.commissionRate) / 100) * parseFloat(formData.amount);
      return `₹${commission.toFixed(2)}`;
    }
    return "₹0.00";
  };

  const calculateConversion = () => {
    if (formData.totalLeads && formData.approvedLeads) {
      const conversion = (parseInt(formData.approvedLeads) / parseInt(formData.totalLeads)) * 100;
      return `${conversion.toFixed(1)}%`;
    }
    return "0%";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Data:", formData);
    
    // Calculate derived values
    const vendorData = {
      ...formData,
      commissionAmount: calculateCommission(),
      conversionRate: calculateConversion(),
      rejectedLeads: parseInt(formData.totalLeads) - parseInt(formData.approvedLeads),
    };
    
    console.log("Vendor Data with calculations:", vendorData);
    // later: API call here
    
    // Navigate back to vendor list after success
    // navigate("/vendor");
  };

  const vendorTypes = [
    { value: "affiliate", label: "Affiliate Partner" },
    { value: "partner", label: "Business Partner" },
    { value: "agency", label: "Marketing Agency" },
    { value: "individual", label: "Individual Referral" },
    { value: "corporate", label: "Corporate Partner" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <PlusCircle className="w-7 h-7" />
              Add New Vendor
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/vendor" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Vendors</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Add Vendor</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">Fill all required details below</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Vendor Information</h2>
            <p className="text-gray-600">Enter all required vendor details to create a new vendor account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vendor Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Vendor Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleChange}
                      placeholder="Enter vendor full name"
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name (if any)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                {/* Vendor Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Vendor Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="vendorType"
                    value={formData.vendorType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
                  >
                    {vendorTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Status <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending Approval</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vendor@example.com"
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter complete address"
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 resize-none transition-all duration-300"
                    />
                    <MapPin className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance & Commission */}
            {/* <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Performance & Commission</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                // Executive 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Executive Count
                  </label>
                  <input
                    type="number"
                    name="executive"
                    value={formData.executive}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                // Pending Leads 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Pending Leads
                  </label>
                  <input
                    type="number"
                    name="pending"
                    value={formData.pending}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                 //Total Leads 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Total Leads
                  </label>
                  <input
                    type="number"
                    name="totalLeads"
                    value={formData.totalLeads}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                // Approved Leads 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Approved Leads
                  </label>
                  <input
                    type="number"
                    name="approvedLeads"
                    value={formData.approvedLeads}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    max={formData.totalLeads}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                // Commission Rate 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Commission Rate (%) <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="commissionRate"
                      value={formData.commissionRate}
                      onChange={handleChange}
                      placeholder="15"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                // Total Amount 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Total Amount (₹) <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                // Join Date 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Join Date <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
                  />
                </div>
              </div>

              // Calculated Fields 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Commission Amount</p>
                  <p className="text-2xl font-bold text-orange-700">{calculateCommission()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-blue-700">{calculateConversion()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Rejected Leads</p>
                  <p className="text-2xl font-bold text-red-700">
                    {formData.totalLeads && formData.approvedLeads 
                      ? (parseInt(formData.totalLeads) - parseInt(formData.approvedLeads))
                      : 0}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                onClick={() => navigate("/vendor")}
              >
                Cancel
              </button>
              <button
                type="reset"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                onClick={() => setFormData({
                  vendorName: "",
                  companyName: "",
                  vendorType: "affiliate",
                  email: "",
                  phone: "",
                  address: "",
                  executive: "",
                  pending: "",
                  totalLeads: "",
                  approvedLeads: "",
                  commissionRate: "",
                  amount: "",
                  status: "active",
                  joinDate: new Date().toISOString().split('T')[0],
                })}
              >
                Reset All
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Add Vendor
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-6 bg-linear-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            📋 Vendor Creation Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• All fields marked with <span className="text-orange-500 font-medium">*</span> are required</li>
            <li>• Ensure email and phone number are valid and active</li>
            <li>• Commission rate is calculated as percentage of total amount</li>
            <li>• Approved leads cannot exceed total leads count</li>
            <li>• Active vendors will be immediately visible in the system</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;