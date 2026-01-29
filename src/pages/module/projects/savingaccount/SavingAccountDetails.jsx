import React, { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle,
  Wallet,
  Clock,
} from "lucide-react";

const SavingsAccountDetails = () => {
  const { state: card } = useLocation();
  const navigate = useNavigate();
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
              Saving Account Details
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
                to="/project/savings-account"
                className="hover:text-blue-600 transition"
              >
                Saving Account
              </NavLink>

              <span>&gt;</span>

              <span>Saving Account Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MAIN WHITE CARD (SAME AS DEMAT UI) */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* BANK INFO */}
        <div className="flex items-center gap-3">
          <img
            src={card.logo}
            alt={card.name}
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">
              {card.name}
            </p>
            <h1 className="text-lg font-semibold">
              Savings Account
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
          {[
            "Payouts",
            "Guide",
            "Eligibility & Documents",
            "Product Details",
          ].map((tab) => (
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
              <p>
                1. Earn ₹{card.earn} for every successful account opened
              </p>
              <p>2. Payout will be made in 7 days</p>
              <p>3. Fraud or invalid leads will be rejected</p>
            </>
          )}

          {activeTab === "Guide" && (
            <>
              <p>1. Share your referral link</p>
              <p>2. Customer completes KYC</p>
              <p>3. Account gets approved</p>
            </>
          )}

          {activeTab === "Eligibility & Documents" && (
            <>
              <p>• PAN Card mandatory</p>
              <p>• Aadhaar Card required</p>
              <p>• Mobile number linked with Aadhaar</p>
            </>
          )}

          {activeTab === "Product Details" && (
            <>
              <p>• Zero account opening charges</p>
              <p>• No minimum balance</p>
              <p>• Fully digital process</p>
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

/* 🔒 STAT COMPONENT — UI MATCHED WITH DEMAT */
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default SavingsAccountDetails;
