import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabase.js";
import { setUser, setName, setRole } from "../redux/redux/Slices/HomeDataSlice.js";
import {
  Scissors,
  LayoutDashboard,
  Store,
  CalendarCheck,
  Users,
  Star,
  Settings,
  LogOut,
  UserCheck,
  Bell,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Salon Requests", path: "/requests", icon: UserCheck },
  { name: "Salons", path: "/salons", icon: Store },
  { name: "Appointments", path: "/appointments", icon: CalendarCheck },
  { name: "Users", path: "/users", icon: Users },
  { name: "Reviews", path: "/reviews", icon: Star },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-purple flex items-center justify-center">
          <Scissors className="text-white" size={20} />
        </div>
        <div>
          <h1 className="font-serif text-xl font-bold text-gray-800 leading-tight">
            Stylux
          </h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-pink to-purple text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {item.name}
              </span>
              {item.name === "Notifications" && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}