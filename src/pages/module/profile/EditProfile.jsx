import { useNavigate, NavLink } from "react-router-dom";
import { Upload } from "lucide-react";
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();

  // Profile image state
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
  );

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Edit Profile</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>

          <span>&gt;</span>
          <NavLink
            to="/profile"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <span>Profile</span>
          </NavLink>

          <span>&gt;</span>

          <NavLink to="/categories" className="hover:text-blue-600 transition">
            Edit Profile
          </NavLink>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-8 max-w-full mx-auto">

        {/* Avatar with upload */}
        <div className="flex justify-center mb-10 relative">
          <div className="relative">
            <img
              src={image}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />

            {/* Upload Button */}
            <label className="absolute bottom-1 right-1 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] p-3 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <Upload className="text-white w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-blue-600 font-medium">Full Name</label>
            <input
              defaultValue="Lokesh Khetade"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-600 font-medium">Phone Number</label>
            <input
              defaultValue="9970365262"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-600 font-medium">Email Address</label>
            <input
              defaultValue="lokeshkhetade@gmail.com"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-blue-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
            />
            <p className="text-sm text-gray-400 mt-1">
              Leave empty to keep current password
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => navigate("/profile")}
            className="px-10 py-3 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:text-white from-[#205081] to-[#1a62cf] transition transition-all duration-150 ease-in-out
    hover:shadow-xl
    active:scale-95
    active:shadow-md
    focus:outline-none"
          >
            Cancel
          </button>

          <button
  className="
    px-10 py-3 rounded-lg bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white font-medium
    shadow-lg transition-all duration-150 ease-in-out  hover:shadow-xl active:scale-95 active:shadow-md focus:outline-none
  "
>
  Save Profile
</button>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;
