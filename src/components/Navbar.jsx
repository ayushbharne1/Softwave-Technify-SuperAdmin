import { Bell, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = ({ onToggle }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
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
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white flex items-center justify-between px-4 md:ml-64 z-50">

      {/* Sidebar Toggle */}
      <button onClick={onToggle} className="md:hidden text-2xl">
        ☰
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <NavLink to="/notifications">
            <Bell className="w-5 h-5 text-white" />
          </NavLink>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile Pill*/}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center  ring-1 ring-blue-800 gap-2 cursor-pointer
                     bg-[#00112252] px-3 py-1.5 rounded-full shadow-sm
                     hover:shadow-md transition"
        >
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />

          <span className="hidden md:block text-sm font-medium text-white">
            Lokesh
          </span>

          {/* Arrow */}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden">
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <User className="w-4 h-4" />
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
