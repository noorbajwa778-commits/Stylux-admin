import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import {
  fetchSalons,
  approveSalonInDB,
  rejectSalonInDB,
  deleteSalonInDB,
} from "../redux/redux/Slices/SalonsSlice.js";
import { Search, Check, X, Trash2 } from "lucide-react";

export default function Salons() {
  const salons = useSelector((state) => state.salons.salons);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSalons());
  }, []);

  const filteredSalons = salons.filter((salon) =>
    (salon.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (salon) => {
    const ok = window.confirm(
      `Delete "${salon.name || "this salon"}" permanently?\n\nIts services, staff, portfolio, bookings and reviews will also be deleted. This cannot be undone.`
    );
    if (ok) {
      dispatch(deleteSalonInDB(salon.id));
    }
  };

  return (
    <div>
      <Header title="Salons" subtitle="Manage all registered salons" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="relative w-72 mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search salons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Salon</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalons.map((salon) => (
                <tr key={salon.id} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-purple">
                    <Link to={`/salons/${salon.id}`} className="hover:underline">
                      {salon.name}
                    </Link>
                  </td>
                  <td className="py-3 text-gray-600">{salon.email}</td>
                  <td className="py-3 text-gray-600">{salon.phno}</td>
                  <td className="py-3 text-gray-600">{salon.type}</td>
                  <td className="py-3 text-gray-600">{salon.location}</td>
                  <td className="py-3">
                    <StatusBadge status={salon.account_status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {salon.account_status === "Pending" && (
                        <>
                          <button
                            onClick={() => dispatch(approveSalonInDB(salon.id))}
                            className="p-1.5 rounded-lg bg-green-50 text-green-600"
                            title="Approve"
                          >
                            <Check size={15} />
                          </button>
                          <button
                            onClick={() => dispatch(rejectSalonInDB(salon.id))}
                            className="p-1.5 rounded-lg bg-gray-100 text-gray-500"
                            title="Reject"
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(salon)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600"
                        title="Delete permanently"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSalons.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">No salons found.</p>
          )}
        </div>
      </div>
    </div>
  );
}