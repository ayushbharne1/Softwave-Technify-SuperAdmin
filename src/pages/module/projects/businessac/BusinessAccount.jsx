import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Send } from "lucide-react";
import tideLogo from "../../../../assets/tidebsns.png";

const BusinessAccount = () => {
  const navigate = useNavigate();

  const card = {
    id: 1,
    name: "Tide Business Account",
    logo: tideLogo,
    description: "Complete digital business account",
    liveProjects: 1,
    earn: 390,
    status: "Active",
    statusColor: "bg-green-500",
    points: [
      "Make payments at all RuPay-accepting merchants",
      "Complete digital onboarding",
    ],
    goals: [
      { title: "Funded Accounts (min Rs 50)", amount: 350 },
      { title: "Bill Payment (min Rs 100)", amount: 40 },
    ],
  };

  return (
    <div className="mt-5 min-h-screen bg-gray-100">
      {/* TOP HEADER */}
      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">Business Account</h1>

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

            <span>Business Account</span>
          </div>
        </div>

      </div>


      {/* LIVE PROJECTS */}
      <div className="w-full bg-gray-200 py-3 rounded-lg mb-3 px-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Live Projects: {card.liveProjects}
        </h2>
      </div>

      {/* CARD GRID (same as credit card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          onClick={() =>
            navigate(`/project/business-account/${card.id}`, {
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
              className="w-13 h-13 object-cover"
            />
            <h2 className="font-semibold text-gray-800 text-sm">
              {card.name}
            </h2>
          </div>

          {/* Points */}
          <ul className="text-sm text-blue-600 space-y-2 mb-4">
            {card.points.map((p, idx) => (
              <li key={idx} className="flex gap-2">
                <span>🏷</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {/* Goals */}
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Goals</span>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Earn Rs{card.earn}.0
              </span>
            </div>

            {card.goals.map((g, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm mb-1"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <Send size={16} />
                  {g.title}
                </div>
                <div className="font-semibold text-yellow-600">
                  ₹ {g.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAccount;
