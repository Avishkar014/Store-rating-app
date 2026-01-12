const express = require("express");
const { getMyStoreRatings } = require("../controllers/owner.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("STORE_OWNER"),
  getMyStoreRatings
);

module.exports = router;
