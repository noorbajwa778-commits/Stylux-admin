const statusStyles = {
  pending: "bg-status-pending-bg text-status-pending-text",
  approved: "bg-status-approved-bg text-status-approved-text",
  completed: "bg-status-completed-bg text-status-completed-text",
  cancelled: "bg-status-cancelled-bg text-status-cancelled-text",
  rejected: "bg-status-cancelled-bg text-status-cancelled-text",
  active: "bg-status-active-bg text-status-active-text",
  suspended: "bg-status-suspended-bg text-status-suspended-text",
  upcoming: "bg-blue-50 text-blue-700",
};

export default function StatusBadge({ status }) {
  const key = (status || "").toLowerCase();
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
        statusStyles[key] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "—"}
    </span>
  );
}