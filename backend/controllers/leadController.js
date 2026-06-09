const db = require("../config/db");
const createLead = (req, res) => {
    const {
        name,
        email,
        phone,
        company,
        status,
        assignedTo
    } = req.body;
    const query = `
INSERT INTO Leads
(name,email,phone,company,status,assignedTo)
VALUES(?,?,?,?,?,?)
`;
    db.query(
        query,
        [
            name,
            email,
            phone,
            company,
            status,
            assignedTo
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json({
                message: "Lead Created"
            });
        }
    );
};
const getLeads = (req, res) => {
    const query = `SELECT 
                    Leads.*,
                    Users.name AS assignedUser
                    FROM Leads  
                    LEFT JOIN Users
                    ON Leads.assignedTo=Users.id
                    `;
    db.query(
        query,
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        }
    );
};
const deleteLead = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Leads WHERE id=?";
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({
            message: "Lead Deleted"
        });
    });
};
const updateLead = (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        phone,
        company,
        status,
        assignedTo
    } = req.body;
    const query = `UPDATE Leads SET
                    name=?,
                    email=?,
                    phone=?,
                    company=?,
                    status=?,
                    assignedTo=?
                    WHERE id=?`;

    db.query(
        query,
        [
            name,
            email,
            phone,
            company,
            status,
            assignedTo,
            id
        ],

        (err, result) => {
            if (err) {
                return res.status(500).json(err);

            }
            res.status(200).json({
                message: "Lead Updated"
            });
        }
    );
};
module.exports = {
    createLead,
    getLeads,
    deleteLead,
    updateLead
};