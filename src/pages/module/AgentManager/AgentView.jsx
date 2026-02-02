import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

// 🔹 Static Agents Data (same pattern as AgentManagements)
const STATIC_AGENTS = [
  {
    _id: "1",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@gmail.com",
    gender: "Male",
    dateOfBirth: "1998-05-12",
    occupation: "Sales Executive",

    address: "MG Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",

    referralId: "REF1001",
    kycStatus: "approved",
    isKycCompleted: true,
    profileCompletionPercentage: 90,
    isActive: true,
    isBlocked: false,

    otp: {
      verified: true,
      attempts: 1,
    },
    otpResendCount: 0,

    aadhaarDetails: { isVerified: true },
    panDetails: { isVerified: true },
    bankDetails: { isVerified: false },

    registrationStep: 5,
    registrationCompletedAt: "2024-06-10T10:30:00Z",
    createdAt: "2024-06-01T09:00:00Z",
    updatedAt: "2024-07-01T12:00:00Z",
    loginAttempts: 2,
  },
  {
    _id: "2",
    name: "Amit Verma",
    phone: "9123456789",
    email: "amit@gmail.com",
    gender: "Male",
    dateOfBirth: "1996-08-20",
    occupation: "Agent",

    address: "Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",

    referralId: "REF1002",
    kycStatus: "pending",
    isKycCompleted: false,
    profileCompletionPercentage: 60,
    isActive: false,
    isBlocked: false,

    otp: {
      verified: false,
      attempts: 3,
    },
    otpResendCount: 2,

    aadhaarDetails: { isVerified: false },
    panDetails: { isVerified: false },
    bankDetails: { isVerified: false },

    registrationStep: 3,
    registrationCompletedAt: null,
    createdAt: "2024-06-15T11:00:00Z",
    updatedAt: "2024-06-20T12:00:00Z",
    loginAttempts: 5,
  },
];

// 🔹 Info Row Component
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
  const [agent, setAgent] = useState(null);

  // 🔹 Load agent from static data
  useEffect(() => {
    const foundAgent = STATIC_AGENTS.find(
      (agent) => agent._id === id
    );
    setAgent(foundAgent || null);
  }, [id]);

  if (!agent) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Agent not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">
          Agents Information
        </h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="hover:text-blue-300">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/agent" className="hover:text-blue-300">
            Agents Management
          </NavLink>
          <span>&gt;</span>
          <span>Agent Details</span>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 space-y-10">
        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
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
            <InfoRow label="DOB" value={agent.dateOfBirth} />
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
            <InfoRow
              label="Registered At"
              value={agent.registrationCompletedAt?.split("T")[0]}
            />
            <InfoRow
              label="Created At"
              value={agent.createdAt?.split("T")[0]}
            />
            <InfoRow
              label="Updated At"
              value={agent.updatedAt?.split("T")[0]}
            />
            <InfoRow label="Login Attempts" value={agent.loginAttempts} />
            <InfoRow label="Agent ID" value={agent._id} />
          </div>
        </section>
      </div>
    </div>
  );
}
