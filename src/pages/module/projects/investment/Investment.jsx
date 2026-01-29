

import { useNavigate, NavLink } from "react-router-dom";
import mutual from "../../../../assets/investment/mutual.jpg";
import stableLogo from "../../../../assets/investment/stablemoney.png";
import { LayoutDashboard } from "lucide-react";

export default function Investment() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      name: "Axis Micro Investment",
      logo: mutual,
      status: "Hold",
      earn: 1000,
      goal: "SIP Investment (₹1000)",
      description: [
        "Low risk with high stability",
        "Multiple options: equity, debt, hybrid, small-cap, mid-cap etc",
      ],
    },
    {
      id: 2,
      name: "Stable Money Fixed Deposit",
      logo: stableLogo,
      status: "Hold",
      earn: 900,
      goal: "Fixed Deposit",
      description: [
        "Interest rates up to 9.10%* p.a.",
        "Multiple banks on a single platform",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-6">
      {/* Header */}
      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">Investment</h1>

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

            <span>Investment</span>
          </div>
        </div>

      </div>


      {/* Live Projects */}
      <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {cards.length}
        </h2>
      </div>

      {/* 🔥 Cards Grid (2 per row) */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              navigate(`/project/investmentdetails/${card.id}`, {
                state: card,
              })
            }
            className="bg-white rounded-xl p-4 shadow cursor-pointer"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src={card.logo}
                  alt={card.name}
                  className="w-13 h-13 object-contain"
                />
                <h2 className="font-semibold">{card.name}</h2>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded ${card.status === "Active"
                  ? "bg-green-500 text-white"
                  : "bg-red-400 text-white"
                  }`}
              >
                {card.status}
              </span>
            </div>

            {/* Description */}
            <ul className="text-blue-600 text-sm mt-3 space-y-1">
              {card.description.map((desc, index) => (
                <li key={index}>• {desc}</li>
              ))}
            </ul>

            {/* Goals + Earn */}
            <div className="bg-blue-50 mt-3 p-3 rounded flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 font-medium">Goals</p>
                <p className="text-sm text-gray-600 mt-1">
                  ➤ {card.goal}
                </p>
              </div>

              <span className="font-semibold text-blue-600 whitespace-nowrap">
                Earn ₹{card.earn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
