import React, { useState } from "react";
import {
  LayoutDashboard,
  CheckCircle,
  Wallet,
  Clock,
  MapPin,
} from "lucide-react";
import { useLocation, useNavigate, NavLink, useParams } from "react-router-dom";

const tabs = [
  { key: "Payouts", label: "Payouts" },
  { key: "Guide", label: "Guide" },
  { key: "Eligibility & Documents", label: "Eligibility & Documents" },
  { key: "Product Details", label: "Product Details" },
];

const BusinessCardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: card } = useLocation();
  const [activeTab, setActiveTab] = useState("Payouts");

  const [openPincode, setOpenPincode] = useState(false);
  const [pincode, setPincode] = useState("");

  if (!card) {
    return (
      <div className="p-4">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p className="mt-4 text-red-500">
          No data found for Business Account ID: {id}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER (UNCHANGED) */}
      <div className="mt-6">
        <div className="mb-5 mt-6">
          <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
            <h1 className="text-xl font-semibold text-white">
              Business Account Details
            </h1>

            <div className="text-[15px] text-white flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="hover:text-blue-600">
                <LayoutDashboard size={16} />
              </NavLink>

              <span>&gt;</span>

              <NavLink to="/projects" className="hover:text-blue-600">
                Project
              </NavLink>

              <span>&gt;</span>

              <NavLink
                to="/project/business-account"
                className="hover:text-blue-600"
              >
                Business Account
              </NavLink>

              <span>&gt;</span>
              <span>Business Account Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 WHITE WRAPPER START (BANK LOGO → SHARE BUTTON) */}
      <div className="bg-white rounded-xl p-4 mb-4">

        {/* BANK LOGO */}
        <div className="flex items-center gap-3">
          <img src={card.logo} alt="logo" className="w-13 h-13 object-cover" />
          <div>
            <p className="text-sm text-gray-500">{card.name}</p>
            <h1 className="text-lg font-semibold">Business Account</h1>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-3 flex gap-3">
          <Stat icon={<CheckCircle size={28} />} label="Approved" value="0" />
          <Stat icon={<Wallet size={28} />} label="Paid" value="₹0.0" />
          <Stat icon={<Clock size={28} />} label="Pending" value="₹0.0" />
        </div>

        {/* GOALS */}
        <div className="mt-4 bg-blue-50 rounded p-3">
          <p className="font-medium">Goals</p>
          {card.goals.map((g, i) => (
            <p key={i} className="text-sm">
              ➤ {g.title}
            </p>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === t.key ? "bg-yellow-50 shadow" : "text-blue-600"
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
              <p>1. Earn ₹350 for funded account within 7 days</p>
              <p>2. Ensure ₹50 is added within 7 days</p>
              <p>
                3. Referral Code: <b>INDIA100</b>
              </p>
              <p>4. Fraud will freeze payout</p>
            </>
          )}

          {activeTab === "Guide" && (
            <>
              <p>1. Agent shares link with customer</p>
              <p>2. Customer opens free account</p>
              <p>3. Fill PAN, occupation, email</p>
              <p>4. Provide Aadhaar address</p>
            </>
          )}

          {activeTab === "Eligibility & Documents" && (
            <>
              <p>• Age above 18</p>
              <p>• Aadhaar linked to mobile</p>
              <p>• Indian citizen</p>
              <p>• Valid PAN</p>

              <p className="mt-2 font-medium">Documents</p>
              <p>• Aadhaar Card</p>
              <p>• PAN Card</p>
            </>
          )}

          {activeTab === "Product Details" && (
            <>
              <p>• Business account in minutes</p>
              <p>• Central info management</p>
              <p>• Expense card control</p>
              <p>• High security</p>
              <p>• Fast settlements</p>
            </>
          )}
        </div>

        {/* PINCODE */}
        <div className="bg-white rounded-xl p-3 mt-4 border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} className="text-blue-500" />
              <span>
                Check if business account is serviceable at your pincode
              </span>
            </div>

            <button
              onClick={() => setOpenPincode(!openPincode)}
              className="text-blue-600 font-medium text-sm"
            >
              Check
            </button>
          </div>

          {openPincode && (
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="w-32 border rounded px-3 py-1.5 text-sm outline-none"
              />
              <button
                className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded"
                onClick={() => {
                  console.log("Pincode:", pincode);
                  setOpenPincode(false);
                }}
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* SHARE */}
        <div className="mt-4 pb-4">
          <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg">
            SHARE
          </button>
        </div>
      </div>
      {/* 🔥 WHITE WRAPPER END */}
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default BusinessCardDetails;
