import { Bell, LogOut, User, ChevronDown, Menu, Home } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = ({ onToggle }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 right-0 w-[82vw] h-16 bg-linear-to-r from-orange-50 to-white text-gray-800 flex items-center justify-between px-6 z-50 border-b border-orange-200 shadow-lg">

      {/* Left Section - Breadcrumb & Title */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onToggle} 
          className="md:hidden p-2.5 rounded-lg bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <NavLink to="/dashboard" className="flex items-center gap-1 text-orange-500 hover:text-orange-600">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 font-medium">Admin Panel</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>

        {/* Notification */}
        <div className="relative group">
          <div className="relative p-2.5 rounded-full bg-linear-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 cursor-pointer border border-orange-200 shadow-sm hover:shadow-md">
            <Bell className="w-5 h-5 text-orange-600 group-hover:text-orange-700 group-hover:scale-110 transition-all duration-300" />
            
            {/* Notification Badge */}
            {notifications > 0 && (
              <>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md animate-pulse">
                  {notifications}
                </span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400/50 rounded-full animate-ping"></div>
              </>
            )}
          </div>
          
          {/* Notification Tooltip */}
          <div className="absolute right-0 top-12 w-56 bg-white text-gray-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-orange-200">
            <div className="p-4 border-b border-orange-100">
              <p className="text-sm font-semibold text-orange-600 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications ({notifications})
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {notifications > 0 ? (
                  <>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New Lead Added</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Commission Processed</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Pill */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer group relative"
        >
          {/* Animated Background Ring */}
          <div className="absolute inset-0 bg-linear-to-r from-orange-400/20 via-orange-300/10 to-orange-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-500"></div>
          
          {/* Profile Content */}
          <div className="relative flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-orange-200 group-hover:border-orange-400  transition-all duration-300">
            {/* Profile Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
                className="w-9 h-9 rounded-full object-cover border-2 border-orange-400 group-hover:border-orange-500 transition-all duration-300 shadow-sm"
                alt="profile"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div className="hidden md:block text-right">
              <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                Lokesh Sharma
              </span>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>

            {/* Animated Arrow */}
            <ChevronDown 
              className={`w-4 h-4 text-orange-500 group-hover:text-orange-600 transition-all duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-12 w-56 bg-white text-gray-700 rounded-xl shadow-2xl overflow-hidden border border-orange-200 z-50 animate-in slide-in-from-top-5 duration-300">
              {/* Header */}
              <div className="p-4 bg-linear-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
                      className="w-12 h-12 rounded-full object-cover border-3 border-orange-400"
                      alt="profile"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Lokesh Sharma</p>
                    <p className="text-xs text-orange-600 font-medium">Super Admin</p>
                    <p className="text-xs text-gray-500 mt-1">admin@softwave.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-3 space-y-1">
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-linear-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-200 group"
                >
                  <div className="p-1.5 rounded-lg bg-orange-100 group-hover:bg-orange-200">
                    <User className="w-4 h-4 text-orange-600" />
                  </div>
                  <span>My Profile</span>
                </NavLink>

                <NavLink
                  to="/setting"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group"
                >
                  <div className="p-1.5 rounded-lg bg-blue-100 group-hover:bg-blue-200">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">⚙️</span>
                    </div>
                  </div>
                  <span>Settings</span>
                </NavLink>

                <div className="h-px bg-linear-to-r from-transparent via-orange-200 to-transparent my-2"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-linear-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 group"
                >
                  <div className="p-1.5 rounded-lg bg-red-100 group-hover:bg-red-200">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Logout</span>
                </button>
              </div>

              {/* Footer */}
              <div className="p-3 bg-linear-to-r from-orange-50 to-white border-t border-orange-200">
                <p className="text-xs text-gray-500 text-center">
                  SoftwaveTechnify • v1.0
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;