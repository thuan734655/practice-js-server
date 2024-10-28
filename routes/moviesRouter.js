import express from "express";
import MovieController from "../controllers/moviesController.js";


const routerMovie = express.Router();

routerMovie.get("/movies", MovieController.fetchAllMovies);
routerMovie.get("/movies/search", MovieController.searchMovies);

export default routerMovie;
