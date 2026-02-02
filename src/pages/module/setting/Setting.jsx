import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import revenueLogo from "../../../assets/softwaveLogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const Setting = () => {
  const [editMode, setEditMode] = useState(false);

  // ✅ STATIC DATA
  const [form, setForm] = useState({
    websiteName: "SoftwaveTechnify",
    description: "India's trusted Service provider platform",
    contactEmail: "support@softwavetechnify.com",
    contactPhone: "+91 9876543210",
    aboutUs: "We provide best services.",
    logo: {
      url: revenueLogo,
    },
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    },
  });
  const navigate = useNavigate();
 

  const socialIcons = {
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    twitter: <FaTwitter />,
    linkedin: <FaLinkedinIn />,
    youtube: <FaYoutube />,
  };

  return (
    <div className="min-h-screen mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F7941D] to-[#0072BC] rounded-2xl p-6 shadow-lg mb-6">
              <h1 className="text-2xl font-semibold text-white">Setting Management</h1>
      
              <div className="text-sm text-white flex items-center gap-2 mt-2">
                <NavLink to="/dashboard" className="flex items-center gap-1">
                  <LayoutDashboard size={16} />
                </NavLink>
                <span>&gt;</span>
                <span>Setting</span>
              </div>
            </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mx-auto text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100">
          <img
            src={form.logo.url}
            alt="Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          {form.websiteName}
        </h2>
        <p className="text-gray-500 mt-2">{form.description}</p>

        {!editMode && (
          <>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Email:</strong> {form.contactEmail}</p>
              <p><strong>Phone:</strong> {form.contactPhone}</p>
              <p><strong>About:</strong> {form.aboutUs}</p>
            </div>

            {/* Social Icons */}
            <div className="mt-4 flex justify-center gap-4 text-xl">
              {Object.entries(form.socialLinks).map(([key, url]) => (
                <a
                  key={key}
                  href={url || "#"}
                  className={`text-gray-500 hover:text-[#0E5FDB] ${
                    !url ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {socialIcons[key]}
                </a>
              ))}
            </div>
          </>
        )}

        {!editMode && (
          <button
            onClick={()=>{ navigate("/setting/update-setting")}}
            className="mt-4 bg-[#0072BC] text-white px-6 py-2 rounded-lg"
          >
            Update Profile
          </button>
        )}
      </div>
    </div>
  );
};
