import { useSelector, useDispatch } from "react-redux";
import {
  approveSalonInDB,
  rejectSalonInDB,
} from "../redux/redux/Slices/SalonsSlice.js";
import { getInitials } from "../redux/redux/Slices/AdminDataSlice.js";

export default function PendingApprovals() {
  const salons = useSelector((state) => state.salons.salons);
  const dispatch = useDispatch();
  const pending = salons.filter((s) => s.account_status === "Pending");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full md:w-80">
      <h2 className="font-semibold text-gray-800 mb-4">Pending Approvals</h2>

      {pending.length === 0 && (
        <p className="text-sm text-gray-400">No pending approvals.</p>
      )}

      <div className="space-y-4">
        {pending.map((salon) => (
          <div key={salon.id} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white text-xs font-semibold">
                {getInitials(salon.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {salon.name || "Unnamed salon"}
                </p>
                <p className="text-xs text-gray-500 truncate">{salon.email}</p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => dispatch(approveSalonInDB(salon.id))}
                className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink to-purple text-white font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => dispatch(rejectSalonInDB(salon.id))}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}