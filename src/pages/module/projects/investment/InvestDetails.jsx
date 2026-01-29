import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle,
  Wallet,
  Clock,
} from "lucide-react";

/* TAB LIST – SAME AS DEMAT */
const tabs = [
  "Payouts",
  "Guide",
  "Eligibility & Documents",
  "Product Details",
];

const InvestmentDetails = () => {
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
              Investment Details
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
                to="/project/investment-account"
                className="hover:text-blue-600 transition"
              >
                Investment
              </NavLink>

              <span>&gt;</span>

              <span>Investment Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MAIN WHITE CARD – SAME AS DEMAT */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* LOGO + NAME */}
        <div className="flex items-center gap-3">
          <img
            src={card.logo}
            alt={card.name}
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">{card.name}</p>
            <h1 className="text-lg font-semibold">
              {card.type || "Investment"}
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
            label="Amount"
            value={`₹${card.amount}`}
          />
          <Stat
            icon={<Clock size={28} />}
            label="Status"
            value={card.status}
          />
        </div>

        {/* GOALS */}
        <div className="mt-4 bg-blue-50 rounded p-3">
          <p className="font-medium">Goals</p>
          <p className="text-sm">➤ {card.goal}</p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === tab
                ? "bg-yellow-50 shadow"
                : "text-blue-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-4 bg-gray-100 rounded-xl p-4 text-sm space-y-2">
          {activeTab === "Payouts" && (
            <>
              <p>1. Earn ₹{card.earn} on successful investment</p>
              <p>2. Payout credited within 7 working days</p>
              <p>3. Invalid transactions are rejected</p>
            </>
          )}

          {activeTab === "Guide" && (
            <>
              <p>1. Choose investment plan</p>
              <p>2. Complete KYC</p>
              <p>3. Amount gets invested</p>
            </>
          )}

          {activeTab === "Eligibility & Documents" && (
            <>
              <p>• PAN Card required</p>
              <p>• Aadhaar linked mobile number</p>
              <p>• Age 18+</p>
            </>
          )}

          {activeTab === "Product Details" && (
            <>
              {card.description?.map((d, i) => (
                <p key={i}>• {d}</p>
              ))}
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

/* 🔒 SAME STAT STYLE AS DEMAT */
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default InvestmentDetails;
