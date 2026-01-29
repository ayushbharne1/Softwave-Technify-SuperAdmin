import React, { useState } from "react";
import {
  LayoutDashboard,
  CheckCircle,
  Wallet,
  Clock,
} from "lucide-react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

const tabs = [
  { key: "Payouts", label: "Payouts" },
  { key: "Guide", label: "Guide" },
  { key: "Eligibility & Documents", label: "Eligibility & Documents" },
  { key: "Product Details", label: "Product Details" },
];

const DematDetails = () => {
  const navigate = useNavigate();
  const { state: card } = useLocation();
  const [activeTab, setActiveTab] = useState("Payouts");

  if (!card) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="mt-6">
        <div className="mb-5 mt-6">
          <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
            <h1 className="text-xl font-semibold text-white">
              Demat Account Details
            </h1>

            <div className="text-[15px] text-white flex items-center gap-2 mt-3">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <LayoutDashboard size={16} />
              </NavLink>

              <span>&gt;</span>

              <NavLink
                to="/projects"
                className="hover:text-blue-600 transition"
              >
                Project
              </NavLink>

              <span>&gt;</span>

              <NavLink
                to="/project/demat-account"
                className="hover:text-blue-600 transition"
              >
                Demat Account
              </NavLink>

              <span>&gt;</span>

              <span>Demat Account Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MAIN WHITE CARD (ONLY WRAPPER ADDED) */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* BANK INFO */}
        <div className="flex items-center gap-3">
          <img
            src={card.logo}
            alt="logo"
            className="w-12 h-12 object-cover"
          />
          <div>
            <p className="text-sm text-gray-500">
              {card.name}
            </p>
            <h1 className="text-lg font-semibold">
              Demat Account
            </h1>
          </div>
        </div>

        {/* STATS */}
        <div className="rounded-xl flex gap-3 mt-3">
          <Stat
            icon={<CheckCircle size={28} />}
            label="Approved"
            value="0"
          />
          <Stat
            icon={<Wallet size={28} />}
            label="Paid"
            value="₹0.0"
          />
          <Stat
            icon={<Clock size={28} />}
            label="Pending"
            value="₹0.0"
          />
        </div>

        {/* GOALS */}
        <div className="mt-4 bg-blue-50 rounded p-3">
          <p className="font-medium">Goals</p>
          <p className="text-sm">
            ➤ Account Opening
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === t.key
                ? "bg-yellow-50 shadow"
                : "text-blue-600"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-4 bg-gray-100 rounded-xl p-4 text-sm space-y-2">
          {activeTab === "Payouts" && (
            <>
              <p>
                1. Earn ₹{card.earn} on successful account opening
              </p>
              <p>2. Payout within 7 days</p>
              <p>3. Fraud leads will be rejected</p>
            </>
          )}

          {activeTab === "Guide" && (
            <>
              <p>1. Share demat account link</p>
              <p>2. Customer completes KYC</p>
              <p>3. Account approved</p>
            </>
          )}

          {activeTab === "Eligibility & Documents" && (
            <>
              <p>• PAN Card</p>
              <p>• Aadhaar Card</p>
              <p>• Mobile linked with Aadhaar</p>
            </>
          )}

          {activeTab === "Product Details" && (
            <>
              <p>• Zero account opening charges</p>
              <p>• Free AMC</p>
              <p>• 100% digital process</p>
            </>
          )}
        </div>

        {/* SHARE */}
        <div className="mt-5">
          <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg font-semibold">
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};

/*  STAT COMPONENT — UNCHANGED */
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default DematDetails;
