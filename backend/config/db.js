const mysql = require("mysql2");//import mysql from "mysql2" which is used to connect to mysql database and perform queries
require("dotenv").config();//import dotenv to load environment variables from .env file

const connection = mysql.createConnection({//create a connection to mysql database using the credentials from environment variables

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});

connection.connect((err) => {

    if (err) {
        console.log("Database connection failed");
        console.log(err);
    }
    else {
        console.log("MySQL Connected");
    }

});
module.exports = connection;