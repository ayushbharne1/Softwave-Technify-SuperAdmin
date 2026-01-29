export default function StatusBadge({ status }) {
  const colors = {
    New: "bg-blue-100 text-blue-600",
    Submitted: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
    Paid: "bg-purple-100 text-purple-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
}
