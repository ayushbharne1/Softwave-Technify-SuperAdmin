import { useNavigate, NavLink } from "react-router-dom";
import zypeLogo from "../../../../assets/instantload/zype.png";
import { LayoutDashboard } from "lucide-react";

const InstantAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 mt-3 ">
      {/* Header */}
      <div className=" mb-5 mt-6">
        <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
          <h1 className="text-xl font-semibold text-white">Instant Loan</h1>

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

            <span>Instant Loan</span>
          </div>
        </div>

      </div>

      <div className="bg-gray-200 text-center py-2 text-lg rounded mb-4">
        Live Projects: 1
      </div>

      {/* 🔥 Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card */}
        <div
          onClick={() => navigate("/project/instant-loan/zype")}
          className="bg-white rounded-xl p-4 shadow cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={zypeLogo}
                alt="Zype"
                className="w-10 h-10 object-contain"
              />
              <h2 className="font-semibold">Zype Instant Loan</h2>
            </div>

            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <ul className="text-blue-600 text-sm mt-3 space-y-1">
            <li>• Credit Line upto 5 lacs</li>
            <li>• Take instant loan directly from zype app</li>
          </ul>

          <div className="bg-blue-50 mt-3 p-3 rounded flex justify-between">
            <span>Loan Disbursement</span>
            <span className="text-blue-600 font-semibold">Earn 3.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantAccount;
