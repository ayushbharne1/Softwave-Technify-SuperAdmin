import { LayoutDashboard } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AddService = () => {
  const [formData, setFormData] = useState({
    projectName:'',
    projectType: '',
    description: '',
    price: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // यहाँ आप API call करके data भेज सकते हैं
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC]
        rounded-2xl p-6 shadow-lg mb-8 mt-6">
        <h1 className="text-2xl font-semibold text-white">Project</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/services" className="flex items-center gap-1">
            <span>Project</span>
          </NavLink>
          <span>&gt;</span>
          <span>Add Project</span>
        </div>
      </div>

     <div className="max-w-full mx-auto bg-gray-50 rounded-2xl shadow-xl p-8 mt-6">
  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Project Name */}
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Project Name</label>
      <input
        type="text"
        name="projectName"
        value={formData.projectName}
        onChange={handleChange}
        placeholder="Enter project name"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm placeholder-gray-400"
      />
    </div>

    {/* Project Type */}
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Project Type</label>
      <select
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm text-gray-600"
      >
        <option value="">Select Project Type</option>
        <option value="website-development">Website Development</option>
        <option value="mobile-app-development">Mobile App Development</option>
        <option value="ecommerce-development">Ecommerce Development</option>
        <option value="ERP-development">ERP Development</option>
        <option value="CMS-development">CMS Development</option>
        <option value="CRM-development">CRM Development</option>
        <option value="custom-software-development">Custom Software Development</option>
        <option value="product-development">Product Development</option>
        <option value="digital-transformation">Digital Transformation</option>
      </select>
    </div>

    {/* Description */}
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        placeholder="Enter project description"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm placeholder-gray-400 resize-none"
      />
    </div>

    {/* Price */}
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter project price"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm placeholder-gray-400"
      />
    </div>

    {/* Image */}
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Project Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full text-gray-600"
      />
    </div>

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition font-semibold shadow-md"
      >
        Submit
      </button>
    </div>
  </form>
</div>

    </>
  )
}

export default AddService
