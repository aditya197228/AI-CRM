const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields required"
            });
        }
        const checkQuery =
            "SELECT * FROM Users WHERE email=?";
        db.query(checkQuery, [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
            const SALT_ROUNDS = 10;
            const hashedPassword =
                await bcrypt.hash(
                    password,
                    SALT_ROUNDS
                );
            const insertQuery =
                `
                INSERT INTO Users
                (name,email,password,role)
                VALUES(?,?,?,?)
                `;
            db.query(
                insertQuery,
                [
                    name,
                    email,
                    hashedPassword,
                    role
                ],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Internal server error"
                        });
                    }
                    return res.status(201).json({
                        message: "User Registered"
                    });
                });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
const login = (req, res) => {
    const { email, password } = req.body;
    const query =
        "SELECT * FROM Users WHERE email=?";
    db.query(query, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });

        }
        const user = result[0];
        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Password"

            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            message: "Login successful",
            token
        });
    });
};
module.exports = { register, login };