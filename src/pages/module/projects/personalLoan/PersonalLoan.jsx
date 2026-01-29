import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Send } from "lucide-react";
import fibeLogo from "../../../../assets/personalLoan/fibe.jpg";
import herofincorp from "../../../../assets/personalLoan/herofincorp.png"
import incred from "../../../../assets/personalLoan/incred.png"
import olyv from "../../../../assets/personalLoan/olyv.png"
import kissht from "../../../../assets/personalLoan/kissht.jpg"
const PersonalLoan = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      name: "Fibe Personal Loan",
      logo: fibeLogo,
      description: "Complete digital personal loan",
      earn: "2.2",
      status: "Active",
      statusColor: "bg-green-500",
      points: [
        "Get your loan approved instantly!",
        "Enjoy complete digital process",
      ],
      goals: [{ title: "Loan Disbursal", amount: "2.0 %" }],
    },
    {
      id: 2,
      name: "Fibe Instant Loan",
      logo: herofincorp,
      description: "Fast & paperless loan",
      earn: "2.5",
      status: "Active",
      statusColor: "bg-green-500",
      points: [
        "Get quick & easy loans up to Rs.5,00,000",
        "Enjoy collateral-free loans",
      ],
      goals: [{ title: "Loan Disbursal", amount: "2.0 %" }],
    },
    {
      id: 3,
      name: "Kissht Personal Loan",
      logo: kissht,
      description: "Fast & paperless loan",
      earn: "2.0%",
      status: "Active",
      statusColor: "bg-green-500",
      points: [
        "Instant approval with affordable interest rates.",
        "100% digital and paperless process.",
      ],
      goals: [{ title: "Loan Disbusement", amount: "2.0 %" }],
    },
    {
      id: 4,
      name: "InCred Finance Personal Loan",
      logo: incred,
      description: "Fast & paperless loan",
      earn: "2.5 %",
      status: "Active",
      statusColor: "bg-green-500",
      points: [
        "Get Instant Funds with Quick Approval",
        "Minimum documents required",
      ],
      goals: [{ title: "Loan Disbusement", amount: "2.5 %" }],
    },
    {
      id: 5,
      name: "OLYV Personal Loan",
      logo: olyv,
      description: "Fast & paperless loan",
      earn: "2.5 %",
      status: "Active",
      statusColor: "bg-green-500",
      points: [
        "Flexible loan amounts",
        "Competetive Interest Rates",
      ],
      goals: [{ title: "Loan Disbusement", amount: "2.5 %" }],
    },
  ];

  return (
    <div className="mt-6 min-h-screen bg-gray-100">
      {/* TOP HEADER */}
      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">Personal Loan</h1>

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

            <span>Personal Loan</span>
          </div>
        </div>

      </div>

      {/* LIVE PROJECTS */}
      <div className="w-full bg-gray-200 py-3 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {cards.length}
        </h2>
      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              navigate(`/project/personal-loan/${card.id}`, {
                state: card,
              })
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
                className="w-13 h-13 object-contain"
              />
              <h2 className="font-semibold text-gray-800 text-sm">
                {card.name}
              </h2>
            </div>

            {/* Points */}
            <ul className="text-sm text-blue-600 space-y-2 mb-4">
              {card.points.map((point, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>🏷</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Goals */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  Goals
                </span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Earn ₹{card.earn}
                </span>
              </div>

              {card.goals.map((goal, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <Send size={16} />
                    {goal.title}
                  </div>
                  <div className="font-semibold text-yellow-600">
                    ₹ {goal.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalLoan;
