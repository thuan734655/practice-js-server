import connectDB from "../config/connectDB.js";

class TvShowService {
  static async tvShows() {
    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE category = 'TV Show'"
      );
      return {
        success: true,
        message: "Fetch all TV shows successful",
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

  static async getTvShowById(idVideo) {
    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE category = 'TV Show' AND idVideo = ?",
        [idVideo]
      );
      if (result.length === 0) {
        return {
          success: false,
          message: "TV Show not found",
          data: null,
          status: 404,
        };
      }
      return {
        success: true,
        message: "Fetch TV show by ID successful",
        data: result[0],
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

export default TvShowService;
