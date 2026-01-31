import { LayoutDashboard } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";
import website from "../../../assets/services/website.webp"
import app from "../../../assets/services/app.png";
import ecommerce from "../../../assets/services/ecommerce.webp";
import erp from "../../../assets/services/erpw.webp"
import cms from "../../../assets/services/cms.png"
import crm from "../../../assets/services/crm.avif";
import customSoftware from "../../../assets/services/custom.webp";
import productDevelopment from "../../../assets/services/productdev2.png"
import digitalTransformation from "../../../assets/services/dig.png"
const ServiceDetails = () => {
  const { id } = useParams();


  const services = [
  {
    id: "website-development",
    title: "Website Development",
    image: website,
    description:
      "We design and develop modern, responsive, and secure websites using the latest technologies. Our websites are optimized for performance, SEO, and scalability, ensuring fast loading speeds, excellent user experience, cross-device compatibility, and long-term business growth",
    price: "₹25,000 onwards",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "High Performance",
      "Secure Architecture",
    ],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    image: app,
    description:
      "We build high-quality mobile applications for Android and iOS with smooth UI/UX, backend integration, and scalable architecture. Our apps are designed for high performance, strong security, seamless API connectivity,  and long-term success for growing businesses.",
    price: "₹50,000 onwards",
    features: [
      "Android & iOS Apps",
      "API Integration",
      "High Performance",
      "Play Store Ready",
    ],
  },
  {
    id: "ecommerce-development",
    title: "E-commerce Development",
    image: ecommerce,
    description:
      "We create secure and scalable e-commerce platforms with integrated payment gateways, powerful admin dashboards, and smart inventory management systems. Our solutions support product management, order tracking, customer accounts, analytics, and marketing tools.",
    price: "₹40,000 onwards",
    features: [
      "Payment Gateway",
      "Admin Panel",
      "Order Management",
      "Scalable System",
    ],
  },
  {
    id: "erp-development",
    title: "ERP Development",
    image: erp,
    description:
      "Our ERP solutions integrate all business processes into one centralized system to improve efficiency and productivity. They streamline operations such as finance, HR, inventory, sales, and reporting, enabling real-time data access.",
    price: "₹80,000 onwards",
    features: [
      "Process Automation",
      "Role Management",
      "Reports & Analytics",
      "Secure System",
    ],
  },
  {
    id: "cms-development",
    title: "CMS Development",
    image: cms,
    description:
      "We develop flexible CMS solutions that allow easy content management, customization, and scalability. Our systems enable non-technical users to update content effortlessly, manage media, control user roles, and expand features as business requirements grow.",
    price: "₹30,000 onwards",
    features: [
      "Easy Content Management",
      "Custom Admin Panel",
      "User Friendly",
      "Scalable Design",
    ],
  },
  {
    id: "crm-development",
    title: "CRM Development",
    image: crm,
    description:
      "Our CRM systems help businesses manage customers, track leads, and improve sales efficiency by centralizing customer data, automating follow-ups, generating insightful reports, and enabling sales teams to build stronger relationships and close deals faster.",
    price: "₹60,000 onwards",
    features: [
      "Lead Management",
      "Customer Tracking",
      "Sales Reports",
      "Automation",
    ],
  },

  // 🔹 NEW SERVICES
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    image: digitalTransformation,
    description:
      "We help businesses grow online through SEO, social media marketing, paid ads, and data-driven digital strategies.",
    price: "₹20,000 onwards",
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Google & Meta Ads",
      "Analytics & Reporting",
    ],
  },
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    image: customSoftware,
    description:
      "We build custom software solutions tailored to your business needs using secure, scalable, and efficient architecture, ensuring seamless integration, high performance, future-ready technology, and flexible systems that grow along with your organization’s goals.",
    price: "₹70,000 onwards",
    features: [
      "Tailor-Made Solutions",
      "Scalable Architecture",
      "Secure Development",
      "Ongoing Support",
    ],
  },
  {
    id: "product-development",
    title: "Product Development",
    image: productDevelopment,
    description:
      "We turn your ideas into successful digital products by managing the complete journey from strategic planning and UI/UX design to robust development, testing, deployment, and smooth launch, ensuring quality, performance, and long-term business value.",
    price: "₹1,00,000 onwards",
    features: [
      "Idea Validation",
      "UI/UX Design",
      "MVP Development",
      "Product Scaling",
    ],
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    image: digitalTransformation,
    description:
      "We modernize legacy systems and transform traditional business processes using cloud platforms, automation, and advanced digital technologies to improve efficiency, scalability, security, and agility while enabling faster innovation and better customer experiences.",
    price: "₹90,000 onwards",
    features: [
      "Legacy System Modernization",
      "Cloud Integration",
      "Process Automation",
      "Business Optimization",
    ],
  },
];

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <h2 className="text-center text-xl mt-20">
        Service Not Found
      </h2>
    );
  }

  return (
    <>

     <div className="bg-gradient-to-r mt-6 from-[#F7941D] to-[#0072BC]
  rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-white">Project</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          {/* <NavLink to="/services">Services</NavLink> */}
           <NavLink to="/services" className="flex items-center gap-1">
            <span>Project</span>
          </NavLink>
          <span>&gt;</span>
          <span>Project Details</span>
        </div>
      </div>
    <div className="max-w-full mx-auto ">
     

      {/* <div className="bg-white rounded-2xl shadow-xl p-10 mt-6">
        <div className="flex justify-center items-center">
        <img src={service.image} className="h-100 w-150" alt="" srcset="" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          {service.title}
        </h1>

        <p className="text-slate-600 mb-6">
          {service.description}
        </p>

        <h3 className="text-xl font-semibold mb-3">
          Features
        </h3>

        <ul className="list-disc list-inside text-slate-600 mb-6">
          {service.features.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="bg-slate-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold">
            Pricing
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {service.price}
          </p>
        </div>
      </div> */}

<div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* LEFT : Image */}
    <div className="flex justify-center">
      <img
        src={service.image}
        alt={service.title}
        className="w-full max-w-md rounded-xl object-contain"
      />
    </div>

    {/* RIGHT : Content */}
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-3">
        {service.title}
      </h1>

      <p className="text-2xl font-semibold text-blue-600 mb-4">
        {service.price}
      </p>

      <p className="text-slate-600 mb-6 leading-relaxed">
        {service.description}
      </p>

      <h3 className="text-xl font-semibold mb-3">
        Key Features
      </h3>

      <ul className="space-y-2 text-slate-600 mb-6">
        {service.features.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-500">✔</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA Button (optional but pro) */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>

  </div>
</div>


    </div>
    </>
  );
};

export default ServiceDetails;
