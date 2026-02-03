import { LayoutDashboard } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    vendorType: "",
    executive: "",
    pending: "",
    totalLeads: "",
    approvedLeads: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Data:", formData);

    // later: API call here
  };

  return (
    <>
       <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 mt-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Add Vendor</h1>

        <div className="text-sm text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
           <NavLink to="/vendor" className="flex items-center gap-1">
            <span>Vendor Management</span>
          </NavLink>
          <span>&gt;</span>
          <span>Add Vendors</span>
        </div>
      </div>
   
      <div className="bg-white w-full max-w-full rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Vendor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Vendor Name */}
          <div>
            <label className="text-sm text-gray-600">
              Vendor Name
            </label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter vendor name"
              required
            />
          </div>

          {/* Vendor Type */}
          <div>
            <label className="text-sm text-gray-600">
              Vendor Type
            </label>
            <input
              type="text"
              name="vendorType"
              value={formData.vendorType}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Affiliate / Partner"
              required
            />
          </div>

          {/* Executive */}
          <div>
            <label className="text-sm text-gray-600">
              Executive
            </label>
            <input
              type="number"
              name="executive"
              value={formData.executive}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Total executives"
              required
            />
          </div>

          {/* Pending */}
          <div>
            <label className="text-sm text-gray-600">
              Pending
            </label>
            <input
              type="number"
              name="pending"
              value={formData.pending}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Pending leads"
              required
            />
          </div>

          {/* Total Leads */}
          <div>
            <label className="text-sm text-gray-600">
              Total Leads
            </label>
            <input
              type="number"
              name="totalLeads"
              value={formData.totalLeads}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Approved Leads */}
          <div>
            <label className="text-sm text-gray-600">
              Approved Leads
            </label>
            <input
              type="number"
              name="approvedLeads"
              value={formData.approvedLeads}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Amount */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Enter total amount"
              required
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="reset"
              className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() =>
                setFormData({
                  vendorName: "",
                  vendorType: "",
                  executive: "",
                  pending: "",
                  totalLeads: "",
                  approvedLeads: "",
                  amount: "",
                })
              }
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVendor;
