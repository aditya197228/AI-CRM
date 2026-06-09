const db = require("../config/db");
const getUsers = (req, res) => {
    const query = `
    SELECT
    id,
    name,
    email,
    role
    FROM Users
    `;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};
module.exports = {
    getUsers
};