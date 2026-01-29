import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

import angelone from "../../../../assets/demat/angelone.png";
import bajaj from "../../../../assets/demat/bajaj.png";
import motilal from "../../../../assets/demat/motilal.png";
import upstox from "../../../../assets/demat/upstox.png";
import paisa from "../../../../assets/demat/5paisa.jpg";
import appreciate from "../../../../assets/demat/appreciate.png";
import paytm from "../../../../assets/demat/paytm.png";
import mstox from "../../../../assets/demat/mstox.jpg";
import stoxkart from "../../../../assets/demat/stoxkart.png";

const dematCards = [
  {
    id: 1,
    name: "AngelOne Demat Account",
    logo: angelone,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Completely digital account opening",
      "Lifetime free equity delivery trading",
    ],
    earn: 275,
  },
  {
    id: 2,
    name: "Bajaj Financial Securities Demat",
    logo: bajaj,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Free equity delivery for lifetime",
      "Daily researched recommendations",
    ],
    earn: 100,
  },
  {
    id: 3,
    name: "Motilal Oswal Demat Account",
    logo: motilal,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Zero Account Opening Charges",
      "Free AMC for 1st year",
    ],
    earn: 150,
  },
  {
    id: 4,
    name: "Upstox App Demat Account",
    logo: upstox,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "One Platform, Multiple Choices!",
      "0 AMC & charges* on Mutual Funds and IPO",
    ],
    earn: 300,
  },
  {
    id: 5,
    name: "5Paisa Demat Account",
    logo: paisa,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Open Free Demat Account in less than 5 minutes",
      "Zero percentage brokerage with flat Rs.20 per order",
    ],
    earn: 300,
  },
  {
    id: 6,
    name: "Appreciate Wealth Account",
    logo: appreciate,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Full digital onboarding and remittance process",
      "Invest in global markets with a single click",
    ],
    earn: 200,
  },
  {
    id: 7,
    name: "Paytm Money Demat Account",
    logo: paytm,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Complete digital process",
      "Low brokerage charges of Rs.20",
    ],
    earn: 300,
  },
  {
    id: 8,
    name: "Stoxkart Demat Account",
    logo: stoxkart,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Zero Brokerage @ Rs.99/month",
      "Unlimited free trades",
    ],
    earn: 275,
  },
  {
    id: 9,
    name: "mStock Demat Account",
    logo: mstox,
    status: "Hold",
    statusColor: "bg-red-500",
    points: [
      "Lifetime 0 brokerage @ Rs.999 one-time",
      "Margin trading facility available",
    ],
    earn: 300,
  },
];

const Demataccount = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-100 min-h-screen mt-6">
      {/* 🔹 HEADER */}

      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">Demat Account</h1>

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

            <span>Demat Account</span>
          </div>
        </div>

      </div>

      <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {dematCards.length}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dematCards.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              navigate(`/project/demat/${card.id}`, { state: card })
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

export default Demataccount;
