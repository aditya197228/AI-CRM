const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leadRoutes = require("./routes/leadRoutes");
const verifyToken = require("./middleware/authMiddleware");
require("./config/db");
const analyticsRoutes = require("./routes/analyticsRoutes");
const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
    res.send("SmartCRM Backend Running");
});

app.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: "Welcome Dashboard",
        user: req.user

    });

});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});