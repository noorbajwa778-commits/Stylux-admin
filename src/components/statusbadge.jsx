const statusStyles = {
  pending: "bg-status-pending-bg text-status-pending-text",
  approved: "bg-status-approved-bg text-status-approved-text",
  completed: "bg-status-completed-bg text-status-completed-text",
  cancelled: "bg-status-cancelled-bg text-status-cancelled-text",
  active: "bg-status-active-bg text-status-active-text",
  suspended: "bg-status-suspended-bg text-status-suspended-text",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}