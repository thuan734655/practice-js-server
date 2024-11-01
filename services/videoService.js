import connectDB from "../config/connectDB.js";
import fs from "fs";
import path from "path";
import url from "url"; // Nhập module url

// Lấy đường dẫn của tệp hiện tại
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  static async deleteVideoService(videoId) {
    try {
      const [video] = await connectDB.query(
        "SELECT * FROM video WHERE idVideo = ?",
        [videoId]
      );
      if (video.length === 0) {
        return {
          success: false,
          message: "Video not found",
          data: null,
          status: 404,
        };
      }
      await connectDB.query("DELETE FROM video WHERE idVideo = ?", [videoId]);

      const avatarPath = path.join(__dirname, "../", video[0].avatar);
      const backgroundPath = path.join(__dirname, "../", video[0].background);

      // Kiểm tra và xóa avatar
      if (fs.existsSync(avatarPath)) {
        console.log(`Deleting avatar: ${avatarPath}`);
        fs.unlinkSync(avatarPath);
      } else {
        console.log(`Avatar not found: a${avatarPath}`);
      }

      // Kiểm tra và xóa background
      if (fs.existsSync(backgroundPath)) {
        console.log(`Deleting background: ${backgroundPath}`);
        fs.unlinkSync(backgroundPath);
      } else {
        console.log(`Background not found: ${backgroundPath}`);
      }

      return {
        success: true,
        message: "Video deleted successfully",
        data: null,
        status: 200,
      };
    } catch (error) {
      console.error("Error deleting video:", error);
      return {
        success: false,
        message: "Error deleting video",
        data: null,
        status: 500,
      };
    }
  }
}

export default videoService;
