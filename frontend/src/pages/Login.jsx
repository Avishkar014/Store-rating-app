import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password
    });

    const { token, role } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (role === "ADMIN") navigate("/admin");
    else if (role === "STORE_OWNER") navigate("/owner");
    else navigate("/user/stores");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
