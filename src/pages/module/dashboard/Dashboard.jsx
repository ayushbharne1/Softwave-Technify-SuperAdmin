import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  ClipboardList,
  CheckCircle,
  Clock,
  XCircle,
  IndianRupee,
  Wallet,
  Hourglass, LayoutDashboard
} from "lucide-react";
import { NavLink } from "react-router-dom";

const cards = [
  { title: "Total Agents", icon: Users },
  { title: "Active Agents", icon: UserCheck },
  { title: "Inactive Agents", icon: UserX },
  { title: "Total Leads", icon: ClipboardList },
  { title: "Approved Leads", icon: CheckCircle },
  { title: "Pending Leads", icon: Clock },
  { title: "Rejected Leads", icon: XCircle },
  { title: "Total Commission Generated", icon: IndianRupee },
  { title: "Total Payouts Released", icon: Wallet },
  { title: "Pending Payout Amount", icon: Hourglass },
];


const Dashboard = () => {
  return (
    <div>
      {/* Page Heading */}


      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-8 mt-6">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>

          <span>&gt;</span>

          <span>Dashboard</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group bg-white rounded-2xl p-6
                bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-4
              cursor-pointer transition-all duration-300
              hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50
              "
            >
              {/* Icon */}
              <div
                className="
                  w-16 h-16 mb-4
                  flex items-center justify-center
                  rounded-full bg-blue-100
                  transition-all duration-300
                  group-hover:bg-blue-600
                "
              >
                <Icon
                  className="
                    w-8 h-8 text-blue-600
                    transition-all duration-300
                    group-hover:text-white
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Title */}
              <h2
                className="
                  text-base font-semibold text-gray-800
                  transition-colors duration-300
                  group-hover:text-blue-700
                "
              >
                {item.title}
                <span className="text-lg font-bold text-gray-600 mt-1"> : 0</span>
              </h2>
              {/* Placeholder Zero */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
