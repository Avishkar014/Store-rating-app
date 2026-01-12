const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
const testRoutes = require("./routes/test.routes");
app.use("/api/test", testRoutes);
const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);
const storeRoutes = require("./routes/store.routes");
app.use("/api/stores", storeRoutes);
const ownerRoutes = require("./routes/owner.routes");
app.use("/api/owner", ownerRoutes);


app.get("/", (req, res) => {
  res.send("Store Rating API is running");
});

module.exports = app;
