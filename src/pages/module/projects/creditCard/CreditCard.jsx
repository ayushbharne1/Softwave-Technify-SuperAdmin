// import React from "react";
// import { Send, LayoutDashboard, Search } from "lucide-react";
// import { useNavigate, NavLink } from "react-router-dom";

// import hdfcLogo from "../../../../assets/hdfc.png";
// import iciciLogo from "../../../../assets/icicic.jpg";
// import sbiLogo from "../../../../assets/sbi2.png";
// import axisLogo from "../../../../assets/axixlogo.png";
// import kotakLogo from "../../../../assets/kotak.png";
// import yesLogo from "../../../../assets/yes.png";
// import rblLogo from "../../../../assets/rbl.png";
// import indusLogo from "../../../../assets/indusind.webp";
// import pnbLogo from "../../../../assets/pnb.png";
// import bobLogo from "../../../../assets/bob.png";
// import idfcLogo from "../../../../assets/idfc.png";
// import federalLogo from "../../../../assets/federal.png";
// import auLogo from "../../../../assets/au.jpg";
// import cityLogo from "../../../../assets/city.png";

// const allLogos = [
//   { logo: axisLogo, name: "Axis" },
//   { logo: hdfcLogo, name: "HDFC" },
//   { logo: sbiLogo, name: "SBI" },
//   { logo: yesLogo, name: "YES" },
//   { logo: kotakLogo, name: "Kotak" },
//   { logo: rblLogo, name: "RBL" },
//   { logo: indusLogo, name: "IndusInd" },
//   { logo: pnbLogo, name: "PNB" },
//   { logo: bobLogo, name: "BOB" },
//   { logo: idfcLogo, name: "IDFC" },
//   { logo: federalLogo, name: "Federal" },
//   { logo: auLogo, name: "AU" },
//   { logo: cityLogo, name: "Citi" },
//   { logo: iciciLogo, name: "ICICI" },
// ];

// const cards = [
//   {
//     name: "Axis Bank Credit Card",
//     logo: axisLogo,
//     status: "Active",
//     statusColor: "bg-green-500",
//     points: [
//       "Benefits like cashback, edge reward points etc.",
//       "Convert to EMI Feature",
//     ],
//     earn: 1700
//   },
//   {
//     name: "HDFC Credit Card",
//     logo: hdfcLogo,
//     status: "Active",
//     statusColor: "bg-green-500",
//     points: [
//       "Completely digital process",
//       "Cashback offers on online shopping",
//     ],
//     earn: 2200
//   },
//   {
//     name: "SBI SimplySAVE Credit Card",
//     logo: sbiLogo,
//     status: "Active",
//     statusColor: "bg-green-500",
//     points: [
//       "Get 2,000 Bonus Reward Points on spends of Rs. 2000",
//       "Enjoy 10X Reward Points on Dining, Grocery & Movies",
//     ],
//     earn: 2200
//   },
//   {
//     name: "HDFC Bank Biz First Credit Card",
//     logo: hdfcLogo,
//     status: "Active",
//     statusColor: "bg-green-500",
//     points: [
//       "Each cash points on business spends",
//       "Get up to 5% cashback on travel and online shopping via SmartBuy",
//     ],
//     earn: 2200
//   },
//   {
//     name: "YES Bank POP Club Credit Card",
//     logo: yesLogo,
//     status: "Hold",
//     statusColor: "bg-red-400",
//     points: [
//       "3-month Zomato Gold & 6-month PharmEasy Plus",
//       "10 POP coins per Rs.100 spent online",
//     ],
//     earn: 2000
//   },
// ];

// const CreditCard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className=" min-h-screen">
//       {/* TOP HEADER */}
//       <div className=" mb-5 mt-6">
//         <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
//                       rounded-2xl p-6 shadow-lg mb-6">
//           <h1 className="text-xl font-semibold text-white">Credit Card</h1>

//           <div className="text-[15px] text-white flex items-center gap-2 mt-3">
//             <NavLink
//               to="/dashboard"
//               className="flex items-center gap-1 hover:text-blue-600 transition"
//             >
//               <LayoutDashboard size={16} />
//             </NavLink>

//             <span>&gt;</span>
//             <NavLink
//               to="/projects"
//               className="flex items-center gap-1 hover:text-blue-600 transition"
//             >
//               <span>Project</span>
//             </NavLink>

//             <span>&gt;</span>

//             <span>Credit Card</span>
//           </div>
//         </div>

//       </div>

//       {/* LIVE PROJECTS */}
//       <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
//         <h2 className="text-lg font-semibold text-center text-gray-800">
//           Live Projects: {cards.length}
//         </h2>
//       </div>

