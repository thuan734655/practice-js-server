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

routerVideo.get("/video/information", videoController.getInfoMovieByID);

routerVideo.get("/videos/mylist", videoController.getMyList);

routerVideo.delete("/videos/delete", videoController.deleteVideo);

routerVideo.put(
  "/videos/update/:idVideo",
  upload.fields([{ name: "avatar" }, { name: "background" }]),
  videoController.update
);

export default routerVideo;
