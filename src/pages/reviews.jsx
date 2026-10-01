import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header.jsx";
import {
  deleteReviewInDB,
  getClientName,
  getSalonName,
} from "../redux/redux/Slices/AdminDataSlice.js";
import { Star, Trash2 } from "lucide-react";

export default function Reviews() {
  const reviews = useSelector((state) => state.adminData.reviews);
  const clients = useSelector((state) => state.adminData.clients);
  const salons = useSelector((state) => state.salons.salons);
  const dispatch = useDispatch();

  const [ratingFilter, setRatingFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredReviews = reviews.filter((r) =>
    ratingFilter === "all" ? true : Number(r.rating) <= 2
  );

  const handleDelete = () => {
    dispatch(deleteReviewInDB(deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      <Header title="Reviews" subtitle="Monitor reviews across all salons" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setRatingFilter("all")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition ${
                ratingFilter === "all"
                  ? "bg-gradient-to-r from-pink to-purple text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setRatingFilter("low")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition ${
                ratingFilter === "low"
                  ? "bg-gradient-to-r from-pink to-purple text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              1-2 Star Only
            </button>
          </div>

          {filteredReviews.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No reviews found.
            </p>
          )}

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-4 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {getClientName(clients, review.client_id)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getSalonName(salons, review.salon_id)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Number(review.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setDeleteTarget(review)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {review.comment ?? review.review ?? ""}
                </p>

                {review.reply ? (
                  <p className="text-xs text-gray-500 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                    Salon reply: {review.reply}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Delete Review</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this review?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
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
      )}
    </div>
  );
}