const express = require("express");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/admin",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

router.get(
  "/user",
  authenticate,
  authorizeRoles("USER", "STORE_OWNER"),
  (req, res) => {
    res.json({ message: "User access granted" });
  }
);

module.exports = router;
