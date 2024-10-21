import connectDB from "../connect.js";
import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

router.get("/all", (req, res) => {
  connectDB.query(
    "select * from video where category = 'TV Show'",
    (err, result) => {
      if (err) {
        return res.status(500).send("get all movies fail");
      }
      return res.json(result);
    }
  );
});
router.post("/information", (req, res) => {
  const { idVideo } = req.body;
  console.log(idVideo);
  if (!idVideo) {
    return res.status(403).send("the data to get information TV Show invalid");
  }
  connectDB.query(
    "select * from video where category = 'TV Show' and idVideo = ?",
    [idVideo],
    (err, result) => {
      if (err) {
        return res.status(500).send("get info TV Show error");
      } else {
        return res.send({
          status: 200,
          message: "get data successful",
          data: result,
        });
      }
    }
  );
});
export default router;
