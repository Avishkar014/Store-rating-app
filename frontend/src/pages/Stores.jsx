import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/stores")
      .then(res => setStores(res.data))
      .finally(() => setLoading(false));
  }, []);

  const submitRating = async storeId => {
    if (!ratings[storeId]) return;
    await api.post(`/stores/${storeId}/rate`, {
      value: ratings[storeId]
    });
  };

  if (loading) {
    return <p className="text-center">Loading stores...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Available Stores</h2>

      {stores.length === 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          No stores available yet.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map(store => (
          <div
            key={store.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-3"
          >
            <div>
              <p className="font-semibold">{store.name}</p>
              <p className="text-sm text-gray-500">{store.address}</p>
              <p className="text-yellow-600 mt-1">
                ⭐ {store.rating ?? "No ratings"}
              </p>
            </div>

            <select
              className="border rounded px-2 py-2"
              value={ratings[store.id] || ""}
              onChange={e =>
                setRatings({
                  ...ratings,
                  [store.id]: Number(e.target.value)
                })
              }
            >
              <option value="">Rate store</option>
              {[1, 2, 3, 4, 5].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <button
              onClick={() => submitRating(store.id)}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit Rating
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
