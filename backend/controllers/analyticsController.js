const db = require("../config/db");

const getAnalytics = (req, res) => {

    const statsQuery = `
SELECT
COUNT(*) AS totalLeads,
SUM(CASE WHEN status='Converted' THEN 1 ELSE 0 END) AS convertedLeads,
SUM(CASE WHEN status='Lost' THEN 1 ELSE 0 END) AS lostLeads,
SUM(CASE WHEN status IN ('New','Contacted','Interested','Qualified') THEN 1 ELSE 0 END) AS activeLeads
FROM Leads
`;

    const performanceQuery = `
SELECT
Users.id,
Users.name,
COUNT(Leads.id) AS totalLeads,
SUM(CASE WHEN Leads.status='Converted' THEN 1 ELSE 0 END) AS convertedLeads,
SUM(CASE WHEN Leads.status IN ('New','Contacted','Interested','Qualified') THEN 1 ELSE 0 END) AS activeLeads
FROM Users
LEFT JOIN Leads
ON Users.id=Leads.assignedTo
GROUP BY Users.id,Users.name
`;

    db.query(statsQuery, (err, statsResult) => {

        if (err) {

            return res.status(500).json(err);

        }

        db.query(performanceQuery, (err, performanceResult) => {

            if (err) {

                return res.status(500).json(err);

            }

            const stats = statsResult[0];

            stats.conversionRate =
                stats.totalLeads > 0
                    ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(2)
                    : 0;

            const performance = performanceResult.map(user => ({

                ...user,

                conversionRate:
                    user.totalLeads > 0
                        ? ((user.convertedLeads / user.totalLeads) * 100).toFixed(2)
                        : 0

            }));

            res.status(200).json({

                stats,
                performance

            });

        });

    });

};

module.exports = {
    getAnalytics
};