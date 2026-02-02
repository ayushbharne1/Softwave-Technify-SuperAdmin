import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Plus, Edit, Eye } from "lucide-react";
import { useState } from "react";

const SubAdminManagement = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("create");
  const [editId, setEditId] = useState(null);

  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      contact: "9876543210",
      email: "rahul@gmail.com",
      role: "Sub Admin",
      permissions: "View Leads",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      contact: "9123456789",
      email: "neha@gmail.com",
      role: "Manager",
      permissions: "Manage Users",
      status: "Inactive",
    },
  ]);

  // 👁 VIEW CLICK
  const handleViewClick = (admin) => {
    navigate("/subadminmanagement/view-subadmin", {
      state: admin,
    });
  };

  const handleEditClick = (admin) => {
    navigate("/subadminmanagement/update-subadmin", {
      state: admin,
    });
  };
  // STATUS TOGGLE
  const handleToggleStatus = (id) => {
    setSubAdmins(
      subAdmins.map((admin) =>
        admin.id === id
          ? {
            ...admin,
            status: admin.status === "Active" ? "Inactive" : "Active",
          }
          : admin
      )
    );
  };

  // EDIT


  return (
    <div className="mt-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-8 mt-6">
        <h1 className="text-2xl font-semibold text-white">
          Sub-Admin Management
        </h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span>Sub-Admin Management</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Sub Admin List</h2>
          <button
            onClick={() => navigate("/subadminmanagement/add-subadmin")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] text-white rounded-lg"
          >
            <Plus size={16} /> Add Sub Admin
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1d476e33]">
              <tr className="uppercase text-black text-sm ">
                {[
                  "Name",
                  "Contact",
                  "Email",
                  "Role",
                  "Permissions",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-6 py-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {subAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition border-b border-gray-200">
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4">{admin.contact}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.role}</td>
                  <td className="px-6 py-4">{admin.permissions}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <div
                      onClick={() => handleToggleStatus(admin.id)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${admin.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-300"
                        }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${admin.status === "Active"
                          ? "translate-x-6"
                          : "translate-x-0"
                          }`}
                      />
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 flex gap-4">
                    <button onClick={() => handleViewClick(admin)}>
                      <Eye
                        size={18}
                        className="text-gray-600 hover:text-green-600"
                      />
                    </button>

                    <button onClick={() => handleEditClick(admin)}>
                      <Edit
                        onClick={() => handleEditClick(admin)}
                        size={18}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubAdminManagement;
