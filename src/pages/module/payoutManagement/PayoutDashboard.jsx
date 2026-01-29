import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayoutDashboard } from "../../../redux/slice/payoutDashboard/payDashboardSlice";
// import LoaderSpinner from "../../../components/uiElement/LoaderSpinner";
const PayoutDashboard = () => {
  const dispatch = useDispatch();

  const { dashboard } = useSelector(
    (state) => state.payoutDashboard
  );

  useEffect(() => {
    console.log("dashboard api fetching....")
    dispatch(fetchPayoutDashboard());
  }, [dispatch]);


  const stats = [
    { title: "Eligible Agents", value: dashboard?.eligibleAgents ?? 0 },
    { title: "Pending Payouts", value: dashboard?.pendingPayouts ?? 0 },
    { title: "Paid This Month", value: dashboard?.totalPaidThisMonth ?? "₹0" },
    { title: "Total Payouts", value: dashboard?.totalPaidTillDate ?? "₹0" },
  ];

  return (
    <div className="bg-white p-5 mt-5 rounded-2xl">
      <h2 className=" font-semibold mb-4 ">Payout Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {stats.map((item, i) => (
          <div key={i} className="rounded-xl p-5 shadow bg-blue-50">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutDashboard;





