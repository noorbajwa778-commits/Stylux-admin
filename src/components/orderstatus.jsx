import { orders } from "../data/orders.js";

const statusConfig = [
  { key: "pending", label: "Pending", barColor: "bg-status-pending-text" },
  { key: "approved", label: "Approved", barColor: "bg-status-approved-text" },
  { key: "completed", label: "Completed", barColor: "bg-status-completed-text" },
  { key: "cancelled", label: "Cancelled", barColor: "bg-status-cancelled-text" },
];

export default function OrderStatusSummary() {
  const total = orders.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full md:w-80">
      <h2 className="font-semibold text-gray-800 mb-4">Order Status</h2>

      <div className="space-y-4">
        {statusConfig.map((status) => {
          const count = orders.filter((o) => o.status === status.key).length;
          const percent = total === 0 ? 0 : Math.round((count / total) * 100);

          return (
            <div key={status.key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{status.label}</span>
                <span className="text-sm font-medium text-gray-800">{count}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div
                  className={`h-2 rounded-full ${status.barColor}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}