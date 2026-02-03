import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard, User, Mail, Phone, MapPin, Calendar, Briefcase, Percent, Users, FileText, IndianRupee, Save, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Vendor Data - matching AddVendor form fields
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
      commissionRate: "15",
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
      commissionRate: "12",
      joinDate: "2024-02-10",
      status: "active",
    },
  ];

  const [formData, setFormData] = useState({
    vendorName: "",
    companyName: "",
    vendorType: "",
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
    joinDate: "",
  });

  // Load vendor data by ID
  useEffect(() => {
    const vendor = vendorList.find((v) => v.id === id);
    if (vendor) {
      setFormData(vendor);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Vendor Data:", formData);
    
    // Calculate derived values
    const commissionAmount = Math.round(formData.amount * (parseFloat(formData.commissionRate) / 100));
    const conversionRate = ((formData.approvedLeads / formData.totalLeads) * 100).toFixed(1);
    
    const updatedVendor = {
      ...formData,
      commissionAmount,
      conversionRate,
      rejectedLeads: parseInt(formData.totalLeads) - parseInt(formData.approvedLeads),
    };
    
    console.log("Vendor Data with calculations:", updatedVendor);
    
    alert("Vendor updated successfully!");
    navigate("/vendor");
  };

  const vendorTypes = [
    { value: "affiliate", label: "Affiliate Partner" },
    { value: "partner", label: "Business Partner" },
    { value: "agency", label: "Marketing Agency" },
    { value: "individual", label: "Individual Referral" },
    { value: "corporate", label: "Corporate Partner" },
  ];

  const calculateCommission = () => {
    if (formData.approvedLeads && formData.amount && formData.commissionRate) {
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

  return (
    <div className="p-6 bg-linear-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <User className="w-7 h-7" />
              Edit Vendor
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
              <span className="text-white font-medium">Edit Vendor</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">Editing: {formData.vendorName}</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Vendor Information</h2>
            <p className="text-gray-600">Update vendor details below</p>
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
                    placeholder="Enter company name"
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
                    <option value="">Select Vendor Type</option>
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
                  <div className="relative">
                    <input
                      type="number"
                      name="executive"
                      value={formData.executive}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                    />
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
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

                // Total Leads 
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
                  <div className="relative">
                    <input
                      type="date"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
                    />
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
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
                onClick={() => navigate("/vendor")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                Update Vendor
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        {/* <div className="mt-6 bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            📋 Editing Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Approved leads cannot exceed total leads count</li>
            <li>• Commission rate is calculated as percentage of total amount</li>
            <li>• Changes to status will affect vendor visibility</li>
            <li>• All changes are logged in the system</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default EditVendor;