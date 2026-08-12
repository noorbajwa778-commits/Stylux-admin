import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import { useSalons } from "../context/salonscontext.jsx";
import { Search, Trash2, Check, X } from "lucide-react";

export default function Salons() {
  const { salons, approveSalon, rejectSalon, deleteSalon, addSalon } = useSalons();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSalon, setNewSalon] = useState({
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    category: "",
  });

  const filteredSalons = salons.filter(function (salon) {
    return salon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = function () {
    deleteSalon(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleAddSalon = function (e) {
    e.preventDefault();
    addSalon(newSalon);
    setNewSalon({
      name: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      category: "",
    });
    setShowAddModal(false);
  };

  return (
    <div>
      <Header title="Salons" subtitle="Manage all registered salons" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search salons..."
                value={searchTerm}
                onChange={function (e) { setSearchTerm(e.target.value); }}
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <button
              onClick={function () { setShowAddModal(true); }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink to-purple text-white text-sm font-medium"
            >
              + Add Salon
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Salon</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Services</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalons.map(function (salon) {
                return (
                  <tr key={salon.id} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-purple">
                      <Link to={"/salons/" + salon.id} className="hover:underline">
                        {salon.name}
                      </Link>
                    </td>
                    <td className="py-3 text-gray-600">{salon.ownerName}</td>
                    <td className="py-3 text-gray-600">{salon.email}</td>
                    <td className="py-3 text-gray-600">{salon.address}</td>
                    <td className="py-3 text-gray-600">{salon.servicesCount}</td>
                    <td className="py-3 text-gray-600">
                      {salon.rating > 0 ? salon.rating : "—"}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={salon.status} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {salon.status === "pending" ? (
                          <>
                            <button
                              onClick={function () { approveSalon(salon.id); }}
                              className="p-1.5 rounded-lg bg-green-50 text-green-600"
                              title="Approve"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              onClick={function () { rejectSalon(salon.id); }}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-500"
                              title="Reject"
                            >
                              <X size={15} />
                            </button>
                          </>
                        ) : null}
                        <button
                          onClick={function () { setDeleteTarget(salon); }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Delete Salon</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete {deleteTarget.name}? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={function () { setDeleteTarget(null); }}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showAddModal ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-gray-800 mb-4">Add New Salon</h3>
            <form onSubmit={handleAddSalon} className="space-y-3">
              <input
                type="text"
                placeholder="Salon name"
                value={newSalon.name}
                onChange={function (e) { setNewSalon({ ...newSalon, name: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />
              <input
                type="text"
                placeholder="Owner name"
                value={newSalon.ownerName}
                onChange={function (e) { setNewSalon({ ...newSalon, ownerName: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newSalon.email}
                onChange={function (e) { setNewSalon({ ...newSalon, email: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newSalon.phone}
                onChange={function (e) { setNewSalon({ ...newSalon, phone: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={newSalon.address}
                onChange={function (e) { setNewSalon({ ...newSalon, address: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />
              <input
                type="text"
                placeholder="Category (e.g. Hair & Beauty)"
                value={newSalon.category}
                onChange={function (e) { setNewSalon({ ...newSalon, category: e.target.value }); }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={function () { setShowAddModal(false); }}
                  className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink to-purple text-white text-sm font-medium"
                >
                  Add Salon
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
