
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AgentForm({ form, setForm, onSubmit, title }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Header / Breadcrumb */}
      <div
        className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
        rounded-2xl p-6 shadow-lg mb-6"
      >
        <h1 className="text-xl font-semibold text-white">Add Agents</h1>

        <div className="text-sm text-white flex items-center gap-2 mt-2">
          <NavLink to="/dashboard" className="hover:text-blue-600">
            <LayoutDashboard size={16} />
          </NavLink>
          <span>&gt;</span>
          <NavLink to="/agent" className="hover:text-blue-600">
            Agents Management
          </NavLink>
          <span>&gt;</span>
          <span className="text-blue-600 font-medium">{title}</span>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 text-center">
            {title}
          </h2>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />

            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            />

            <textarea
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="enter only Student"
              value={form.occupation}
              onChange={(e) =>
                setForm({ ...form, occupation: e.target.value })
              }
            />
          </div>

          <button
            onClick={onSubmit}
            className="mt-6 w-full bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
            hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            Save Agent
          </button>
        </div>
      </div>
    </div>
  );
}
