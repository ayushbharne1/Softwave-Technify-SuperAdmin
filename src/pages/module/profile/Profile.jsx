import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Plus, X, Edit } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [mode, setMode] = useState("create");
  const [editId, setEditId] = useState(null);

  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "Sub Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      role: "Manager",
      status: "Inactive",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE
  const handleCreateSubAdmin = () => {
    if (!formData.name || !formData.email || !formData.role) return;

    const newAdmin = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
    };

    setSubAdmins([...subAdmins, newAdmin]);
    resetForm();
  };

  // EDIT CLICK
  const handleEditClick = (admin) => {
    setMode("edit");
    setEditId(admin.id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
    });
    setOpenModal(true);
  };

  // UPDATE
  const handleUpdateSubAdmin = () => {
    setSubAdmins(
      subAdmins.map((admin) =>
        admin.id === editId
          ? {
            ...admin,
            name: formData.name,
            email: formData.email,
            role: formData.role,
          }
          : admin
      )
    );
    resetForm();
  };

  // 🔥 STATUS TOGGLE
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

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "" });
    setMode("create");
    setEditId(null);
    setOpenModal(false);
  };

  return (
    <div className="mt-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <span>Profile</span>
        </div>
      </div>

      {/* PROFILE CARD */}

      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
            alt="profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Lokesh Khetade
              </h2>
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-5 py-2 rounded-lg border border-blue-400 text-blue-500"
              >
                Edit Profile
              </button>
            </div>

            <hr className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Phone No.</p>
                <p className="text-blue-600">+91 9970365262</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-blue-600">lokeshkhetade@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="text-blue-600">********</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-10 py-3 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      text-white rounded-lg"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
