import { useLocation, useNavigate, useParams, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle,
  Wallet,
  Clock,
  MapPin,
  LayoutDashboard,
} from "lucide-react";

const tabs = [
  { key: "Payouts", label: "Payouts" },
  { key: "Guide", label: "Guide" },
  { key: "Eligibility & Documents", label: "Eligibility & Documents" },
  { key: "Product Details", label: "Product Details" },
];

export default function BNPLdetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // unchanged
  const { state: card } = useLocation();
  const [tab, setTab] = useState("Payouts");

  const [openPincode, setOpenPincode] = useState(false);
  const [pincode, setPincode] = useState("");

  if (!card) return null;

  return (
    <div className="min-h-screen bg-gray-100 mt-6">
      {/* TOP HEADER CARD */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-xl font-semibold text-white">
          BNPL Details
        </h1>

        {/* BREADCRUMB */}
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
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <span>Project</span>
          </NavLink>

          <span>&gt;</span>

          <NavLink
            to="/project/bnpl"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <span>BNPL</span>
          </NavLink>

          <span>&gt;</span>

          <span>
            BNPL Details
          </span>
        </div>
      </div>

      {/* 🔥 MAIN WHITE WRAPPER (FIX) */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img
            src={card.logo}
            alt="logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">{card.name}</p>
            <h1 className="text-lg font-semibold">BNPL</h1>
          </div>
        </div>

        {/* STATS */}
        <div className="flex gap-3">
          <Stat icon={<CheckCircle size={28} />} label="Approved" value="0" />
          <Stat icon={<Wallet size={28} />} label="Paid" value="₹0.0" />
          <Stat icon={<Clock size={28} />} label="Pending" value="₹0.0" />
        </div>

        {/* GOALS */}
        <div className="bg-blue-50 rounded p-3">
          <p className="font-medium">Goals</p>
          <p className="text-sm">➤ {card.goals}</p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 text-sm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded whitespace-nowrap ${tab === t.key
                ? "bg-yellow-50 shadow"
                : "text-blue-600"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-gray-100 rounded-xl p-4 text-sm space-y-2">
          {tab === "Payouts" && (
            <>
              <p>1. Earn ₹{card.earn} for every successful KYC.</p>
              <p>2. Payout will be made in 7 days.</p>
              <p>3. Fraud activity will freeze payout.</p>
              <p>4. Lead tracking up to 7 days.</p>
            </>
          )}

          {tab === "Guide" && (
            <>
              <p>1. Share BNPL link</p>
              <p>2. Customer completes KYC</p>
              <p>3. Approval received</p>
              <p>4. EMI activated</p>
            </>
          )}

          {tab === "Eligibility & Documents" && (
            <>
              <p>• Age 21–55 years</p>
              <p>• Aadhaar & PAN required</p>
              <p>• Income proof mandatory</p>
            </>
          )}

          {tab === "Product Details" && (
            <>
              <p>• Accepted nationwide</p>
              <p>• Zero cost EMI</p>
              <p>• Flexible tenure</p>
              <p>• Digital onboarding</p>
            </>
          )}
        </div>

        {/* PINCODE */}
        <div className="border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} className="text-blue-500" />
              <span>
                Check if BNPL is serviceable at your pincode
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
        <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg font-semibold">
          SHARE
        </button>
      </div>
    </div>
  );
}

/* STAT CARD */
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
