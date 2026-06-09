const db = require("../config/db");
const getCustomers = (req, res) => {
    const query = `
SELECT
Leads.*,
Users.name AS assignedUser
FROM Leads
LEFT JOIN Users
ON Leads.assignedTo=Users.id
WHERE Leads.status='Converted'
`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};
module.exports = {
    getCustomers
};