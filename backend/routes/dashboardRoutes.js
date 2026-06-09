const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    getRecentLeads
} = require("../controllers/dashboardController");

router.get(
    "/stats",
    getDashboardStats
);

router.get(
    "/recent-leads",
    getRecentLeads
);

module.exports = router;