import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Settings, LogOut } from "lucide-react";

const sampleNotifications = [
  { id: 1, text: "New order from Ayesha Tariq", time: "5 min ago" },
  { id: 2, text: "Sania Hassan Makeover awaiting approval", time: "1 hour ago" },
  { id: 3, text: "New 1-star review on Jugnus", time: "3 hours ago" },
];

export default function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("stylux-admin-logged-in");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm w-56 focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center"
          >
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 z-50">
              <p className="text-sm font-semibold text-gray-800 px-2 pb-2">
                Notifications
              </p>
              {sampleNotifications.map((note) => (
                <div
                  key={note.id}
                  className="px-2 py-2 rounded-xl hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-700">{note.text}</p>
                  <p className="text-xs text-gray-400">{note.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-sm font-semibold"
          >
            A
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 z-50">
              <p className="text-sm font-medium text-gray-800 px-3 py-2">
                Admin
              </p>
              <p className="text-xs text-gray-400 px-3 pb-2 -mt-1">
                admin@stylux.com
              </p>
              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                <Settings size={15} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}