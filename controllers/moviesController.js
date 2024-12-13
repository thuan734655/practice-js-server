import MovieService from "../services/moviesService.js";
import createResponse from "../services/createResponse.js";
class MovieController {
  static async fetchAllMovies(req, res) {
    const result = await MovieService.getAllMovies();
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }
}

export default MovieController;
