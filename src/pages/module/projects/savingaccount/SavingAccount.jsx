import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import airtel from "../../../../assets/savings/airtel.jpg"
import equitas from "../../../../assets/savings/equitas.png"
import idfc from "../../../../assets/savings/idfc.png"
import kotak from "../../../../assets/savings/kotak.png"
import axis from "../../../../assets/savings/axixlogo.png"
import industind from "../../../../assets/savings/indusind.webp"
import yesbank from "../../../../assets/savings/yes.png"
import { LayoutDashboard } from "lucide-react";
const savingsAccounts = [
  {
    id: 1,
    name: "Airtel Payments Bank",
    logo: airtel,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Get up to 7% Interest on your Savings",
      "Earn rewards with every transaction",
    ],
    earn: 200,
  },
  {
    id: 2,
    name: "Equitas Small Finance Bank",
    logo: equitas,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Get an interest of 5.25%",
      "Choose account number yourself",
    ],
    earn: 300,
  },
  {
    id: 3,
    name: "IDFC First Bank",
    logo: idfc,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Get up to 7.25% p.a. interest",
      "Zero balance savings account",
    ],
    earn: 700,
  },
  {
    id: 4,
    name: "Kotak 811 Savings Account",
    logo: kotak,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Zero anual charges",
      "Get free virtual debitcard on Kotak811 account",
    ],
    earn: 600.0,
  },
  {
    id: 5,
    name: "Axis Savings Account",
    logo: axis,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Virtual and Physical debit card",
      "Great discounts on online spends",
    ],
    earn: 1000.0,
  },
  {
    id: 6,
    name: "Axis Easy access Savings Account",
    logo: axis,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Complimentary Virtual e-debit card",
      "250+ banking services",
    ],
    earn: 200.0,
  },
  {
    id: 7,
    name: "Industind Bank Savings Account",
    logo: industind,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Complete digital account opening process",
      "Get one of the best interest rates in market",
    ],
    earn: 650.0,
  },
  {
    id: 8,
    name: "Yes Bank Savings Account",
    logo: yesbank,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Completely digital account opening process",
      "Get one of the best interest rates in teh market",
    ],
    earn: 600.0,
  },
];

const SavingAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-xl font-semibold text-white">Saving Account</h1>

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

          <span>Saving Account</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {savingsAccounts.length}
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {savingsAccounts.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              navigate(`/project/savings/${card.id}`, { state: card })
            }
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative cursor-pointer"
          >
            {/* Status */}
            <span
              className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded ${card.statusColor}`}
            >
              {card.status}
            </span>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={card.logo}
                alt={card.name}
                className="w-10 h-10 object-contain"
              />
              <h2 className="font-semibold text-gray-800 text-sm">
                {card.name}
              </h2>
            </div>

            {/* Points */}
            <ul className="text-sm text-blue-600 space-y-2 mb-4">
              {card.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span>✔</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Goals */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-700">
                  Goals
                </span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Earn ₹{card.earn}.0
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Account Opening
                </span>
                <span className="font-semibold text-yellow-600">
                  ₹ {card.earn}.0
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingAccount;
