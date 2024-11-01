import connectDB from "../config/connectDB.js";
import fs from "fs";
import path from "path";
import url from "url";

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
    try {
      const [result] = await connectDB.query(
        "INSERT INTO `video`(`fullName`, `description`, `star`, `avatar`, `background`, `releaseDate`, `runTime`, `genres`, `status`, `lastAirDate`, `episodes`, `category`, `noOfSeasons`, `idUser`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        Object.values(dataNewVideo)
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

      if (fs.existsSync(avatarPath)) {
        console.log(`Deleting avatar: ${avatarPath}`);
        fs.unlinkSync(avatarPath);
      } else {
        console.log(`Avatar not found: a${avatarPath}`);
      }

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
  static async getInfoVideoByID(idVideo) {
    try {
      const [result] = await connectDB.query(
        "SELECT * FROM video WHERE idVideo = ?",
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
  static async updateService(idVideo, dataUpdateVideo) {
    const fields = [];
    const values = [];

    for (const key in dataUpdateVideo) {
      if (dataUpdateVideo[key] != null) {
        fields.push(`${key} = ?`);
        values.push(dataUpdateVideo[key]);
      }
    }

    // Nếu không có trường nào để cập nhật
    if (fields.length === 0) {
      return {
        success: false,
        message: "No fields to update",
        status: 400,
      };
    }

    const sql = `UPDATE video SET ${fields.join(", ")} WHERE idVideo = ?`;
    values.push(idVideo);

    try {
      const [result] = await connectDB.query(sql, values);
      if (result.affectedRows > 0) {
        return {
          success: true,
          message: "Video updated successfully",
          status: 200,
        };
      } else {
        return {
          success: false,
          message: "Video not found or no changes made",
          status: 404,
        };
      }
    } catch (err) {
      console.error("Error updating video:", err);
      return {
        success: false,
        message: "Error updating video",
        status: 500,
      };
    }
  }
}

export default videoService;
