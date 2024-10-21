import express from "express";
import bodyParser from "body-parser";
import connectDB from "../connect.js";

const router = express.Router();

router.use(bodyParser.json());

// Get all users
router.get("/all", (req, res) => {
  connectDB.query("SELECT * FROM user", (err, result) => {
    if (err) {
      res.status(500).send("Failed to get user information");
      return;
    }
    res.json(result);
  });
});

// Get user by ID
router.get("/id", (req, res) => { 
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("ID invalid");
  }

  connectDB.query(
    "SELECT * FROM user WHERE idUser = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).send("Failed to get user information by ID");
        return;
      }
      res.json(result);
    }
  );
});

// Check login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).send("Invalid data");
  }

  connectDB.query(
    "SELECT idUser FROM `user` WHERE email = ? and password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).send("Login failed");
      }
      if (result.length === 0) {
        return res.status(404).send("Account not found");
      }
      return res.status(200).send({ 
        status: 200, 
        message: "Login successful", 
        data: { idUser: result }});
    }
  );
});

export default router;
