import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load variables from file .env
dotenv.config();

// Config connect
const connectDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  queueLimit: process.env.DB_QUEUE_LIMIT || 0,
});

// Check connect
connectDB.getConnection((err, connection) => {
  if (err) {
    console.log("Connect DB fail", err);
  } else {
    console.log("Connect DB successful");
    connection.release(); // Free connection
  }
});

export default connectDB;