//       {/* BANK LOGOS */}
//       <div className="flex gap-4 overflow-x-auto mt-6 mb-6 pb-2">
//         {allLogos.map((item, i) => (
//           <div
//             key={i}
//             className="min-w-[70px] bg-white shadow rounded-lg flex flex-col items-center justify-center p-2"
//           >
//             <img
//               src={item.logo}
//               alt={item.name}
//               className="object-contain w-10 h-10"
//             />
//             <p className="text-xs mt-1 font-medium text-gray-700">
//               {item.name}
//             </p>
//           </div>
//         ))}
//       </div>



//       {/* SEARCH BOX */}
//       <div className="mb-6 flex items-center gap-3 max-w-md">
//         <input
//           type="text"
//           placeholder="Enter Pin code"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg
//     focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition">
//           <Search className="text-white w-8 h-6" />
//         </button>
//       </div>

//       {/* GRID – 2 CARDS PER ROW */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {cards.map((card, i) => (
//           <div
//             key={i}
//             onClick={() => navigate(`/project/credit-card/${i}`, { state: card })}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative cursor-pointer"
//           >
//             {/* Status */}
//             <span
//               className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded ${card.statusColor}`}
//             >
//               {card.status}
//             </span>

//             {/* Header */}
//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src={card.logo}
//                 alt={card.name}
//                 className="w-10 h-10 object-contain"
//               />
//               <h2 className="font-semibold text-gray-800 text-sm">
//                 {card.name}
//               </h2>
//             </div>

//             {/* Points */}
//             <ul className="text-sm text-blue-600 space-y-2 mb-4">
//               {card.points.map((p, idx) => (
//                 <li key={idx} className="flex gap-2">
//                   <span>🏷</span>
//                   <span>{p}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* Goals */}
//             <div className="bg-blue-50 rounded-lg p-3">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-medium text-gray-700">Goals</span>
//                 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                   Earn Rs{card.earn}.0
//                 </span>
//               </div>

//               <div className="flex justify-between items-center text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Send size={16} />
//                   Dispatch & Transaction
//                 </div>
//                 <div className="font-semibold text-yellow-600">
//                   ₹ {card.earn}.0
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default CreditCard;



// import React, { useEffect, useState } from "react";
// import { Send, LayoutDashboard, Search } from "lucide-react";
// import { useNavigate, NavLink, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjectTypes, fetchProjectsByType } from "../../../../redux/slice/project/getprojectSlice"

// /* 🔹 LOGOS STATIC (as it is) */
// import hdfcLogo from "../../../../assets/hdfc.png";
// import axisLogo from "../../../../assets/axixlogo.png";

// const CreditCard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { type } = useParams();
//   // const projectType = typeMap[type];
//   const [currentType, setCurrentType] = useState("");

//   // const { projects, loading } = useSelector((state) => state.getproject);
//   const { projectTypes, projects, loading, loadingTypes, error } = useSelector(
//     (state) => state.getproject
//   );

//   /* 🔹 API CALL */
//   // useEffect(() => {
//   //   dispatch(fetchProjectsByType("credit-card"));
//   // }, [dispatch]);
//   // useEffect(() => {
//   //   if (projectType) {
//   //     dispatch(fetchProjectsByType(projectType));
//   //   }
//   // }, [dispatch, projectType]);

//   useEffect(() => {
//     dispatch(fetchProjectTypes());
//   }, [dispatch]);

//   // 2️⃣ Map route param to backend type
//   useEffect(() => {
//     if (projectTypes.length > 0) {
//       const found = projectTypes.find(
//         (t) => t.toLowerCase().replace("_", "-") === type
//       );
//       if (found) setCurrentType(found); // backend enum
//     }
//   }, [projectTypes, type]);

//   // 3️⃣ Fetch projects for that type
//   useEffect(() => {
//     if (currentType) {
//       dispatch(fetchProjectsByType(currentType));
//     }
//   }, [dispatch, currentType]);


//   return (
//     <div className="min-h-screen">

//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
//         rounded-2xl p-6 shadow-lg mb-6 mt-6">
//         <h1 className="text-xl font-semibold text-white">Credit Card</h1>

//         <div className="text-[15px] text-white flex gap-2 mt-3">
//           <NavLink to="/dashboard"><LayoutDashboard size={16} /></NavLink>
//           <span>&gt;</span>
//           <NavLink to="/projects">Project</NavLink>
//           <span>&gt;</span>
//           <span>Credit Card</span>
//         </div>
//       </div>

