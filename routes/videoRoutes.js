import express from "express";
import videoController from "../controllers/videoController.js";
import uploadImages from "../middleware/uploadFile.js";

const routerVideo = express.Router();
const upload = uploadImages();

routerVideo.get("/videos", videoController.videos);
routerVideo.post(
  "/add",
  upload.fields([{ name: "avatar" }, { name: "background" }]),
  videoController.add
);

routerVideo.get("/videos/mylist", videoController.getMyList);

export default routerVideo;
