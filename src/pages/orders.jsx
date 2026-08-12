import { useState } from "react";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import { orders } from "../data/orders.js";
import { Search } from "lucide-react";

const statusFilters = ["all", "pending", "approved", "completed", "cancelled"];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.salonName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Header title="Orders" subtitle="View and manage all bookings" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          {/* Search + filter bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="relative w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search client or salon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <div className="flex gap-2">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition ${
                    statusFilter === status
                      ? "bg-gradient-to-r from-pink to-purple text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Salon</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-800">
                    {order.clientName}
                  </td>
                  <td className="py-3 text-gray-600">{order.salonName}</td>
                  <td className="py-3 text-gray-600">{order.service}</td>
                  <td className="py-3 text-gray-600">{order.date}</td>
                  <td className="py-3 text-gray-600">
                    Rs {order.price.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No orders match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}