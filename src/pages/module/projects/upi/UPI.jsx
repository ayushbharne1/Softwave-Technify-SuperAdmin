import React from 'react'
import { LayoutDashboard } from "lucide-react";
import { useNavigate, NavLink } from 'react-router-dom';
const UPI = () => {
  const navigate = useNavigate();
  return (
    <>

      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">UPI</h1>

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

            <span>UPI</span>
          </div>
        </div>

      </div>

      <div className="bg-gray-200 text-center py-2 text-lg rounded mt-5">
        Live Projects: 0
      </div>
    </>
  )
}

export default UPI