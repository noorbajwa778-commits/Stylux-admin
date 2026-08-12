import { useState } from "react";
import Header from "../components/header.jsx";
import { users } from "../data/users.js";
import { NotepadText, Search } from "lucide-react";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header title="Users" subtitle="View all registered clients" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          {/* Search bar */}
          <div className="mb-4">
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
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-50">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white text-xs font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{user.email}</td>
                  <td className="py-3 text-gray-600">{user.phone}</td>
                  <td className="py-3 text-gray-600">{user.joinedDate}</td>
                  <td className="py-3 text-gray-600">{user.totalBookings}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No users match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}