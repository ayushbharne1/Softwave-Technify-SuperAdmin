import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { fetchAgentById } from "../../../redux/slice/agent/agentViewSlice";
import {
  updateAgent,
  resetEditState,
} from "../../../redux/slice/agent/agentEditSlice";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
import { LayoutDashboard } from "lucide-react";

// 🔹 Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgentEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { agent, loading: viewLoading } = useSelector(
    (state) => state.agentView
  );
  const { loading, success, error } = useSelector(
    (state) => state.agentEdit
  );

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

  // 🔹 fetch agent by id
  useEffect(() => {
    dispatch(fetchAgentById(id));
  }, [id, dispatch]);

  // 🔹 fill form once agent loaded
  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || "",
        phone: agent.phone || "",
        email: agent.email || "",
        gender: agent.gender || "",
        dateOfBirth: agent.dateOfBirth?.slice(0, 10) || "",
        state: agent.state || "",
        city: agent.city || "",
        pincode: agent.pincode || "",
        address: agent.address || "",
        occupation: agent.occupation || "",
      });
    }
  }, [agent]);

  // 🔹 after successful update → toast + navigate back
  useEffect(() => {
    if (success) {
      // toast.success("Agent updated successfully");
      dispatch(resetEditState());

      // thoda delay taaki toast dikhe
      setTimeout(() => {
        navigate(-1);
      }, 1200);
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAgent({ id, formData }));
  };

  // 🔹 Page Loader
  if (viewLoading || !agent) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Agents Management</h1>
        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink
            to="/agent"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <span>Agent Management</span>
          </NavLink>
          <span>&gt;</span>
          <span>Edit Agents</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-10 shadow max-w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Agent</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type={field === "dateOfBirth" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field}
              className="border rounded-lg px-3 py-2"
            />
          ))}

          <div className="col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update Agent"}
            </button>

            {/* {loading && <LoaderSpinner />} */}
          </div>

          {error && (
            <p className="col-span-2 text-red-500 text-sm">
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default AgentEdit;
