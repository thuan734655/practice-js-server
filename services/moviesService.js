import connectDB from "../config/connectDB.js";

class MovieService {
  static async getAllMovies() {
    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE category = 'movie'"
      );
      return {
        success: true,
        message: "Fetch all movies successful",
        data: result,
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: "Query error",
        data: null,
        status: 500,
      };
    }
  }

  static async searchMoviesByName(name) {
    if (!name) {
      return {
        success: false,
        message: "Data invalid",
        data: null,
        status: 400,
      };
    }

    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE fullName LIKE ? AND category = 'movie'",
        [`%${name}%`]
      );

      if (result.length === 0) {
        return {
          success: false,
          message: "No movies found",
          data: null,
          status: 404,
        };
      }

      return {
        success: true,
        message: "Search movies successful",
        data: result,
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: "Query error",
        data: null,
        status: 500,
      };
    }
  }
}

export default MovieService;
