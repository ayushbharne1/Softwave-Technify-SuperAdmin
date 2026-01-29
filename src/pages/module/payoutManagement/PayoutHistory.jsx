import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayoutHistory } from "../../../redux/slice/payoutDashboard/payoutHistorySlice";
const PayoutHistory = () => {
  const dispatch = useDispatch();

  const { history, loading } = useSelector(
    (state) => state.payoutHistory
  );

  useEffect(() => {
    dispatch(fetchPayoutHistory());
  }, [dispatch]);

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-4">Payout History</h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#1d476e33] sticky top-0 z-10 text-white">
            <tr className="text-black uppercase text-xs tracking-wider">
              {["Sr.No", "Agent Name", "Phone", "Amount", "Paid At"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-sm font-medium"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {!loading && history.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No payout history found
                </td>
              </tr>
            )}

            {history.map((item, index) => (
              <tr key={item._id || index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.agentName}</td>
                <td className="px-6 py-4">{item.agentPhone}</td>
                <td className="px-6 py-4">₹{item.amountPaid}</td>
                <td className="px-6 py-4">
                  {new Date(item.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutHistory;
