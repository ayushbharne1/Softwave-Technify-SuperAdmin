import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Dummy Vendor Data (replace with API later)
  const vendorList = [
    {
      id: 1,
      vendorName: "Abhishekh sharma",
      vendorType: "Referral",
      executive: 5,
      pending: 10,
      totalLeads: 180,
      approvedLeads: 120,
      amount: 46000,
      commission: 20,
    },
    {
      id: 2,
      vendorName: "Rahul roy",
      vendorType: "Agency",
      executive: 3,
      pending: 10,
      totalLeads: 90,
      approvedLeads: 55,
      amount: 86000,
      commission: 15,
    },
  ];

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorType: "",
    executive: "",
    pending: "",
    totalLeads: "",
    approvedLeads: "",
    amount: "",
    commission: "",
  });

  // 🔹 Load vendor data by ID
  useEffect(() => {
    const vendor = vendorList.find((v) => v.id === Number(id));
    if (vendor) {
      setFormData(vendor);
    }
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Vendor Data:", formData);

    alert("Vendor updated successfully!");
    navigate("/vendor");
  };

  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Edit Vendor</h1>

        <div className="text-sm text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/vendor">Vendor</NavLink>
          <span>&gt;</span>
          <span>Edit</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow max-w-full mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Vendor Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Vendor Type
            </label>
            <select
              name="vendorType"
              value={formData.vendorType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="Referral">Referral</option>
              <option value="Agency">Agency</option>
            </select>
          </div>

          {/* Executive */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Executive
            </label>
            <input
              type="number"
              name="executive"
              value={formData.executive}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Pending */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Pending Leads
            </label>
            <input
              type="number"
              name="pending"
              value={formData.pending}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Total Leads */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Leads
            </label>
            <input
              type="number"
              name="totalLeads"
              value={formData.totalLeads}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Approved Leads */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Approved Leads
            </label>
            <input
              type="number"
              name="approvedLeads"
              value={formData.approvedLeads}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Commission */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Commission (%)
            </label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              max="20"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/vendor")}
              className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendor;
