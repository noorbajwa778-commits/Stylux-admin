import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StatusBadge from "./statusbadge.jsx";
import {
  getClientName,
  getSalonName,
  getServiceName,
  getInitials,
} from "../redux/redux/Slices/AdminDataSlice.js";

export default function RecentAppointments() {
  const appointments = useSelector((state) => state.adminData.appointments);
  const clients = useSelector((state) => state.adminData.clients);
  const services = useSelector((state) => state.adminData.services);
  const salons = useSelector((state) => state.salons.salons);

  const recent = appointments.slice(-5).reverse();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Recent Appointments</h2>
        <Link to="/appointments" className="text-sm text-purple font-medium">
          View all
        </Link>
      </div>

      {recent.length === 0 && (
        <p className="text-sm text-gray-400 py-6 text-center">No appointments yet.</p>
      )}

      <div className="space-y-3">
        {recent.map((a) => {
          const clientName = getClientName(clients, a.client_id);
          return (
            <div key={a.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-xs font-semibold">
                  {getInitials(clientName)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{clientName}</p>
                  <p className="text-xs text-gray-500">
                    {getServiceName(services, a.service_id)} ·{" "}
                    {getSalonName(salons, a.salon_id)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  Rs {Number(a.amount || 0).toLocaleString()}
                </p>
                <StatusBadge status={a.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}