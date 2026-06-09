const express = require("express");
const router = express.Router();
const { createLead, getLeads, deleteLead, updateLead } = require("../controllers/leadController");
router.post("/create", createLead);
router.get("/all", getLeads);
router.delete("/delete/:id", deleteLead);
router.put("/update/:id", updateLead);
module.exports = router;