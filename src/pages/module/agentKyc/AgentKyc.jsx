import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEye } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  fetchAgentDetails,
  approveAgentKyc,
} from "../../../redux/slice/kyc/kycSlice";

import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

const statusStyles = {
  submitted: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AgentKyc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, pagination
  } = useSelector((state) => state.agentKyc);

  useEffect(() => {
    dispatch(fetchAgentDetails());
  }, [dispatch]);
  const handleApprove = (agentId) => {
    dispatch(approveAgentKyc({ agentId, approved: true }));
  };

  const handleReject = (agentId) => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    dispatch(
      approveAgentKyc({
        agentId,
        approved: false,
        rejectionReason: reason,
      })
    );
  };

  if (loading) {
    return (
      <div className="h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="mt-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">
          Agent KYC Management
        </h1>

        <div className="text-[15px] flex items-center gap-2 text-blue-100 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span className="text-white">Agent KYC Management</span>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <table className="min-w-full text-gray-700">
          <thead className="bg-[#1d476e33] ">
            <tr>
              <th className="px-4 py-3 text-center">SR.NO</th>

              <th className="px-4 py-3 text-center">Agent</th>
              <th className="px-4 py-3 text-center">Phone</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list.length === 0 && (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-400">
                  No KYC requests found
                </td>
              </tr>
            )}

            {list.map((row, index) => {
              const status = row.kycStatus || "submitted";

              return (
                <tr key={row._id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-3 text-center font-medium" >{(pagination.page - 1) * pagination.limit + index + 1}</td>

                  <td className="px-4 py-3 text-center font-medium">
                    {row.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {row.phone}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
                    >
                      {status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => navigate(`/agentkyc/viewkyc/${row._id}`)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-700"
                      >
                        <FiEye />
                      </button>
                      {row.kycStatus === "submitted" && (
                        <>
                          <button
                            onClick={() => handleApprove(row._id)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-700"
                          >
                            <FaCheckCircle />
                          </button>

                          <button
                            onClick={() => handleReject(row._id)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-700"
                          >
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center gap-3 mt-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => dispatch(fetchAgentDetails(pagination.page - 1))}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm ">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => dispatch(fetchAgentDetails(pagination.page + 1))}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default AgentKyc;
