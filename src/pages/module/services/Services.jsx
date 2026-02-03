import { LayoutDashboard, PlusCircle, Eye, Filter, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import website from "../../../assets/services/website.webp"
import app from "../../../assets/services/app.png";
import ecommerce from "../../../assets/services/ecommerce.webp";
import erp from "../../../assets/services/erpw.webp"
import cms from "../../../assets/services/cms.png"
import crm from "../../../assets/services/crm.avif";
import customSoftware from "../../../assets/services/custom.webp";
import productDevelopment from "../../../assets/services/productdev2.png"
import digitalTransformation from "../../../assets/services/dig.png"

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const services = [
    {
      id: "website-development",
      title: "Website Development",
      shortDesc: "Modern, responsive, and secure websites.",
      status: "active",
      projects: 24,
      border: "border-gray-300",
      image: website,
      priceRange: "₹50K - ₹5L"
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      shortDesc: "Custom Android & iOS applications.",
      status: "active",
      projects: 18,
      border: "border-gray-300",
      image: app,
      priceRange: "₹1L - ₹15L"
    },
    {
      id: "ecommerce-development",
      title: "E-commerce Development",
      shortDesc: "Secure and scalable online stores.",
      status: "active",
      projects: 32,
      border: "border-gray-300",
      image: ecommerce,
      priceRange: "₹2L - ₹25L"
    },
    {
      id: "erp-development",
      title: "ERP Development",
      shortDesc: "Business automation solutions.",
      status: "active",
      projects: 12,
      border: "border-gray-300",
      image: erp,
      priceRange: "₹5L - ₹50L"
    },
    {
      id: "cms-development",
      title: "CMS Development",
      shortDesc: "Easy content management systems.",
      status: "active",
      projects: 28,
      border: "border-gray-300",
      image: cms,
      priceRange: "₹30K - ₹3L"
    },
    {
      id: "crm-development",
      title: "CRM Development",
      shortDesc: "Customer and lead management tools.",
      status: "inactive",
      projects: 15,
      border: "border-gray-300",
      image: crm,
      priceRange: "₹2L - ₹20L"
    },
    {
      id: "custom-software-development",
      title: "Custom Software Development",
      shortDesc: "Tailor-made software solutions for businesses.",
      status: "active",
      projects: 21,
      border: "border-gray-300",
      image: customSoftware,
      priceRange: "₹3L - ₹30L"
    },
    {
      id: "product-development",
      title: "Product Development",
      shortDesc: "From idea to scalable digital products.",
      status: "active",
      projects: 9,
      border: "border-gray-300",
      image: productDevelopment,
      priceRange: "₹10L - ₹1Cr"
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation",
      shortDesc: "Modernize business processes with technology.",
      status: "planning",
      projects: 5,
      border: "border-gray-300",
      image: digitalTransformation,
      priceRange: "₹15L - ₹1.5Cr"
    },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || service.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Project Management
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">All Projects</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">{services.length} Total Project Types</p>
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
            placeholder="Search projects by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm placeholder-gray-400"
          />
        </div>

        {/* Filter & Buttons */}
        <div className="flex gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="planning">Planning</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* add category Button */}
          <button
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            onClick={() => navigate("/services/addcategory")}
          >
            <PlusCircle className="w-5 h-5" />
            Add Category
          </button>

          {/* Add Project Button */}
          <button
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            onClick={() => navigate("/services/addservice")}
          >
            <PlusCircle className="w-5 h-5" />
            Add Project
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-orange-700">{services.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-blue-700">{services.reduce((acc, s) => acc + s.projects, 0)}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
              <div className="text-white text-lg font-bold">Σ</div>
            </div>
          </div>
        </div>
        
        <div className="bg-linear-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue Range</p>
              <p className="text-2xl font-bold text-emerald-700">₹2.5Cr+</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
              <div className="text-white font-bold">₹</div>
            </div>
          </div>
        </div>
        
        <div className="bg-linear-to-r from-violet-50 to-violet-100 rounded-xl p-4 border border-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-violet-700">₹15L</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-400 flex items-center justify-center">
              <div className="text-white text-xs font-bold">AVG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Project Categories</h2>
          <span className="text-sm text-gray-600">{filteredServices.length} of {services.length} categories</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/services/${item.id}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-orange-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-gray-50 to-white mb-6 h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' :
                    item.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {item.shortDesc}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-left">
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="font-semibold text-gray-800">{item.projects}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Price Range</p>
                  <p className="font-semibold text-gray-800">{item.priceRange}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">View</p>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions Footer */}
      {/* <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-white rounded-2xl border border-orange-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Need help managing projects?</h3>
            <p className="text-gray-600 text-sm">Explore our project management tools and resources</p>
          </div>
          <button
            onClick={() => navigate("/projects/tools")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            View Project Tools
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Services;