import express from "express";
import connectDB from "../ConnectDB/connect.js";

const router = express.Router();

// get all user
router.get("/all", (req,res) => {
    connectDB.query("select * from user", (err, result) => {
        if(err) {
            res.status(500).send("get infomation of user fail");
            return;
        }
        res.json(result);
    });
});

//get user by id
router.get("/id", (req,res) => {
    const {id} = req;

    if (!id) {
        return res.status(400).send('id invalid');
    }

    connectDB.query("select * from user where idUser = ? ",[id],(err, result) => {
        if(err) {
            res.status(500).send("get infomation user by id fail");
            return;
        }
        res.json(result);
    });
});

export default router;