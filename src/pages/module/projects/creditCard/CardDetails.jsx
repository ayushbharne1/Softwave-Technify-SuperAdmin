// import React, { useState } from "react";
// import {
//   CheckCircle,
//   Wallet,
//   Clock,
//   LayoutDashboard,
//   MapPin,
// } from "lucide-react";
// import { useLocation, useNavigate, NavLink } from "react-router-dom";

// const tabs = [
//   { key: "Payouts", label: "Payouts" },
//   { key: "Guide", label: "Guide" },
//   { key: "Eligibility & Documents", label: "Eligibility & Documents" },
//   { key: "Product Details", label: "Product Details" },
// ];

// const CardDetails = () => {
//   const navigate = useNavigate();
//   const { state: card } = useLocation();
//   const [activeTab, setActiveTab] = useState("Payouts");
//   const [openPincode, setOpenPincode] = useState(false);
//   const [pincode, setPincode] = useState("");

//   if (!card) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* HEADER */}
//       <div className="mt-5">
//         <div className="mb-5 mt-6">
//           <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
//                       rounded-2xl p-6 shadow-lg mb-6 mt-6">
//             <h1 className="text-xl font-semibold text-white">
//               Credit Card Details
//             </h1>

//             <div className="text-[15px] text-white flex items-center gap-2 mt-3">
//               <NavLink
//                 to="/dashboard"
//                 className="flex items-center gap-1 hover:text-blue-600 transition"
//               >
//                 <LayoutDashboard size={16} />
//               </NavLink>

//               <span>&gt;</span>

//               <NavLink
//                 to="/projects"
//                 className="hover:text-blue-600 transition"
//               >
//                 Projects
//               </NavLink>

//               <span>&gt;</span>

//               <NavLink
//                 to="/project/credit-card"
//                 className="hover:text-blue-600 transition"
//               >
//                 Credit Card
//               </NavLink>

//               <span>&gt;</span>

//               <span>Credit Card Details</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ MAIN WHITE CARD (NEW WRAPPER ONLY) */}
//       <div className="bg-white rounded-xl shadow p-4">
//         {/* BANK INFO */}
//         <div className="flex items-center gap-3">
//           <img
//             src={card.logo}
//             alt="logo"
//             className="w-12 h-12 object-contain"
//           />
//           <div>
//             <p className="text-sm text-gray-500">{card.name}</p>
//             <h1 className="text-lg font-semibold">Credit Card</h1>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="mt-2 flex gap-3">
//           <Stat icon={<CheckCircle size={28} />} label="Approved" value="0" />
//           <Stat icon={<Wallet size={28} />} label="Paid" value="₹0.0" />
//           <Stat icon={<Clock size={28} />} label="Pending" value="₹0.0" />
//         </div>

//         {/* GOALS */}
//         <div className="mt-4 bg-blue-50 rounded p-3">
//           <p className="font-medium">Goals</p>
//           <p className="text-sm">➤ Dispatch & Transaction</p>
//         </div>

//         {/* TABS */}
//         <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
//           {tabs.map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setActiveTab(t.key)}
//               className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === t.key
//                 ? "bg-yellow-50 shadow"
//                 : "text-blue-600"
//                 }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* CONTENT */}
//         <div className="mt-4 bg-gray-100 rounded-xl p-4 text-sm space-y-2">
//           {activeTab === "Payouts" && (
//             <>
//               <p>1. Earn ₹{card.earn} for every approved lead</p>
//               <p>2. Customer should not be existing card holder</p>
//               <p>3. Payout within 15 days of approval</p>
//               <p>4. Fraud leads will freeze payout</p>
//             </>
//           )}

//           {activeTab === "Guide" && (
//             <>
//               <p>1. Agent shares link with customer</p>
//               <p>2. Customer fills application form</p>
//               <p>3. KYC verification</p>
//               <p>4. Application number generated</p>
//             </>
//           )}

//           {activeTab === "Eligibility & Documents" && (
//             <>
//               <p>• Minimum CIBIL score 720</p>
//               <p>• Aadhaar linked mobile number</p>
//               <p>• Monthly income proof required</p>
//               <p className="mt-2 font-medium">Documents</p>
//               <p>• PAN Card</p>
//               <p>• Aadhaar Card</p>
//               <p>• Income Proof</p>
//             </>
//           )}

//           {activeTab === "Product Details" && (
//             <>
//               <p>• Welcome gifts on delivery</p>
//               <p>• Airport lounge access</p>
//               <p>• Fuel surcharge waiver</p>
//               <p>• Annual fee waiver</p>
//               <p>• Paperless process</p>
//             </>
//           )}
//         </div>

