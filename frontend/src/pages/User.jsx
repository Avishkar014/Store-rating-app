import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user/stores");
  }, []);

  return null;
}
