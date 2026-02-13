// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import AgentForm from "./Agentform";
// import { useDispatch, useSelector } from "react-redux";
// import { postAgent } from "../../../redux/slice/agent/agentAddSlice";
// import { toast } from "react-toastify";
// export default function AgentFormPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.agent);

//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
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

//   useEffect(() => {
//     if (isEdit) {
//       const agents = JSON.parse(localStorage.getItem("agents")) || [];
//       const agent = agents.find((a) => a.id === id);
//       if (agent) setForm(agent);
//     }
//   }, [id, isEdit]);

//   const handleSubmit = async () => {
//     if (!form.name || !form.phone || !form.email) {
//       // alert("Required fields missing");
//       toast.error("Required fields missing!",{
//         autoClose:2000
//       })
//       return;
//     }

//     try {
//       await dispatch(postAgent(form)).unwrap();
//       toast.success("Agent data saved successfully!",{
//         autoClose:2000
//       });
//       navigate("/agent");
//     } catch (err) {
//       // alert("Error saving agent: " + err);
//       toast.error("Error saving agent ",err,{
//         autoClose:2000
//       });
//     }
//   };

//   return (
//     <div className="mt-6 flex justify-center">
//       <AgentForm
//         title={isEdit ? "Edit Agent" : "Add Agent"}
//         form={form}
//         setForm={setForm}
//         onSubmit={handleSubmit}
//       />
//       {loading && <p>Saving...</p>}
//       {/* {error && <p className="text-red-500">{error}</p>} */}
//       {error && <p className="text-red-500">{error.message}</p>}

//     </div>
//   );
// }






import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AgentForm from "./Agentform";
import { toast } from "react-toastify";
import { LayoutDashboard, Users, UserPlus } from "lucide-react";

export default function AgentFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 🔹 Local state management (Removing Redux)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
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

  // 🔹 Fetch Data from LocalStorage if editing
  useEffect(() => {
    if (isEdit) {
      const agents = JSON.parse(localStorage.getItem("agents")) || [];
      const agent = agents.find((a) => String(a.id) === String(id));
      if (agent) {
        setForm(agent);
      }
    }
  }, [id, isEdit]);

  // 🔹 Handle Submit without API
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Required fields missing!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simulate a small delay for a better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      const existingAgents = JSON.parse(localStorage.getItem("agents")) || [];

      if (isEdit) {
        // Update logic
        const updatedAgents = existingAgents.map((a) =>
          String(a.id) === String(id) ? { ...form, id: id } : a
        );
        localStorage.setItem("agents", JSON.stringify(updatedAgents));
        toast.success("Agent updated successfully!", { autoClose: 2000 });
      } else {
        // Add logic
        const newAgent = { ...form, id: Date.now().toString() };
        existingAgents.push(newAgent);
        localStorage.setItem("agents", JSON.stringify(existingAgents));
        toast.success("Agent added successfully!", { autoClose: 2000 });
      }

      navigate("/agent");
    } catch (err) {
      setError("Failed to save data locally.");
      toast.error("Error saving agent data", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* 🔹 Orange Gradient Header with Breadcrumbs */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEdit ? "Edit Agent" : "Add New Agent"}
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                <LayoutDashboard size={16} />
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/agent" className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded">
                <Users size={16} className="ml-1" />
                Agent Management
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">
                {isEdit ? "Edit Agent" : "Add Agent"}
              </span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm flex items-center gap-2">
                <UserPlus size={16} /> {isEdit ? "Update Profile" : "Create Profile"}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Form Container */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <AgentForm
            title={isEdit ? "Modify Agent Details" : "Register New Agent"}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
          />
          
          {/* Status Messages */}
          <div className="mt-4 flex flex-col items-center">
            {loading && (
              <div className="flex items-center gap-2 text-orange-600 font-medium animate-pulse">
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                Saving to records...
              </div>
            )}
            {error && <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}