import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import {
  getClientName,
  getSalonName,
  getServiceName,
} from "../redux/redux/Slices/AdminDataSlice.js";
import { Search } from "lucide-react";

const statusFilters = ["all", "upcoming", "completed", "cancelled"];

export default function Appointments() {
  const appointments = useSelector((state) => state.adminData.appointments);
  const clients = useSelector((state) => state.adminData.clients);
  const services = useSelector((state) => state.adminData.services);
  const salons = useSelector((state) => state.salons.salons);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const rows = appointments.map((a) => ({
    ...a,
    clientName: getClientName(clients, a.client_id),
    salonName: getSalonName(salons, a.salon_id),
    serviceName: getServiceName(services, a.service_id),
  }));

  const filteredAppointments = rows.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      r.clientName.toLowerCase().includes(term) ||
      r.salonName.toLowerCase().includes(term);
    const matchesStatus =
      statusFilter === "all" || (r.status || "").toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Header title="Appointments" subtitle="View all bookings across salons" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
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

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Salon</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((r) => (
                <tr key={r.id} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-800">{r.clientName}</td>
                  <td className="py-3 text-gray-600">{r.salonName}</td>
                  <td className="py-3 text-gray-600">{r.serviceName}</td>
                  <td className="py-3 text-gray-600">{r.date}</td>
                  <td className="py-3 text-gray-600">{r.time}</td>
                  <td className="py-3 text-gray-600">
                    Rs {Number(r.amount || 0).toLocaleString()}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No appointments found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}