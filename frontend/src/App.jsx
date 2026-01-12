import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Owner from "./pages/Owner";
import Stores from "./pages/Stores";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Layout>
                <Admin />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["USER"]}>
              <Layout>
                <User />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/stores"
          element={
            <ProtectedRoute roles={["USER"]}>
              <Layout>
                <Stores />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={["STORE_OWNER"]}>
              <Layout>
                <Owner />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
