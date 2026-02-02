import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCommissionAgents,
  updateAdjustment,
  lockAgent,
} from "../../../redux/slice/commisionManagement/commisionSlice";

import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

export default function CommissionManagement() {
  const dispatch = useDispatch();

  // 🔴 error REMOVED
  const { agents, loading } = useSelector((state) => state.commission);

  useEffect(() => {
    dispatch(fetchCommissionAgents());
  }, [dispatch]);

  const handleAdjustment = (id, value) => {
    dispatch(updateAdjustment({ id, value: Number(value) }));
  };

  const lockCommission = (id) => {
    dispatch(lockAgent(id));
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">
          Commission Management
        </h1>

        <div className="text-[15px] flex items-center gap-2 text-blue-100 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span className="text-white">Commission Management</span>
        </div>
      </div>

      {/* Table */}
      <div className="shadow bg-white p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1d476e33] sticky top-0 z-10">
            <tr className="text-black uppercase text-sm tracking-wider">
              <th className="p-4 text-left font-medium">Agent Name</th>
              <th className="p-4 text-center font-medium">Approved Leads</th>
              <th className="p-4 text-center font-medium">
                Commission / Lead
              </th>
              <th className="p-4 text-center font-medium">
                Total Commission
              </th>
              <th className="p-4 text-center font-medium">Adjustment</th>
              <th className="p-4 text-center font-medium">Final Amount</th>
              <th className="p-4 text-center font-medium">Status</th>
              <th className="p-4 text-center font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {agents?.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-400"
                >
                  No commission data found
                </td>
              </tr>
            )}

            {agents?.map((agent, index) => {
              const total = agent.totalCommission;
              const finalAmount = total + agent.adjustment;

              return (
                <tr
                  key={agent.id}
                  className={`transition
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-blue-50
                    ${agent.locked ? "opacity-70" : ""}
                  `}
                >
                  <td className="px-6 py-4 font-medium">
                    {agent.name}
                  </td>

                  <td className="px-6 py-4 font-medium text-center">
                    {agent.approvedLeads}
                  </td>

                  <td className="px-6 py-4 font-medium text-center">
                    ₹{agent.commissionPerLead}
                  </td>

                  <td className="px-6 py-4 font-medium text-center">
                    ₹{total}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      disabled={agent.locked}
                      value={agent.adjustment}
                      onChange={(e) =>
                        handleAdjustment(agent.id, e.target.value)
                      }
                      className="w-24 px-3 py-1.5 rounded-lg text-center
                        bg-white border border-gray-300
                        focus:ring-2 focus:ring-[#0E5FD8]
                        outline-none disabled:bg-gray-200"
                    />
                  </td>

                  <td className="p-4 text-center font-semibold text-green-600">
                    ₹{finalAmount}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          agent.locked
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-[#0E5FD8]"
                        }
                      `}
                    >
                      {agent.locked ? "Locked" : "Editable"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {!agent.locked && (
                      <button
                        onClick={() => lockCommission(agent.id)}
                        className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold
                          bg-linear-to-r from-[#0B1C2D] to-[#0E5FD8]
                          shadow-md hover:opacity-90 active:scale-95
                          transition-all"
                      >
                        Approve & Lock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}