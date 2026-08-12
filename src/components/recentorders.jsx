import StatusBadge from "./statusbadge.jsx";
import { orders } from "../data/orders.js";

export default function RecentOrders() {
  const recent = orders.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Recent Orders</h2>
        <button className="text-sm text-purple font-medium">View all</button>
      </div>

      <div className="space-y-3">
        {recent.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-xs font-semibold">
                {order.clientInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {order.clientName}
                </p>
                <p className="text-xs text-gray-500">
                  {order.service} · {order.salonName}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                Rs {order.price.toLocaleString()}
              </p>
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}