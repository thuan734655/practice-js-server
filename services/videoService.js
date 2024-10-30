import connectDB from "../config/connectDB.js";

class videoService {
  static async videos() {
    try {
      const [result] = await connectDB.query("SELECT * FROM video");
      return {
        success: true,
        message: "Fetch all video successful",
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

  static async addService(dataNewVideo) {
    const {
      fullName,
      description,
      star,
      avatar,
      background,
      releaseDate,
      runTime,
      genres,
      status,
      lastAirDate,
      episodes,
      category,
      noOfSeasons,
      idUser,
    } = dataNewVideo;

    try {
      const [result] = await connectDB.query(
        "INSERT INTO `video`(`fullName`, `description`, `star`, `avatar`, `background`, `releaseDate`, `runTime`, `genres`, `status`, `lastAirDate`, `episodes`, `category`, `noOfSeasons`, `idUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          fullName,
          description,
          star,
          avatar,
          background,
          releaseDate,
          runTime,
          genres,
          status,
          lastAirDate,
          episodes,
          category,
          noOfSeasons,
          idUser,
        ]
      );

      return {
        success: true,
        message: "Video added successfully",
        data: {
          id: result.insertId,
        },
        status: 201,
      };
    } catch (err) {
      console.error("Error adding video:", err);
      return {
        success: false,
        message: "Error adding video",
        data: null,
        status: 500,
      };
    }
  }

  static async getMyListService(idUser) {
    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE idUser = ?",
        [idUser]
      );

      if (result.length === 0) {
        return {
          success: false,
          message: "No videos found for this user",
          data: null,
          status: 404,
        };
      }

      return {
        success: true,
        message: "Videos found",
        data: result,
        status: 200,
      };
    } catch (error) {
      console.error("Error fetching videos:", error);
      return {
        success: false,
        message: "Error fetching videos",
        data: null,
        status: 500,
      };
    }
  }
}

export default videoService;
