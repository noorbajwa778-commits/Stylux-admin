
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header.jsx";
import { getInitials, fetchAdminData } from "../redux/redux/Slices/AdminDataSlice.js";
import { fetchSalons } from "../redux/redux/Slices/SalonsSlice.js";
import { supabase } from "../supabase.js";
import { Search, Trash2 } from "lucide-react";

export default function Users() {
  const clients = useSelector((state) => state.adminData.clients);
  const admins = useSelector((state) => state.adminData.admins);
  const salons = useSelector((state) => state.salons.salons);
  const appointments = useSelector((state) => state.adminData.appointments);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [myId, setMyId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Admin apne aap ko delete na kar sake, is liye apni id.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setMyId(data?.user?.id || null);
    });
  }, []);

  const clientRows = clients.map((c) => ({
    id: c.id,
    name: `${c.first_name || ""} ${c.last_name || ""}`.trim() || c.email || "Unnamed client",
    email: c.email,
    phone: c.phno,
    role: "Client",
    bookings: appointments.filter((a) => a.client_id === c.id).length,
  }));

  const salonRows = salons.map((s) => ({
    id: s.id,
    name: s.name || "Unnamed salon",
    email: s.email,
    phone: s.phno,
    role: "Salon",
    bookings: appointments.filter((a) => a.salon_id === s.id).length,
  }));

  const adminRows = admins.map((a) => ({
    id: a.id,
    name: a.name || a.email || "Admin",
    email: a.email,
    phone: "—",
    role: "Admin",
    bookings: "—",
  }));

  const allRows = [...adminRows, ...salonRows, ...clientRows];

  const filteredUsers = allRows.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (u) => {
    const extra =
      u.role === "Salon"
        ? "Its services, staff, portfolio, bookings and reviews will also be deleted."
        : u.role === "Client"
        ? "Their bookings and reviews will also be deleted."
        : "This admin will lose access to the panel.";

    const ok = window.confirm(
      `Delete ${u.role.toLowerCase()} "${u.name}" permanently?\n\n${extra} This cannot be undone.`
    );
    if (!ok) return;

    setDeletingId(u.id);
    const { error } = await supabase.rpc("admin_delete_user", {
      p_user_id: u.id,
    });
    setDeletingId(null);

    if (error) {
      console.log("Delete user error:", error);
      alert("Could not delete user: " + error.message);
      return;
    }

    dispatch(fetchAdminData());
    dispatch(fetchSalons());
  };

  return (
    <div>
      <Header title="Users" subtitle="All registered accounts (admin, salons, clients)" />

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
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <div className="flex gap-2">
              {["all", "Admin", "Salon", "Client"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition ${
                    roleFilter === role
                      ? "bg-gradient-to-r from-pink to-purple text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Bookings</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={`${u.role}-${u.id}`} className="border-b border-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-xs font-semibold">
                        {getInitials(u.name)}
                      </div>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{u.email}</td>
                  <td className="py-3 text-gray-600">{u.phone}</td>
                  <td className="py-3 text-gray-600">{u.role}</td>
                  <td className="py-3 text-gray-600">{u.bookings}</td>
                  <td className="py-3">
                    {u.id === myId ? (
                      <span className="text-xs text-gray-400">You</span>
                    ) : (
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u.id}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 disabled:opacity-50"
                        title="Delete permanently"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}