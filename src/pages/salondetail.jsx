import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header.jsx";
import StatusBadge from "../components/statusbadge.jsx";
import { salons } from "../data/salons.js";
import { services } from "../data/services.js";
import { reviews } from "../data/reviews.js";
import { ArrowLeft, Star } from "lucide-react";

export default function SalonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const salon = salons.find((s) => s.id === Number(id));
  const salonServices = services.filter((s) => s.salonId === Number(id));
  const salonReviews = reviews.filter((r) => r.salonName === salon?.name);

  if (!salon) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Salon not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header title={salon.name} subtitle={salon.category} />

      <div className="px-8 pb-8 space-y-6">
        <button
          onClick={() => navigate("/salons")}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={16} />
          Back to Salons
        </button>

        {/* Salon info card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {salon.name}
              </h2>
              <p className="text-sm text-gray-500">{salon.address}</p>
            </div>
            <StatusBadge status={salon.status} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Owner</p>
              <p className="text-gray-800 font-medium">{salon.ownerName}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-gray-800 font-medium">{salon.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-gray-800 font-medium">{salon.phone}</p>
            </div>
            <div>
              <p className="text-gray-400">Rating</p>
              <p className="text-gray-800 font-medium">
                {salon.rating > 0 ? salon.rating : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
          {salonServices.length === 0 ? (
            <p className="text-sm text-gray-400">No services listed.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Junior Price</th>
                  <th className="pb-2 font-medium">Senior Price</th>
                </tr>
              </thead>
              <tbody>
                {salonServices.map((service) => (
                  <tr key={service.id} className="border-b border-gray-50">
                    <td className="py-2 text-gray-800">{service.serviceName}</td>
                    <td className="py-2 text-gray-600">
                      Rs {service.juniorPrice.toLocaleString()}
                    </td>
                    <td className="py-2 text-gray-600">
                      Rs {service.seniorPrice.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Reviews */}
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
                      {review.clientName}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}