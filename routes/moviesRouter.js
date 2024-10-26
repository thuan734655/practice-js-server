import connectDB from "../connect.js";
import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

router.get("/all", (req, res) => {
    connectDB.query("select * from video where category = 'movie'",(err, result) => {
        if(err) {
            return res.status(500).send("get all movies fail");
        }
        return res.json(result);
    })
});

export default router;
