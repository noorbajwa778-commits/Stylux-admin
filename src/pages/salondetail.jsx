import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import { getClientName } from "../redux/redux/Slices/AdminDataSlice.js";
import { ArrowLeft, Star } from "lucide-react";

export default function SalonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const salons = useSelector((state) => state.salons.salons);
  const services = useSelector((state) => state.adminData.services);
  const reviews = useSelector((state) => state.adminData.reviews);
  const clients = useSelector((state) => state.adminData.clients);

  const salon = salons.find((s) => String(s.id) === String(id));
  const salonServices = services.filter((s) => String(s.salon_id) === String(id));
  const salonReviews = reviews.filter((r) => String(r.salon_id) === String(id));

  if (!salon) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate("/salons")}
          className="flex items-center gap-2 text-sm text-gray-500 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Salons
        </button>
        <p className="text-gray-500">Salon not found.</p>
      </div>
    );
  }

  const avgRating =
    salonReviews.length > 0
      ? (
          salonReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          salonReviews.length
        ).toFixed(1)
      : "—";

  return (
    <div>
      <Header title={salon.name || "Salon"} subtitle={salon.type || ""} />

      <div className="px-8 pb-8 space-y-6">
        <button
          onClick={() => navigate("/salons")}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={16} />
          Back to Salons
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {salon.cover_image ? (
            <img
              src={salon.cover_image}
              alt={salon.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
          ) : null}

          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{salon.name}</h2>
              <p className="text-sm text-gray-500">{salon.location}</p>
            </div>
            <StatusBadge status={salon.account_status} />
          </div>

          {salon.description ? (
            <p className="text-sm text-gray-600 mb-4">{salon.description}</p>
          ) : null}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-gray-800 font-medium">{salon.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-gray-800 font-medium">{salon.phno || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400">Province</p>
              <p className="text-gray-800 font-medium">{salon.province || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400">Avg Rating</p>
              <p className="text-gray-800 font-medium">{avgRating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
          {salonServices.length === 0 ? (
            <p className="text-sm text-gray-400">No services listed.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium">Duration</th>
                  <th className="pb-2 font-medium">Price</th>
                  <th className="pb-2 font-medium">Discount</th>
                </tr>
              </thead>
              <tbody>
                {salonServices.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50">
                    <td className="py-2 text-gray-800">{s.name}</td>
                    <td className="py-2 text-gray-600">{s.category || "—"}</td>
                    <td className="py-2 text-gray-600">{s.duration || "—"}</td>
                    <td className="py-2 text-gray-600">
                      Rs {Number(s.price || 0).toLocaleString()}
                    </td>
                    <td className="py-2 text-gray-600">
                      {Number(s.discount_percent || 0) > 0
                        ? `${s.discount_percent}%`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Reviews</h3>
          {salonReviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {salonReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-50 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">
                      {getClientName(clients, review.client_id)}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Number(review.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {review.comment ?? review.review ?? ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}