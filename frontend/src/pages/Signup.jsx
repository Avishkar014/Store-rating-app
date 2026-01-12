import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", {
        name,
        email,
        address,
        password
      });
      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.center}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2>Signup</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Signup
        </button>

        <p style={{ marginTop: 10 }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  card: {
    width: 350,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 12
  },
  button: {
    width: "100%",
    padding: 10,
    cursor: "pointer"
  }
};
