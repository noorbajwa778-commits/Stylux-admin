import { useState } from "react";
import Header from "../components/header.jsx";
import { reviews as initialReviews } from "../data/reviews.js";
import { Star, Flag, Trash2 } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredReviews = reviews.filter((review) => {
    if (ratingFilter === "all") return true;
    if (ratingFilter === "low") return review.rating <= 2;
    return true;
  });

  const handleDelete = () => {
    setReviews(reviews.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleFlag = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, flagged: !r.flagged } : r))
    );
  };

  return (
    <div>
      <Header title="Reviews" subtitle="Monitor reviews across all salons" />

      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          {/* Filter pills */}
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

          {/* Reviews list */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 rounded-xl border ${
                  review.flagged
                    ? "border-red-200 bg-red-50"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {review.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{review.salonName}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => handleFlag(review.id)}
                      className={`p-1.5 rounded-lg ${
                        review.flagged
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      title="Flag"
                    >
                      <Flag size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(review)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              No reviews match this filter.
            </p>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Delete Review</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this review from{" "}
              <span className="font-medium text-gray-700">
                {deleteTarget.clientName}
              </span>
              ?
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