import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import {
  setUser,
  setName,
  setRole,
} from "../redux/redux/Slices/HomeDataSlice.js";
import { Search, Bell, Settings, LogOut } from "lucide-react";

export default function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userName = useSelector((state) => state.home.name);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser({}));
    dispatch(setName(""));
    dispatch(setRole(""));
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
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

        <button
          onClick={() => navigate("/notifications")}
          className="relative w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center"
        >
          <Bell size={18} className="text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-sm font-semibold"
          >
            {(userName || "A").charAt(0).toUpperCase()}
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 z-50">
              <p className="text-sm font-medium text-gray-800 px-3 py-2 truncate">
                {userName || "Admin"}
              </p>
              <button
                onClick={() => {
                  navigate("/settings");
                  setShowProfileMenu(false);
                }}
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