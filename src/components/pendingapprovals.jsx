import { salons } from "../data/salons.js";

export default function PendingApprovals() {
  const pending = salons.filter((s) => s.status === "pending");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full md:w-80">
      <h2 className="font-semibold text-gray-800 mb-4">Pending Approvals</h2>

      {pending.length === 0 && (
        <p className="text-sm text-gray-400">No pending approvals.</p>
      )}

      <div className="space-y-4">
        {pending.map((salon) => (
          <div key={salon.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white text-xs font-semibold">
                {salon.ownerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {salon.ownerName}
                </p>
                <p className="text-xs text-gray-500">{salon.name}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink to-purple text-white font-medium">
                Approve
              </button>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}