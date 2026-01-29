import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchAgentById,
  clearAgent,
} from "../../../redux/slice/agent/agentViewSlice";
import { LayoutDashboard } from "lucide-react";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 py-2">
    <span className="text-xs uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <span className="text-base font-semibold text-gray-900 break-words">
      {value !== undefined && value !== null && value !== "" ? value : "—"}
    </span>
  </div>
);

export default function AgentView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { agent, loading, error } = useSelector(
    (state) => state.agentView
  );

  useEffect(() => {
    dispatch(fetchAgentById(id));
    return () => {
      dispatch(clearAgent());
    };
  }, [dispatch, id]);

  if (loading)
    return <div className="text-center mt-10">
      <LoaderSpinner/>
    </div>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!agent) return null;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* BREADCRUMB HEADER */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Agents Information</h1>
        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-blue-600">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/agent" className="hover:text-blue-600">
            Agents Management
          </NavLink>
          <span>&gt;</span>
          <span>Agent Details</span>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 space-y-10">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Agent Full Details
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete profile & verification overview
          </p>
        </div>

        {/* BASIC INFO */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">
            Basic Information
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <InfoRow label="Name" value={agent.name} />
            <InfoRow label="Phone" value={agent.phone} />
            <InfoRow label="Email" value={agent.email} />
            <InfoRow label="Gender" value={agent.gender} />
            <InfoRow label="DOB" value={agent.dateOfBirth?.split("T")[0]} />
            <InfoRow label="Occupation" value={agent.occupation} />
          </div>
        </section>

        {/* ADDRESS */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
          <h3 className="text-lg font-semibold text-emerald-600 mb-4">
            Address Details
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <InfoRow label="Address" value={agent.address} />
            <InfoRow label="City" value={agent.city} />
            <InfoRow label="State" value={agent.state} />
            <InfoRow label="Pincode" value={agent.pincode} />
          </div>
        </section>

        {/* ACCOUNT STATUS */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
          <h3 className="text-lg font-semibold text-orange-600 mb-4">
            Account Status
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <InfoRow label="Referral ID" value={agent.referralId} />
            <InfoRow label="KYC Status" value={agent.kycStatus} />
            <InfoRow
              label="KYC Completed"
              value={agent.isKycCompleted ? "Yes" : "No"}
            />
            <InfoRow
              label="Profile Completion"
              value={`${agent.profileCompletionPercentage}%`}
            />
            <InfoRow label="Active" value={agent.isActive ? "Yes" : "No"} />
            <InfoRow label="Blocked" value={agent.isBlocked ? "Yes" : "No"} />
          </div>
        </section>

        {/* OTP DETAILS */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            OTP Details
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoRow
              label="OTP Verified"
              value={agent.otp?.verified ? "Yes" : "No"}
            />
            <InfoRow label="OTP Attempts" value={agent.otp?.attempts} />
            <InfoRow label="OTP Resend Count" value={agent.otpResendCount} />
          </div>
        </section>

        {/* KYC */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-purple-600 mb-4">
            KYC Verification
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoRow
              label="Aadhaar"
              value={agent.aadhaarDetails?.isVerified ? "Verified" : "Not Verified"}
            />
            <InfoRow
              label="PAN"
              value={agent.panDetails?.isVerified ? "Verified" : "Not Verified"}
            />
            <InfoRow
              label="Bank"
              value={agent.bankDetails?.isVerified ? "Verified" : "Not Verified"}
            />
          </div>
        </section>

        {/* SYSTEM INFO */}
        <section className="bg-white rounded-xl shadow p-6 border-l-4 border-gray-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            System Information
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <InfoRow label="Registration Step" value={agent.registrationStep} />
            <InfoRow label="Registered At" value={agent.registrationCompletedAt?.split("T")[0]} />
            <InfoRow label="Created At" value={agent.createdAt?.split("T")[0]} />
            <InfoRow label="Updated At" value={agent.updatedAt?.split("T")[0]} />
            <InfoRow label="Login Attempts" value={agent.loginAttempts} />
            <InfoRow label="Agent ID" value={agent._id} />
          </div>
        </section>

      </div>
    </div>
  );
}
