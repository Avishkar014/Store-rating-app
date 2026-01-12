const express = require("express");
const {
  createUser,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores
} = require("../controllers/admin.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

/* =========================
   DASHBOARD STATS
========================= */
router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  getDashboardStats
);

/* =========================
   USERS
========================= */
router.post(
  "/users",
  authenticate,
  authorizeRoles("ADMIN"),
  createUser
);

router.get(
  "/users",
  authenticate,
  authorizeRoles("ADMIN"),
  getAllUsers
);

/* =========================
   STORES
========================= */
router.post(
  "/stores",
  authenticate,
  authorizeRoles("ADMIN"),
  createStore
);

router.get(
  "/stores",
  authenticate,
  authorizeRoles("ADMIN"),
  getAllStores
);

module.exports = router;
