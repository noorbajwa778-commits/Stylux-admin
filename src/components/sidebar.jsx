import { NavLink, useNavigate } from "react-router-dom";
import {
  Scissors,
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
  UserCheck,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Salon Requests", path: "/requests", icon: UserCheck },
  { name: "Salons", path: "/salons", icon: Store },
  { name: "Orders", path: "/orders", icon: ShoppingBag },
  { name: "Users", path: "/users", icon: Users },
  { name: "Reviews", path: "/reviews", icon: Star },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("stylux-admin-logged-in");
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
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

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-pink to-purple text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
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