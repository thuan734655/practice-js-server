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
}

export default MovieService;
