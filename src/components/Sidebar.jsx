import { NavLink } from "react-router-dom";
import {
  Folder,
  Users,
  FileText,
  DollarSign,
  Activity,
  UserCheck,
  UserCog,
  BarChart2,
  LayoutDashboard,
  Settings,
  FileQuestionIcon,
  Landmark,
} from "lucide-react";
import aryoLogo from "../assets/softwaveLogo.png";

const Sidebar = ({ isOpen }) => {
  const linkClass =
    "flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-700";
  const activeClass = "bg-gray-700 text-blue-400";

  return (
    <aside
      className={`fixed top-0 left-0 w-64 bg-gray-900 text-white
      transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300
      md:translate-x-0 z-40
      min-h-screen flex flex-col`}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700 shrink-0 bg-white">
        <img
          src={aryoLogo}
          alt="Aryo Logo"
          className="ml-10 w-28 object-contain"
        />
      </div>

      {/* NAV (SCROLLABLE) */}
      <nav className="flex-1 overflow-y-auto px-4 mt-4 space-y-3 pb-6 rounded ">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Folder size={18} /> Projects
        </NavLink>

          <NavLink
          to="/vendor"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Landmark size={18} />
          Vendor Management
        </NavLink>

        <NavLink
          to="/agent"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Users size={18} /> Agent Management
        </NavLink>

        <NavLink
          to="/leadmanagement"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FileText size={18} /> Lead Management
        </NavLink>

        <NavLink
          to="/commision"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <DollarSign size={18} /> Commision Management
        </NavLink>

        <NavLink
          to="/payout"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Activity size={18} /> Payout Management
        </NavLink>

        <NavLink
          to="/agentkyc"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <UserCheck size={18} />KYC Management
        </NavLink>

        <NavLink
          to="/reportanalysis"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <BarChart2 size={18} /> Report And Analysis
        </NavLink>
        <NavLink
          to="/subadminmanagement"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <UserCog size={18} /> SubAdmin Managment
        </NavLink>
        <NavLink
          to="/faqs"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FileQuestionIcon size={18} /> FaQs
        </NavLink>
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Settings size={18} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