//       {/* COUNT */}
//       <div className="bg-gray-200 py-3 rounded-lg mb-4">
//         <h2 className="text-lg font-semibold text-center">
//           Live Projects: {projects.length}
//         </h2>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6 flex gap-3 max-w-md">
//         <input
//           placeholder="Enter Pin code"
//           className="w-full px-4 py-2 border rounded-lg"
//         />
//         <button className="bg-blue-600 p-2 rounded-lg">
//           <Search className="text-white w-6 h-6" />
//         </button>
//       </div>

//       {/* LOADER */}
//       {loading && <p className="text-center">Loading...</p>}

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {projects.map((card) => (
//           <div
//             key={card._id}
//             onClick={() => navigate(`/project/credit-card/${card._id}`)}
//             className="bg-white rounded-xl shadow p-4 cursor-pointer"
//           >
//             <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
//               Active
//             </span>

//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src={axisLogo}
//                 className="w-10 h-10 object-contain"
//                 alt=""
//               />
//               <h2 className="font-semibold text-sm">
//                 {card.projectName}
//               </h2>
//             </div>

//             <ul className="text-sm text-blue-600 space-y-2 mb-4">
//               <li>🏷 {card.description}</li>
//             </ul>

//             <div className="bg-blue-50 rounded-lg p-3">
//               <div className="flex justify-between mb-2">
//                 <span>Goals</span>
//                 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                   Earn ₹{card.payout}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <Send size={16} />
//                   Dispatch & Transaction
//                 </div>
//                 <div className="font-semibold text-yellow-600">
//                   ₹ {card.payout}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default CreditCard;


// import React, { useEffect } from "react";
// import { Send, LayoutDashboard, Search } from "lucide-react";
// import { useNavigate, NavLink, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjectsByType } from "../../../../redux/slice/project/getprojectSlice";

// /* 🔹 LOGOS STATIC (fallback if API doesn't provide logo) */
// import axisLogo from "../../../../assets/axixlogo.png";
// import hdfcLogo from "../../../../assets/hdfc.png";

// const CreditCard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { state } = useLocation(); // get route state
//   const backendType = state?.backendType; // the type passed from AllTypes page

//   const { projects, loading, error } = useSelector(
//     (state) => state.getproject
//   );

//   // Fetch projects for this type on mount
//   useEffect(() => {
//     if (backendType) {
//       dispatch(fetchProjectsByType(backendType));
//     }
//   }, [dispatch, backendType]);

//   return (
//     <div className="min-h-screen p-4">

//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6">
//         <h1 className="text-xl font-semibold text-white">{backendType}</h1>
//         <div className="text-[15px] text-white flex gap-2 mt-3">
//           <NavLink to="/dashboard">
//             <LayoutDashboard size={16} />
//           </NavLink>
//           <span>&gt;</span>
//           <NavLink to="/projects">Project</NavLink>
//           <span>&gt;</span>
//           <span>{backendType}</span>
//         </div>
//       </div>

//       {/* COUNT */}
//       <div className="bg-gray-200 py-3 rounded-lg mb-4">
//         <h2 className="text-lg font-semibold text-center">
//           Live Projects: {projects.length}
//         </h2>
//       </div>

//       {/* SEARCH (Optional) */}
//       <div className="mb-6 flex gap-3 max-w-md">
//         <input
//           placeholder="Enter Pin code"
//           className="w-full px-4 py-2 border rounded-lg"
//         />
//         <button className="bg-blue-600 p-2 rounded-lg">
//           <Search className="text-white w-6 h-6" />
//         </button>
//       </div>

//       {/* LOADER / ERROR */}
//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-600">{error}</p>}
//       {!loading && projects.length === 0 && (
//         <p className="text-center text-gray-600">No projects found.</p>
//       )}

//       {/* PROJECT GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {projects.map((project) => (
//           <div
//             key={project._id}
//             onClick={() =>
//               navigate(`/project/${project.projectType}/${project._id}`, {
//                 state: { project },
//               })
//             }
//             className="bg-white rounded-xl shadow p-4 cursor-pointer relative"
//           >
//             <span
//               className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded ${project.status === "active" ? "bg-green-500" : "bg-red-400"
//                 }`}
//             >
//               {project.status?.toUpperCase() || "N/A"}
//             </span>

//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src={project.logo || axisLogo}
//                 className="w-10 h-10 object-contain"
//                 alt={project.projectName}
//               />
//               <h2 className="font-semibold text-sm">{project.projectName}</h2>
//             </div>

//             <ul className="text-sm text-blue-600 space-y-2 mb-4">
//               {project.description?.map((desc, i) => (
//                 <li key={i}>🏷 {desc}</li>
//               ))}
//             </ul>

//             <div className="bg-blue-50 rounded-lg p-3">
//               <div className="flex justify-between mb-2">
//                 <span>Goals</span>
//                 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                   Earn ₹{project.totalEarnings?.amount || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <Send size={16} /> Dispatch & Transaction
//                 </div>
//                 <div className="font-semibold text-yellow-600">
//                   ₹ {project.totalEarnings?.amount || 0}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreditCard;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { fetchProjectsByType } from "../../../../redux/slice/project/getprojectSlice";

// const CreditCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const backendType = location.state?.projectType;

//   const dispatch = useDispatch();
//   const { projects, loadingProjects, error } = useSelector(
//     (state) => state.getproject
//   );

//   useEffect(() => {
//     if (!backendType) return;

//     dispatch(fetchProjectsByType(backendType));

//     // Cleanup on unmount
//     // return () => {
//     //   dispatch(clearProjects());
//     // };
//   }, [dispatch, backendType]);

//   if (!backendType) return <p className="text-red-500">Invalid project type.</p>;
//   if (loadingProjects) return <p>Loading projects...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{backendType}</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {projects.map((p) => (
//           <div key={p._id} className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-semibold">{p.projectName}</h2>
//             <p className="text-sm text-gray-500">{p.companyName}</p>
//             <ul className="list-disc pl-5 text-blue-600">
//               {p.description.map((desc, i) => (
//                 <li key={i}>{desc}</li>
//               ))}
//             </ul>
//             <p className="mt-2 font-semibold">Total Earnings: ₹{p.totalEarnings?.amount || 0}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreditCard;



import React, { useEffect, useState } from "react";
import { Send, LayoutDashboard, Search } from "lucide-react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsByType } from "../../../../redux/slice/project/getprojectSlice";
const CreditCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backendType = location.state?.projectType;

  const { projects, loadingProjects, error } = useSelector(
    (state) => state.getproject
  );

  useEffect(() => {
    if (backendType) {
      dispatch(fetchProjectsByType(backendType));
    }
  }, [dispatch, backendType]);

  if (!backendType) return <p className="text-red-500">Invalid project type</p>;
  if (loadingProjects) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
            rounded-2xl p-6 shadow-lg mb-6">
          <h1 className="text-xl font-semibold text-white">
            {backendType}
          </h1>

          <div className="text-[15px] text-white flex items-center gap-2 mt-3">
            <NavLink to="/dashboard">
              <LayoutDashboard size={16} />
            </NavLink>
            <span>&gt;</span>
            <NavLink to="/projects">Project</NavLink>
            <span>&gt;</span>
            <span>{backendType}</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {projects.length}
        </h2>
      </div>

      {/* BANK LOGOS */}
      <div className="flex gap-4 overflow-x-auto mt-6 mb-6 pb-2">
        {projects.map((item, i) => (
          <div
            key={i}
            className="min-w-[70px] bg-white shadow rounded-lg flex flex-col items-center p-2"
          >
            <img src={item.logo} alt={item.name} className="w-10 h-10" />
            <p className="text-xs mt-1 font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      {/* <div className="mb-6 flex gap-3 max-w-md">
        <input
          type="text"
          placeholder="Enter bank name"
          className="w-full px-4 py-2 border rounded-lg"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="bg-blue-600 p-2 rounded-lg" onClick={() => {
          setFilteredProjects(
            projects.filter((p) =>
              ((p.name || p.projectName) ?? "")
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
          );
        }}>
          <Search className="text-white w-6 h-6" />
        </button>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={p._id}
            onClick={() =>
              navigate(`/project/credit-card/${p._id}`, { state: p })
            }
            className="bg-white rounded-xl shadow hover:shadow-lg p-4 relative cursor-pointer"
          >
            <span className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded bg-green-500">
              Active
            </span>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={p.logo}
                alt="bank"
                className="w-10 h-10"
              />
              <h2 className="font-semibold text-sm">
                {p.projectName}
              </h2>
            </div>

            {/* DESCRIPTION */}
            <ul className="text-sm text-blue-600 space-y-2 mb-4">
              {p.description?.map((d, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>🏷</span>
                  {d}
                </li>
              ))}
            </ul>

            {/* EARNINGS */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Goals</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Earn ₹{p.totalEarnings?.amount || 0}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex gap-2 text-gray-600">
                  <Send size={16} />
                  Dispatch & Transaction
                </div>
                <div className="font-semibold text-yellow-600">
                  ₹ {p.totalEarnings?.amount || 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCard;
