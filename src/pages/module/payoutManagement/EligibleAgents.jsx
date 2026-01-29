import { useSelector } from "react-redux";

const EligibleAgents = () => {
  const { agents } = useSelector(
    (state) => state.payoutDashboard
  );

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-4">Eligible Agents</h1>

      <div className="overflow-x-auto shadow-xl rounded ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#1d476e33] sticky top-0 z-10">
            <tr className="text-black uppercase text-xs tracking-wider">
              {["Sr.No", "Agent Name", "Phone", "Last Paid at", "Total Paid"].map(
                (col) => (
                  <th key={col} className="px-6 py-3 text-left text-sm font-medium">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {agents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No eligible agents found
                </td>
              </tr>
            )}

            {agents.map((agent, index) => (
              <tr key={agent._id || index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{agent.agentName}</td>
                <td className="px-6 py-4">{agent.phone}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded text-sm font-semibold">
                    {/* {agent.lastPaidAt} */}
                  {new Date(agent.lastPaidAt).toLocaleDateString()}

                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded text-sm font-semibold">
                    {agent.totalPaid}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EligibleAgents;
