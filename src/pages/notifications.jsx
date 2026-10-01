import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.jsx";
import { markAllRead, clearNotifications } from "../redux/redux/Slices/NotificationsSlice.js";
import { Bell } from "lucide-react";

export default function Notifications() {
  const items = useSelector((state) => state.notifications.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Notifications" subtitle="All admin panel alerts" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => dispatch(markAllRead())}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600"
            >
              Mark all as read
            </button>
            <button
              onClick={() => dispatch(clearNotifications())}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-50 text-red-500"
            >
              Clear all
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="mx-auto text-gray-300 mb-3" size={32} />
              <p className="text-gray-400 text-sm">No notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((n) => (
                <div
                  key={n.id}
                  onClick={() => navigate(n.link || "/requests")}
                  className={`px-4 py-3 rounded-xl cursor-pointer ${
                    n.read ? "bg-white" : "bg-purple/5"
                  } border border-gray-100 hover:bg-gray-50`}
                >
                  <p className="text-sm text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}