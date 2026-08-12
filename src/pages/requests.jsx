import { useNavigate } from "react-router-dom";
import Header from "../components/header.jsx";
import { useSalons } from "../context/salonscontext.jsx";
import { Check, X, Clock } from "lucide-react";

export default function Requests() {
  const navigate = useNavigate();
  const { salons, approveSalon, rejectSalon } = useSalons();

  const pendingRequests = salons.filter((s) => s.status === "pending");

  const handleApprove = (id) => {
    approveSalon(id);
    navigate("/dashboard");
  };

  const handleReject = (id) => {
    rejectSalon(id);
  };

  return (
    <div>
      <Header
        title="Salon Requests"
        subtitle="Review and approve new salon registrations"
      />

      <div className="px-8 pb-8">
        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <Clock className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-gray-500 text-sm">
              No pending requests right now.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((salon) => (
              <div
                key={salon.id}
                className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white font-semibold">
                    {salon.ownerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{salon.name}</p>
                    <p className="text-sm text-gray-500">
                      {salon.ownerName} · {salon.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {salon.category} · {salon.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(salon.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink to-purple text-white text-sm font-medium"
                  >
                    <Check size={15} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(salon.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium"
                  >
                    <X size={15} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}