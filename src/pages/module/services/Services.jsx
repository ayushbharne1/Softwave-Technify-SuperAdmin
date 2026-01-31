import { LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

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

 const services = [
  {
    id: "website-development",
    title: "Website Development",
    shortDesc: "Modern, responsive, and secure websites.",
    border: "border-gray-300",
    image:website
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "Custom Android & iOS applications.",
    border: "border-gray-300",
    image:app,
  },
  {
    id: "ecommerce-development",
    title: "E-commerce Development",
    shortDesc: "Secure and scalable online stores.",
    border: "border-gray-300",
    image:ecommerce,
  },
  {
    id: "erp-development",
    title: "ERP Development",
    shortDesc: "Business automation solutions.",
    border: "border-gray-300",
    image:erp,
  },
  {
    id: "cms-development",
    title: "CMS Development",
    shortDesc: "Easy content management systems.",
    border: "border-gray-300",
    image: cms,
  },
  {
    id: "crm-development",
    title: "CRM Development",
    shortDesc: "Customer and lead management tools.",
    border: "border-gray-300",
    image: crm,
  },
  
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    shortDesc: "Tailor-made software solutions for businesses.",
    border: "border-gray-300",
    image: customSoftware, // import required
  },
  {
    id: "product-development",
    title: "Product Development",
    shortDesc: "From idea to scalable digital products.",
    border: "border-gray-300",
    image: productDevelopment, // import required
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    shortDesc: "Modernize business processes with technology.",
    border: "border-gray-300",
    image: digitalTransformation, // import required
  },
];


  return (
    <div className="mb-5 mt-6">
      {/* Header */}

  <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC]
  rounded-2xl p-6 shadow-lg mb-8">

        <h1 className="text-2xl font-semibold text-white">Project</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/services">Project</NavLink>
        </div>
      </div>

  <div className="flex justify-between items-center mb-6">
        <button
          className=" text-white px-4 bg-gradient-to-r from-[#F7941D] to-[#0072BC] py-2 rounded hover:opacity-90 transition"
          onClick={() => navigate("/services/addservice")}
        >
          Add Project
        </button>
      </div>

      {/* Cards */}
      <section className="bg-slate-50 py-4 px-4 rounded-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/services/${item.id}`)}
                className={`cursor-pointer bg-white rounded-2xl border-2 ${item.border}
                p-8 text-center transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="w-60 h-42 mx-auto mb-6 rounded-xl bg-slate-100 flex items-center justify-center">
                  <img src={item.image} alt="" />
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm">
                  {item.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
