import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Owner() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/owner/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <div className="header">
        <h1>{data.storeName}</h1>
        <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
      </div>

      <div className="card">
        <h3>Average Rating</h3>
        <p>{data.averageRating}</p>
      </div>

      <div className="card">
        <h3>User Ratings</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {data.ratings.map(r => (
              <tr key={r.userId}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
