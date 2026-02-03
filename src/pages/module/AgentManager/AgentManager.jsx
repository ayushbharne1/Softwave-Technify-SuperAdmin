import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit, LayoutDashboard, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchAgents } from "../../../redux/slice/agent/agentGetSlice";
import { FiEye } from "react-icons/fi";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
import { deleteAgentById } from "../../../redux/slice/agent/agentDeleteSlice";
import { toggleAgentStatus } from "../../../redux/slice/agent/agentStatus";
export default function AgentManagements() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get agents state from Redux
  const { agents, loading, error } = useSelector((state) => state.agentGet);

  // Fetch agents on mount
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  // Toggle isActive locally
  const toggleStatus = (id) => {
    const updatedAgents = agents.map((agent) =>
      agent.id === id ? { ...agent, isActive: !agent.isActive } : agent,
    );
    dispatch({
      type: "agentGet/fetchAgents/fulfilled",
      payload: updatedAgents,
    });
  };

  if (loading)
    return (
      <LoaderSpinner />

    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    const res = await dispatch(deleteAgentById(id));

    if (res.meta.requestStatus === "fulfilled") {
      // delete ke baad agentGetSlice ko update karo
      dispatch(fetchAgents());
    }
  };

  if (loading) return <div className="text-center mt-10">
    <LoaderSpinner />
  </div>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  const handleStatusToggle = async (id) => {
    const res = await dispatch(toggleAgentStatus(id));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchAgents()); // latest status ke liye
    }
  };

  return (
    <div className="mt-5 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Agents Managements</h1>
        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1"
          >
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span className="hover:text-blue-600 transition">
            Agents Management
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
          onClick={() => navigate("/agent/form")}
        >
          Add Agent
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <table className="min-w-full text-l text-gray-700">
          <thead className="bg-[#1d476e33] sticky top-0 z-10">
            <tr className="text-black">
              {[
                "Name",
                "Phone",
                "Referral Id",
                "Status",
                "KYC Status",
                "Actions",
              ].map((col) => (
                <th key={col} className="px-4 py-3 text-center font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {agents.length === 0 && (
              <tr className="border-b border-gray-200">
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No agents found
                </td>
              </tr>
            )}

            {agents.map((agent) => (
              <tr key={agent._id} className="hover:bg-blue-50 transition border-b border-gray-200 ">
                {/* Name */}
                <td className="px-6 py-4 text-center font-semibold">
                  {agent.name || "—"}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-center">{agent.phone || "—"}</td>

                {/* Referral ID */}
                <td className="px-6 py-4 text-center">
                  {agent.referralId || "—"}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleStatusToggle(agent._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${agent.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* KYC Status */}
                <td className="px-6 py-4 text-center capitalize">
                  {agent.kycStatus || "pending"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/agent/view/${agent._id}`)}
                    className="px-2 py-1 rounded-md text-blue-600"
                  >
                    <FiEye size={18} />
                  </button>

                  <button
                    onClick={() => navigate(`/agent/edit/${agent._id}`)}
                    className="px-2 py-1 rounded-md text-green-600"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="px-2 py-1 rounded-md text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}