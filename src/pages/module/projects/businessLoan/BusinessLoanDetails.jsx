import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle,
  Wallet,
  Clock
} from "lucide-react";

const Box = ({ children }) => (
  <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-6">
    {children}
  </div>
);

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 flex-1">
    <Icon className="w-6 h-6 text-blue-500" />
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const BusinessLoanDetails = () => {
  const navigate = useNavigate();
  const { state: card } = useLocation();
  const [activeTab, setActiveTab] = useState("Payouts");

  if (!card) return <p>Investment not found</p>;

  const tabs = [
    "Payouts",
    "Guide",
    "Eligibility & Documents",
    "Product Details"
  ];

  return (
    <div className="mt-6">

      {/* Breadcrumb / Header */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-xl font-semibold text-white">
          Business Loan Details
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
            to="/project/business-loan"
            className="hover:text-blue-600 transition"
          >
            Business Loan
          </NavLink>

          <span>&gt;</span>

          <span>Business Loan Details</span>
        </div>
      </div>

      {/* ✅ MAIN WHITE WRAPPER (LOGO → SHARE BUTTON) */}
      <div className="bg-white rounded-xl p-6 shadow-sm">

        {/* Logo + Name */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src={card.logo}
            alt={card.name}
            className="w-14 h-14 object-contain"
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              {card.name}
            </h2>
            <p className="text-sm text-gray-500">
              {card.type || "Investment"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-5">
          <StatCard icon={CheckCircle} title="Approved" value="0" />
          <StatCard icon={Wallet} title="Amount" value={`₹${card.amount}`} />
          <StatCard icon={Clock} title="Status" value={card.status} />
        </div>

        {/* Goals */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-1">Goals</h3>
          <p className="text-sm">➤ {card.goal}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap
                ${activeTab === tab ? "bg-yellow-50 shadow" : "text-blue-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-1">
          {activeTab === "Payouts" && (
            <Box>
              • Earn ₹{card.earn} on successful investment
              <br />• Payout credited within 7 working days
              <br />• Invalid transactions are rejected
            </Box>
          )}

          {activeTab === "Guide" && (
            <Box>
              • Choose investment plan
              <br />• Complete KYC
              <br />• Amount gets invested
            </Box>
          )}

          {activeTab === "Eligibility & Documents" && (
            <Box>
              • PAN Card required
              <br />• Aadhaar linked mobile number
              <br />• Age 18+
            </Box>
          )}

          {activeTab === "Product Details" && (
            <Box>
              <p>• Welcome gifts on delivery</p>
              <p>• Airport lounge access</p>
              <p>• Fuel surcharge waiver</p>
              <p>• Annual fee waiver</p>
              <p>• Paperless process</p>
            </Box>
          )}
        </div>

        {/* Share Button */}
        <button className="mt-6 w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg font-semibold">
          SHARE
        </button>

      </div>
    </div>
  );
};

export default BusinessLoanDetails;
