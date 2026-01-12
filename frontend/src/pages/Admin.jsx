import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard").then(res => setStats(res.data));
    api.get("/admin/users").then(res => setUsers(res.data));
    api.get("/admin/stores").then(res => setStores(res.data));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
      </div>

      <div className="card">
        <h3>Statistics</h3>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>

      <div className="card">
        <h3>Users</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Stores</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Address</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {stores.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.address}</td>
                <td>{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
