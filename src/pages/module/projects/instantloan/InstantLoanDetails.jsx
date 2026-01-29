import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle,
  Wallet,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import zypeLogo from "../../../../assets/instantload/zype.png";

const InstantLoanDetails = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("payouts");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">
            Instant Loan Details
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
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <span>Project</span>
            </NavLink>

            <span>&gt;</span>

            <NavLink
              to="/project/instant-loan"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <span>Instant Loan</span>
            </NavLink>

            <span>&gt;</span>

            <span>Instant Loan Details</span>
          </div>
        </div>
      </div>

      {/* ✅ MAIN WHITE CARD (ONLY WRAPPER ADDED) */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img
            src={zypeLogo}
            alt="Zype"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">
              Zype
            </p>
            <h1 className="text-lg font-semibold">
              Instant Loan
            </h1>
          </div>
        </div>

        {/* STATS */}
        <div className="rounded-xl flex gap-3 mt-3">
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
            <CheckCircle className="text-blue-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">
                Approved
              </p>
              <p className="font-semibold">
                0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
            <Wallet className="text-blue-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">
                Paid
              </p>
              <p className="font-semibold">
                ₹0.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 flex-1">
            <Clock className="text-blue-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>
              <p className="font-semibold">
                ₹0.0
              </p>
            </div>
          </div>
        </div>

        {/* GOALS */}
        <div className="mt-4 bg-blue-50 rounded p-3">
          <p className="font-medium">
            Goals
          </p>
          <p className="text-sm">
            ➤ Loan Disbursement
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-4 text-sm overflow-x-auto">
          {[
            { key: "payouts", label: "Payouts" },
            { key: "guide", label: "Guide" },
            { key: "eligibility", label: "Eligibility & Documents" },
            { key: "details", label: "Product Details" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1 rounded whitespace-nowrap ${tab === t.key
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
          {tab === "payouts" && (
            <>
              <p>1. Earn 3% commission on loan disbursement</p>
              <p>2. Only for new Zype customers</p>
              <p>3. Payout in 7 days after tracking</p>
            </>
          )}

          {tab === "guide" && (
            <>
              <p>1. Share Zype app link</p>
              <p>2. Customer registers</p>
              <p>3. Credit line approval</p>
              <p>4. Complete KYC</p>
              <p>5. Select EMI & amount</p>
            </>
          )}

          {tab === "eligibility" && (
            <>
              <p>• Valid Aadhaar & PAN</p>
              <p>• Min salary ₹15000</p>
              <p>• Age 21–55 years</p>
              <p>• No cash salary</p>
              <p className="mt-2 font-medium">
                Documents
              </p>
              <p>• Aadhaar, PAN</p>
              <p>• Bank statement (6 months)</p>
            </>
          )}

          {tab === "details" && (
            <>
              <p>• Instant loan up to ₹5 lacs</p>
              <p>• Flexible EMI plans</p>
              <p>• Min CIBIL 650</p>
              <p>• Utility bill payments</p>
              <p>• Dedicated support</p>
            </>
          )}
        </div>

        {/* SHARE */}
        <div className="mt-5">
          <button className="w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white py-3 rounded-lg">
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstantLoanDetails;
