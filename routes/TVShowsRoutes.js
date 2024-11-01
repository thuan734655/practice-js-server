import express from "express";
import TvShowController from "../controllers/TvShowsController.js";

const routerTvShows = express.Router();

routerTvShows.get("/tvshows", TvShowController.getAllTvShows);

export default routerTvShows;
