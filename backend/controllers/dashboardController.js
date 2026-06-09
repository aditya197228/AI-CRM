const db = require("../config/db");
const getDashboardStats = (req, res) => {
    const query = `
SELECT
COUNT(*) AS totalLeads,
SUM(CASE WHEN status='New' THEN 1 ELSE 0 END) AS newLeads,
SUM(CASE WHEN status='Contacted' THEN 1 ELSE 0 END) AS contactedLeads,
SUM(CASE WHEN status='Converted' THEN 1 ELSE 0 END) AS convertedLeads
FROM Leads
`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result[0]);
    });
};
const getRecentLeads = (req, res) => {

    const query = `
SELECT
Leads.name,
Leads.status,
Users.name AS assignedUser
FROM Leads
LEFT JOIN Users
ON Leads.assignedTo=Users.id
ORDER BY Leads.createdAt DESC
LIMIT 5
`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};
module.exports = {
    getDashboardStats,
    getRecentLeads
};
