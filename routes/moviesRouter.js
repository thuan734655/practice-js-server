import express from "express";
import MovieController from "../controllers/moviesController.js";


const routerMovie = express.Router();

routerMovie.get("/movies", MovieController.fetchAllMovies);
export default routerMovie;
