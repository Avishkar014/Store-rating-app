const express = require("express");
const { getStores, rateStore } = require("../controllers/store.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("USER", "STORE_OWNER"),
  getStores
);

router.post(
  "/:storeId/rate",
  authenticate,
  authorizeRoles("USER"),
  rateStore
);

module.exports = router;
