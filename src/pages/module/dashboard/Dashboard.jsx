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
  Hourglass, 
  LayoutDashboard,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { NavLink } from "react-router-dom";

const cards = [
  { 
    title: "Total Agents", 
    icon: Users, 
    value: "1,234",
    change: "+12%",
    color: "from-orange-500 to-orange-400"
  },
  { 
    title: "Active Agents", 
    icon: UserCheck, 
    value: "987",
    change: "+8%",
    color: "from-green-500 to-green-400"
  },
  { 
    title: "Inactive Agents", 
    icon: UserX, 
    value: "247",
    change: "-3%",
    color: "from-red-500 to-red-400"
  },
  { 
    title: "Total Leads", 
    icon: ClipboardList, 
    value: "4,567",
    change: "+24%",
    color: "from-blue-500 to-blue-400"
  },
  { 
    title: "Approved Leads", 
    icon: CheckCircle, 
    value: "3,210",
    change: "+18%",
    color: "from-emerald-500 to-emerald-400"
  },
  { 
    title: "Pending Leads", 
    icon: Clock, 
    value: "856",
    change: "-5%",
    color: "from-amber-500 to-amber-400"
  },
  { 
    title: "Rejected Leads", 
    icon: XCircle, 
    value: "501",
    change: "+2%",
    color: "from-rose-500 to-rose-400"
  },
  { 
    title: "Commission Generated", 
    icon: IndianRupee, 
    value: "₹2.4L",
    change: "+32%",
    color: "from-violet-500 to-violet-400"
  },
  { 
    title: "Payouts Released", 
    icon: Wallet, 
    value: "₹1.8L",
    change: "+15%",
    color: "from-cyan-500 to-cyan-400"
  },
  { 
    title: "Pending Payout", 
    icon: Hourglass, 
    value: "₹65K",
    change: "-8%",
    color: "from-orange-500 to-amber-400"
  },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Page Heading */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7" />
              Dashboard Overview
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span className="bg-white/20 px-3 py-1 rounded-lg">Home</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Dashboard Analytics</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-white text-sm">Last updated: Today, 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-orange-700">247</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Growth</p>
              <p className="text-2xl font-bold text-blue-700">+24.5%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-emerald-700">68.3%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((item, index) => {
          const Icon = item.icon;
          const isPositive = item.change.startsWith('+');

          return (
            <div
              key={index}
              className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon with Gradient */}
              <div className="relative mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                {/* Trend Indicator */}
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-lg text-xs font-bold ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {item.change}
                </div>
              </div>

              {/* Title and Value */}
              <div className="mb-3">
                <h2 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h2>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                <div 
                  className={`h-1.5 rounded-full ${isPositive ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(parseInt(item.change)) * 3, 100)}%` }}
                ></div>
              </div>

              {/* View Details Link */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">View details</span>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">Need more insights?</h3>
            <p className="text-gray-600 text-sm">Explore detailed reports and analytics</p>
          </div>
          <NavLink
            to="/reportanalysis"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            View Full Reports
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;