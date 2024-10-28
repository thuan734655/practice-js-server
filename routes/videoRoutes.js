import express from "express";
import videoController from "../controllers/videoController.js";

const routerVideo = express.Router();

routerVideo.get("/videos", videoController.movies);

export default routerVideo;
