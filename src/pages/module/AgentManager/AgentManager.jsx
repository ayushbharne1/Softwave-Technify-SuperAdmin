import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Edit, LayoutDashboard, Trash } from "lucide-react";
import { FiEye } from "react-icons/fi";

import { fetchAgents } from "../../../redux/slice/agent/agentGetSlice";
import { deleteAgentById } from "../../../redux/slice/agent/agentDeleteSlice";
import { toggleAgentStatus } from "../../../redux/slice/agent/agentStatus";

import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

export default function AgentManagements() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state (error REMOVED)
  const { agents, loading } = useSelector((state) => state.agentGet);

  // Fetch agents on mount
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  // Delete agent
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    dispatch(deleteAgentById(id));
  };

  // Toggle agent status
  const handleStatusToggle = async (id) => {
    const res = await dispatch(toggleAgentStatus(id));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchAgents());
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="mt-5 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">
          Agents Management
        </h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-300 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span className="hover:text-blue-300 transition">
            Agents Management
          </span>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white px-4 py-2 rounded hover:opacity-90 transition"
          onClick={() => navigate("/agent/form")}
        >
          Add Agent
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <table className="min-w-full text-sm text-gray-700">
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
            {agents?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No agents found
                </td>
              </tr>
            )}

            {agents?.map((agent) => (
              <tr
                key={agent._id}
                className="hover:bg-blue-50 transition"
              >
                {/* Name */}
                <td className="px-6 py-4 text-center font-semibold">
                  {agent.name || "—"}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-center">
                  {agent.phone || "—"}
                </td>

                {/* Referral */}
                <td className="px-6 py-4 text-center">
                  {agent.referralId || "—"}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleStatusToggle(agent._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      agent.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* KYC */}
                <td className="px-6 py-4 text-center capitalize">
                  {agent.kycStatus || "pending"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      navigate(`/agent/view/${agent._id}`)
                    }
                    className="px-2 py-1 text-blue-600"
                  >
                    <FiEye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/agent/edit/${agent._id}`)
                    }
                    className="px-2 py-1 text-green-600"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="px-2 py-1 text-red-600"
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