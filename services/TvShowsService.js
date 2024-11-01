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
}

export default TvShowService;
