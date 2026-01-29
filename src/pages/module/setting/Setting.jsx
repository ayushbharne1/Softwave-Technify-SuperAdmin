import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { defaultSettingData, getSettings, putSettings } from "../../../redux/slice/setting/settingSlice";
import revenueLogo from "../../../assets/aryoLogo.png";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSettingData, updatedSocialLink, updateField, updateLogo } from "../../../redux/slice/setting/settingSlice";
import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";


export const Setting = () => {

    const dispatch = useDispatch();
    const { data: form, loading, error } = useSelector((state) => state.setting);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(getSettings())
            .unwrap()
            .then((data) => console.log("GET data:", data))
            .catch((err) => console.log("GET err:", err));

    }, [dispatch]);

    const handleChange = (key, value) => {
        dispatch(updateField({ key, value }));
    };

    const handleLogoChange = (value) => {
        dispatch(updateLogo(value));
    }

    const handleSocialChange = (key, value) => {
        if (form?.socialLinks) {
            dispatch(updatedSocialLink({ key, value }));
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form) return toast.error("Form data is missing");
        try {
            const updatedData = await dispatch(putSettings(form)).unwrap();
            dispatch(setSettingData(updatedData));
            toast.success("Settings updated successfully!");
            console.log("PUT Updated data ->", updatedData);
            setEditMode(false);
        } catch (err) {
            console.log("PUT error:", err);
            const msg = err?.message || "Failed to update settings"
            toast.error(msg);
        }
    };

    const handleCancel = () => {
        dispatch(getSettings());
        setEditMode(false);
    }

    const socialIcons = {
        facebook: <FaFacebookF />,
        instagram: <FaInstagram />,
        twitter: <FaTwitter />,
        linkedin: <FaLinkedinIn />,
        youtube: <FaYoutube />
    };

    if (loading) return <div className="text-center mt-10">
        <LoaderSpinner />
    </div>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="min-h-scree">

            <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-white">Website Setting</h1>

                <div className="text-[15px] text-white flex items-center gap-2 mt-2">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-1 hover:text-blue-600 transition"
                    >
                        <LayoutDashboard size={16} />
                    </NavLink>

                    <span>&gt;</span>

                    <NavLink to="/setting" className="hover:text-blue-600 transition">
                        Website Setting
                    </NavLink>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mx-auto text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100">
                    <img
                        src={form.logo?.url || revenueLogo}
                        alt="Logo"
                        className="object-contain w-full h-full" />
                </div>

                <h2 className="mt-4 text-xl font-semibold">{form.websiteName || defaultSettingData.websiteName}</h2>
                <p className="text-gray-500 mt-2">{form.description || defaultSettingData.description}</p>

                {!editMode && (
                    <>
                        <div className="mt-4 space-y-2 text-center text-sm">
                            <p><strong>Email:</strong> {form.contactEmail || defaultSettingData.contactEmail}</p>
                            <p><strong>Phone:</strong> {form.contactPhone || defaultSettingData.contactPhone}</p>
                            <p><strong>About:</strong> {form.aboutUs || defaultSettingData.aboutUs}</p>
                        </div>

                        {/* Social ICONS */}
                        <div className="mt-4 flex justify-center gap-4 text-xl">
                            {Object.entries(form.socialLinks || defaultSettingData.socialLinks).map(([key, url]) => (
                                <a
                                    key={key}
                                    href={url || "#"}
                                    target={url ? "_blank" : "_self"}
                                    rel={url ? "noreferrer" : undefined}
                                    title={key}
                                    className={`text-gray-500 hover:text-[#0E5FDB] transition ${!url ? "cursor-not-allowed opacity-50" : ""}`}
                                >
                                    {socialIcons[key]}
                                </a>
                            ))}
                        </div>


                    </>
                )}

                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="mt-4 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Update Profile
                    </button>
                )}
            </div>

            {/* Edit Form */}
            {editMode && (
                <form
                    onSubmit={handleSave}
                    className="mt-6 mx-auto bg-white rounded-xl shadow-md p-6 space-y-4"
                >
                    <div className="flex flex-col space-y-1">
                        <label>
                            Website Name
                        </label>
                        <input
                            type="text"
                            value={form.websiteName}
                            onChange={(e) => handleChange("websiteName", e.target.value)}
                            placeholder="Website Name"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>
                            Logo URL
                        </label>
                        <input
                            type="text"
                            value={form.logo?.url || ""}
                            onChange={(e) => handleLogoChange(e.target.value)}
                            placeholder="Logo URL"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>
                            Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Description"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.contactEmail}
                            onChange={(e) => handleChange("contactEmail", e.target.value)}
                            placeholder="Contact Email"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>
                            Phone
                        </label>
                        <input
                            type="text"
                            value={form.contactPhone}
                            onChange={(e) => handleChange("contactPhone", e.target.value)}
                            placeholder="Contact Phone"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>
                            About Us
                        </label>
                        <textarea
                            value={form.aboutUs}
                            onChange={(e) => handleChange("aboutUs", e.target.value)}
                            placeholder="About Us"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Social Links</label>
                        {Object.entries(form.socialLinks || defaultSettingData.socialLinks).map(([key, url]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className="capitalize w-17 text-gray-600">{key}:</span>
                                <input
                                    type="text"
                                    value={url}
                                    placeholder={`${key} URL`}
                                    onChange={(e) => handleSocialChange(key, e.target.value)}
                                    className="flex-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