//         {/* PINCODE */}
//         <div className="bg-white rounded-xl p-4 mt-4 border">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2 text-sm">
//               <MapPin size={18} className="text-blue-500" />
//               <span>
//                 Check if credit card is serviceable at your pincode
//               </span>
//             </div>

//             <button
//               onClick={() => setOpenPincode(!openPincode)}
//               className="text-blue-600 font-medium text-sm"
//             >
//               Check
//             </button>
//           </div>

//           {openPincode && (
//             <div className="mt-3 flex gap-2">
//               <input
//                 type="number"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 placeholder="Pincode"
//                 className="w-32 border rounded px-3 py-1.5 text-sm outline-none"
//               />
//               <button
//                 className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded"
//                 onClick={() => {
//                   console.log("Pincode:", pincode);
//                   setOpenPincode(false);
//                 }}
//               >
//                 Search
//               </button>
//             </div>
//           )}
//         </div>

//         {/* SHARE */}
//         <div className="mt-3">
//           <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg">
//             SHARE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* STAT CARD – SAME AS BEFORE (UNCHANGED) */
// const Stat = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
//     <div className="text-blue-500">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   </div>
// );

// export default CardDetails;



import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Wallet,
  Clock,
  LayoutDashboard,
  MapPin,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../../../redux/slice/project/getprojectSlice";

const tabs = [
  { key: "Payouts", label: "Payouts" },
  { key: "Guide", label: "Guide" },
  { key: "Eligibility & Documents", label: "Eligibility & Documents" },
  { key: "Product Details", label: "Product Details" },
];

const CardDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProject: card, loadingProjectById } = useSelector(
    (state) => state.getproject
  );

  const [activeTab, setActiveTab] = useState("Payouts");
  const [openPincode, setOpenPincode] = useState(false);
  const [pincode, setPincode] = useState("");

  /* 🔹 API CALL */
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [id, dispatch]);

  if (loadingProjectById) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!card) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-xl font-semibold text-white">
          <span>{card.projectName}</span>
        </h1>

        <div className="text-sm text-white flex items-center gap-2 mt-3">
          <NavLink to="/dashboard" className="hover:text-blue-300">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/projects" className="hover:text-blue-300">
            Projects
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/project/credit-card" state={{ projectType: "Credit Card" }}
            className="hover:text-blue-300">
            Credit Card
          </NavLink>
          <span>&gt;</span>
          <span>{card.projectName}</span>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* BANK INFO */}
        <div className="flex items-center gap-3">
          <img
            src={card.logo || "/placeholder.png"}
            alt="logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">{card.companyName}</p>
            <h1 className="text-lg font-semibold">
              {card.projectName}
            </h1>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-4 flex gap-3">
          <Stat icon={<CheckCircle size={26} />} label="Approved" value="0" />
          <Stat icon={<Wallet size={26} />} label="Paid" value="₹0" />
          <Stat icon={<Clock size={26} />} label="Pending" value="₹0" />
        </div>

        {/* GOALS */}
        <div className="mt-4 bg-blue-50 rounded p-3">
          <p className="font-medium mb-2">Goals</p>

          {card.goals?.map((goal, index) => (
            <div key={index} className="text-sm mb-1">
              • {goal.description} – ₹{goal.commission} ({goal.commissionType})
            </div>
          ))}
        </div>


        {/* TABS */}
        <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === t.key
                ? "bg-yellow-50 shadow"
                : "text-blue-600"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="mt-4 bg-gray-100 rounded-xl p-4 text-sm space-y-2">
          {/* PAYOUTS */}
          {activeTab === "Payouts" && (
            <>
              <p>• {card.payoutsDetails}</p>
            </>
          )}

          {/* GUIDE */}
          {activeTab === "Guide" && (
            <>
              <p>• {card.guide}</p>
            </>
          )}

          {/* ELIGIBILITY */}
          {activeTab === "Eligibility & Documents" && (
            <>
              <p>• {card.Eligibility}</p>
            </>
          )}

          {/* PRODUCT DETAILS */}
          {activeTab === "Product Details" && (
            <>
              <p>• {card.productDetails}</p>
            </>
          )}

        </div>

        {/* PINCODE */}
        <div className="bg-white rounded-xl p-4 mt-4 border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} className="text-blue-500" />
              <span>Check serviceability by pincode</span>
            </div>

            <button
              onClick={() => setOpenPincode(!openPincode)}
              className="text-blue-600 font-medium text-sm"
            >
              Check
            </button>
          </div>

          {openPincode && (
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="w-32 border rounded px-3 py-1.5 text-sm"
              />
              <button
                className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded"
                onClick={() => setOpenPincode(false)}
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* SHARE */}
        <div className="mt-4">
          <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg">
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};

/* STAT COMPONENT */
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default CardDetails;
