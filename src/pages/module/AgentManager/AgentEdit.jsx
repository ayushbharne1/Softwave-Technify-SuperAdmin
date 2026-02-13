// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, NavLink } from "react-router-dom";
// import { fetchAgentById } from "../../../redux/slice/agent/agentViewSlice";
// import {
//   updateAgent,
//   resetEditState,
// } from "../../../redux/slice/agent/agentEditSlice";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
// import { LayoutDashboard } from "lucide-react";

// // 🔹 Toast
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AgentEdit = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { agent, loading: viewLoading } = useSelector(
//     (state) => state.agentView
//   );
//   const { loading, success, error } = useSelector(
//     (state) => state.agentEdit
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     gender: "",
//     dateOfBirth: "",
//     state: "",
//     city: "",
//     pincode: "",
//     address: "",
//     occupation: "",
//   });

//   // 🔹 fetch agent by id
//   useEffect(() => {
//     dispatch(fetchAgentById(id));
//   }, [id, dispatch]);

//   // 🔹 fill form once agent loaded
//   useEffect(() => {
//     if (agent) {
//       setFormData({
//         name: agent.name || "",
//         phone: agent.phone || "",
//         email: agent.email || "",
//         gender: agent.gender || "",
//         dateOfBirth: agent.dateOfBirth?.slice(0, 10) || "",
//         state: agent.state || "",
//         city: agent.city || "",
//         pincode: agent.pincode || "",
//         address: agent.address || "",
//         occupation: agent.occupation || "",
//       });
//     }
//   }, [agent]);

//   // 🔹 after successful update → toast + navigate back
//   useEffect(() => {
//     if (success) {
//       // toast.success("Agent updated successfully");
//       dispatch(resetEditState());

//       // thoda delay taaki toast dikhe
//       setTimeout(() => {
//         navigate(-1);
//       }, 1200);
//     }
//   }, [success, dispatch, navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateAgent({ id, formData }));
//   };

//   // 🔹 Page Loader
//   if (viewLoading || !agent) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <LoaderSpinner />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* 🔹 Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6 mt-6">
//         <h1 className="text-2xl font-semibold text-white">Agents Management</h1>
//         <div className="text-[15px] text-white flex items-center gap-2 mt-2">
//           <NavLink
//             to="/dashboard"
//             className="flex items-center gap-1 hover:text-blue-600 transition"
//           >
//             <LayoutDashboard size={16} />
//           </NavLink>
//           <span>&gt;</span>
//           <NavLink
//             to="/agent"
//             className="flex items-center gap-1 hover:text-blue-600 transition"
//           >
//             <span>Agent Management</span>
//           </NavLink>
//           <span>&gt;</span>
//           <span>Edit Agents</span>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl p-10 shadow max-w-full mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Edit Agent</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//           {Object.keys(formData).map((field) => (
//             <input
//               key={field}
//               type={field === "dateOfBirth" ? "date" : "text"}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               placeholder={field}
//               className="border rounded-lg px-3 py-2"
//             />
//           ))}

//           <div className="col-span-2 flex items-center gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//             >
//               {loading ? "Updating..." : "Update Agent"}
//             </button>

//             {/* {loading && <LoaderSpinner />} */}
//           </div>

//           {error && (
//             <p className="col-span-2 text-red-500 text-sm">
//               {error}
//             </p>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

// export default AgentEdit;








// following code is without api integration
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, User, Phone, Mail, MapPin, 
  Calendar, Percent, Briefcase, CheckCircle, ChevronLeft 
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock Data - Wahi data jo AgentManagement aur View mein use kiya gaya hai
const MOCK_AGENTS = [
  { 
    _id: "1", 
    name: "Dhruv", 
    phone: "8888888888", 
    email: "dhruv@example.com",
    occupation: "Insurance Agent",
    gender: "Male",
    address: "123, Street Name",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    dateOfBirth: "1995-05-15",
  },
  { 
    _id: "2", 
    name: "Aditi", 
    phone: "9685699962", 
    email: "aditi@example.com",
    occupation: "Freelancer"
  }
];

const AgentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  // Local States
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    occupation: "",
  });

  // 🔹 Fetch Agent Data (Simulated)
  useEffect(() => {
    setViewLoading(true);
    const foundAgent = MOCK_AGENTS.find((a) => a._id === id);
    
    if (foundAgent) {
      setAgent(foundAgent);
      setFormData({
        name: foundAgent.name || "",
        phone: foundAgent.phone || "",
        email: foundAgent.email || "",
        gender: foundAgent.gender || "",
        dateOfBirth: foundAgent.dateOfBirth || "",
        state: foundAgent.state || "",
        city: foundAgent.city || "",
        pincode: foundAgent.pincode || "",
        address: foundAgent.address || "",
        occupation: foundAgent.occupation || "",
      });
    } else {
      setError("Agent not found");
    }
    setViewLoading(false);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated Update Logic
    setTimeout(() => {
      setLoading(false);
      if (!toastShownRef.current) {
        toastShownRef.current = true;
        toast.success("Agent updated successfully", {
          toastId: `agent-update-${id}`,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate(-1); // Go back after success
        }, 1200);
      }
    }, 1000);
  };

  if (viewLoading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  if (error || !agent) {
    return <div className="p-6 text-center text-red-500 font-bold">{error || "Agent not found"}</div>;
  }

  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        limit={1} 
      />

      <div className="p-6 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Agent</h1>
              <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
                <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                  <LayoutDashboard size={16} />
                </NavLink>
                <span className="text-white/60">›</span>
                <NavLink to="/agent" className="flex items-center gap-1 hover:text-white transition-colors">
                  Agent Management
                </NavLink>
                <span className="text-white/60">›</span>
                <span className="text-white font-medium">Edit Agent</span>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-white text-sm">ID: AGENT-{agent._id?.slice(-6)}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.name || agent.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {formData.occupation || "Freelancer"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                    <Percent className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-pink-100 rounded-lg flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm"
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                <ChevronLeft size={18} /> Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle size={18} /> Update Agent
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentEdit;