import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

const dummyLeads = [
  { date: "2026-01-10", leads: 10, converted: 5 },
  { date: "2026-01-11", leads: 15, converted: 8 },
  { date: "2026-01-12", leads: 12, converted: 6 },
  { date: "2026-01-13", leads: 20, converted: 12 },
];

const dummyAgents = [
  { name: "Agent A", leads: 20, converted: 12 },
  { name: "Agent B", leads: 15, converted: 7 },
  { name: "Agent C", leads: 25, converted: 18 },
];

const dummyProducts = [
  { name: "Product 1", leads: 30, converted: 20 },
  { name: "Product 2", leads: 25, converted: 15 },
  { name: "Product 3", leads: 20, converted: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ReportsAnalysis = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const printRef = useRef();

  const exportExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };


  return (
    <div className="mt-6 bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-[#0B1C2D] to-[#0E5FD8]
                      rounded-2xl p-6 shadow-lg mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-white">Reports and Analytics</h1>

        <div className="text-[15px] text-white flex items-center gap-2 mt-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={16} />
          </NavLink>

          <span>&gt;</span>

          <NavLink to="/reportanalysis" className="hover:text-blue-600 transition">
            Report and Analytics
          </NavLink>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["leads", "agents", "products"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab
              ? "bg-gradient-to-r from-[#0b1c2df4] to-[#0E5FD8] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
          >
            {tab === "leads"
              ? "Lead Reports"
              : tab === "agents"
                ? "Agent Performance"
                : "Product Conversion"}
          </button>
        ))}
      </div>

      {/* Report Container */}
      <div ref={printRef} className="bg-white rounded-xl shadow p-6 " tabIndex={-1}>
        {activeTab === "leads" && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Daily / Monthly Lead Reports
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={dummyLeads}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                {/* Grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                {/* Axes */}
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af", strokeWidth: 1.5 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af", strokeWidth: 1.5 }}
                  tickLine={false}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  labelStyle={{ fontWeight: "600", color: "#111827" }}
                />

                {/* Leads Line */}
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

                {/* Converted Line */}
                <Line
                  type="monotone"
                  dataKey="converted"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="overflow-x-auto mt-8 p-6  rounded">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-[#1d476e33] sticky top-0 z-10 uppercase">
                  <tr className="text-black uppercase text-xs tracking-wider">
                    {["Date", "Total Leads", "Converted Leads"].map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left text-sm font-medium "
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyLeads.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-6 text-gray-400"
                      >
                        No lead data found
                      </td>
                    </tr>
                  )}

                  {dummyLeads.map((lead) => (
                    <tr key={lead.date}>
                      <td className="px-6 py-4 text-gray-700">{lead.date}</td>

                      <td className="px-6 py-4 text-gray-700">{lead.leads}</td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">
                          {lead.converted}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "agents" && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Agent Performance Reports
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={dummyAgents}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                barCategoryGap="20%"
              >
                {/* Grid */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />

                {/* X Axis */}
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af", strokeWidth: 1.5 }} // bottom border
                  tickLine={false}
                />

                {/* Y Axis → Left Border */}
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af", strokeWidth: 1.5 }} // left border
                  tickLine={false}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                />

                {/* Bars */}
                <Bar
                  dataKey="leads"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  barSize={50}
                />
                <Bar
                  dataKey="converted"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="overflow-x-auto mt-8 bg-white shadow rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0B1C2D] sticky top-0 z-10 uppercase text-blue-100">
                  <tr>
                    {[
                      "Agent Name",
                      "Leads Handled",
                      "Converted Leads",
                      "Conversion Rate",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left text-sm font-medium "
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyAgents.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                      >
                        No agents performance data found
                      </td>
                    </tr>
                  )}

                  {dummyAgents.map((agent) => {
                    const conversionRate = (
                      (agent.converted / agent.leads) *
                      100
                    ).toFixed(1);

                    return (
                      <tr key={agent.name}>
                        <td className="px-6 py-4 text-gray-700">
                          {agent.name}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {agent.leads}
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">
                            {agent.converted}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded text-sm font-semibold bg-green-100 text-green-800">
                            {conversionRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Product-wise Conversion Reports
            </h2>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                  formatter={(value, name) => [`${value} Converted`, name]}
                />

                {/* Pie */}
                <Pie
                  data={dummyProducts}
                  dataKey="converted"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70} // donut effect
                  outerRadius={110}
                  paddingAngle={5}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  isAnimationActive={true}
                >
                  {dummyProducts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                {/* Legend */}
                <Legend
                  verticalAlign="bottom"
                  height={50}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-gray-700 font-medium">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="overflow-x-auto bg-white shadow rounded mt-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0B1C2D] sticky top-0 z-10 uppercase ">
                  <tr>
                    {[
                      "Product Name",
                      "Leads",
                      "Converted",
                      "Conversion Rate",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left text-sm font-medium text-blue-100"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-400"
                      >
                        No product conversion data found
                      </td>
                    </tr>
                  )}

                  {dummyProducts.map((prod) => (
                    <tr key={prod.name}>
                      <td className="px-6 py-4 text-gray-700">{prod.name}</td>

                      <td className="px-6 py-4 text-gray-700">{prod.leads}</td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">
                          {prod.converted}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-sm font-semibold bg-green-100 text-green-800">
                          {((prod.converted / prod.leads) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Export Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() =>
            exportExcel(
              activeTab === "leads"
                ? dummyLeads
                : activeTab === "agents"
                  ? dummyAgents
                  : dummyProducts,
              "Report"
            )
          }
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download Excel Report
        </button>

      </div>
    </div>
  );
};

export default ReportsAnalysis;
