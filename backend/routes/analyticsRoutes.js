const express = require("express");

const router = express.Router();

const {
    getAnalytics
} = require("../controllers/analyticsController");

router.get(
    "/stats",
    getAnalytics
);

module.exports = router;