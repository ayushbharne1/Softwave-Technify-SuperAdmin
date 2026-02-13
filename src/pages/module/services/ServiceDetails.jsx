// import { useEffect } from "react";
// import { useParams, useNavigate, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchServiceDetails,
//   clearServiceDetails,
// } from "../../../redux/slice/services/getDetails";
// import { LayoutDashboard, Pencil } from "lucide-react";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { data, loading, error } = useSelector(
//     (state) => state.serviceDetails
//   );

//   useEffect(() => {
//     dispatch(fetchServiceDetails(id));

//     return () => {
//       dispatch(clearServiceDetails());
//     };
//   }, [dispatch, id]);

//   if (loading) return <LoaderSpinner />;

//   if (error) {
//     return (
//       <div className="p-10 text-center text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

//   if (!data) return null;

//   return (
//     <div className="mt-6 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//               <LayoutDashboard className="w-7 h-7" />
//               Project Management
//             </h1>

//             <div className="text-sm text-orange-100 flex items-center gap-2 mt-3 flex-wrap">
//               <NavLink to="/dashboard">
//                 <span className="bg-white/20 px-3 py-1 rounded-lg">
//                   Dashboard
//                 </span>
//               </NavLink>
//               <span className="text-white/60">›</span>
//               <NavLink to="/services">
//                 <span className="bg-white/20 px-3 py-1 rounded-lg">
//                   Project
//                 </span>
//               </NavLink>
//               <span className="text-white/60">›</span>
//               <span className="text-white font-medium">
//                 Project Details
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-5">
//         <div className="grid grid-cols-1 md:grid-cols-2">
          
//           {/* LEFT IMAGE */}
//           <div className="h-full max-h-[420px] overflow-hidden">
//             <img
//               src={data.thumbnail}
//               alt={data.projectName}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="p-6 relative">
//             {/* Edit Button */}
//             <button
//               onClick={() => navigate(`/services/edit/${id}`)}
//               className="absolute top-6 right-6 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
//             >
//               <Pencil size={16} />
//               Edit
//             </button>

//             {/* Title & Status */}
//             <div className="flex items-center justify-between mb-4 mt-10">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {data.projectName}
//               </h1>

//               <span
//                 className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                   data.status === "active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {data.status}
//               </span>
//             </div>

//             {/* Description */}
//             <p className="text-gray-600 leading-relaxed mb-6">
//               {data.description}
//             </p>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="bg-orange-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500">Price</p>
//                 <p className="text-xl font-bold text-orange-600">
//                   ₹{data.price}
//                 </p>
//               </div>

//               <div className="bg-blue-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500">Earnings</p>
//                 <p className="text-xl font-bold text-blue-600">
//                   {data.totalEarnings.amount}
//                   {data.totalEarnings.type === "percentage" ? "%" : ""}
//                 </p>
//               </div>

//               <div className="bg-emerald-50 p-4 rounded-xl">
//                 <p className="text-sm text-gray-500">Created On</p>
//                 <p className="text-md font-semibold text-emerald-700">
//                   {new Date(data.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;






import { LayoutDashboard } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";
import website from "../../../assets/services/website.webp";
import app from "../../../assets/services/app.png";
import ecommerce from "../../../assets/services/ecommerce.webp";
import erp from "../../../assets/services/erpw.webp";
import cms from "../../../assets/services/cms.png";
import crm from "../../../assets/services/crm.avif";
import customSoftware from "../../../assets/services/custom.webp";
import productDevelopment from "../../../assets/services/productdev2.png";
import digitalTransformation from "../../../assets/services/dig.png";
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

  const category = [
    {
      number: "1",
      title: "Static Website Development",
      subtitle: "Fast, secure, and reliable informational websites",
      features: [
        "HTML5 & CSS3 Development",
        "Basic Informational Pages",
        "Portfolio Websites",
        "Landing Pages",
      ],
    },
    {
      number: "2",
      title: "Dynamic Website Development",
      subtitle: "Interactive and database-driven solutions",
      features: [
        "Database Integration",
        "Admin Control Panels",
        "CMS-Based Platforms",
        "Content Management Systems",
      ],
    },
    {
      number: "3",
      title: "Custom Website Development",
      subtitle: "Tailor-made solutions for unique business needs",
      features: [
        "Business-Specific Features",
        "Custom Functionality",
        "Scalable Architecture",
        "Advanced Integrations",
      ],
    },
    {
      number: "4",
      title: "Responsive Website Design",
      subtitle: "Seamless experience across all devices",
      features: [
        "Mobile-First Approach",
        "Tablet Compatibility",
        "Desktop Optimization",
        "Cross-Browser Support",
      ],
    },
    {
      number: "5",
      title: "Website Design (UI/UX)",
      subtitle: "Creating beautiful and intuitive user experiences",
      features: [
        "Custom Layout Design",
        "Wireframes & Prototypes",
        "User Experience Optimization",
        "Brand Identity Integration",
      ],
    },
  ];

  const service = services.find((s) => s.id === id);

  if (!service) {
    return <h2 className="text-center text-xl mt-20">Service Not Found</h2>;
  }

  return (
    <div className="p-6">
      
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Project Management
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span className="bg-white/20 px-3 py-1 rounded-lg">
                  Dashboard
                </span>
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink
                to="/services"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span className="bg-white/20 px-3 py-1 rounded-lg">
                  All Project
                </span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Project Details</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">
              {services.length} Total Project Types
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto ">
        <div className="bg-white rounded-2xl shadow-xl p-9 mt-6">
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

              <h3 className="text-xl font-semibold mb-3">Key Features</h3>

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

      <div className="min-h-screen  py-12 ">
        <div className="max-w-full">
          {/* Header */}

          {/* Cards Grid */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Top Orange Border */}
                <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>

                <div className="p-8">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xl font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {category.title}
                  </h3>

                  {/* Decorative Line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-5"></div>

                  {/* Subtitle */}
                  <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">
                    {category.subtitle}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-gray-400 font-semibold">Active</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <span className="text-gray-400">
                Live Projects:{" "}
                <span className="font-bold text-orange-300">15</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;