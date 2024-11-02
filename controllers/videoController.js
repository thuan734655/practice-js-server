import createResponse from "../services/createResponse.js";
import videoService from "../services/videoService.js";

class videoController {
  static async videos(req, res) {
    try {
      const result = await videoService.videos();
      const { success, message, data, status } = result;
      return res
        .status(status)
        .json(createResponse(success, message, { data }));
    } catch (error) {
      console.error("Error fetching videos:", error);
      return res
        .status(500)
        .json(createResponse(false, "Error fetching videos", null));
    }
  }

  static async add(req, res) {
    if (!req.files) {
      return res
        .status(400)
        .json(createResponse(false, "No files uploaded", null));
    }

    const avatarUrl = req.files["avatar"]
      ? `/images/${req.files["avatar"][0].filename}`
      : null;
    const backgroundUrl = req.files["background"]
      ? `/images/${req.files["background"][0].filename}`
      : null;

    const videoData = {
      fullName: req.body.fullName,
      description: req.body.description,
      star: req.body.star,
      avatar: avatarUrl,
      background: backgroundUrl,
      releaseDate: req.body.releaseDate,
      runTime: req.body.runTime,
      genres: req.body.genres,
      status: req.body.status,
      lastAirDate: req.body.lastAirDate,
      episodes: req.body.episodes,
      category: req.body.category,
      noOfSeasons: req.body.noOfSeasons,
      idUser: req.body.idUser,
    };

    try {
      const result = await videoService.addService(videoData);
      const { success, message, data, status } = result;
      return res.status(status).json(createResponse(success, message, data));
    } catch (error) {
      console.error("Error saving video:", error);
      return res
        .status(500)
        .json(createResponse(false, "Error saving video", null));
    }
  }

  static async getMyList(req, res) {
    const idUser = req.query.idUser;
    console.log(idUser);
    try {
      const result = await videoService.getMyListService(idUser);
      const { success, message, data, status } = result;
      return res
        .status(status)
        .json(createResponse(success, message, { data }));
    } catch (error) {
      console.error("Error fetching user's video list:", error);
      return res
        .status(500)
        .json(createResponse(false, "Error fetching user's video list", null));
    }
  }

  static async deleteVideo(req, res) {
    const { idVideo } = req.body;
    if (!idVideo) {
      return res
        .status(400)
        .json(createResponse(false, "Video ID is required", null));
    }

    try {
      const result = await videoService.deleteVideoService(idVideo);
      const { success, message, status } = result;
      return res.status(status).json(createResponse(success, message, null));
    } catch (error) {
      console.error("Error deleting video:", error);
      return res
        .status(500)
        .json(createResponse(false, "Error deleting video", null));
    }
  }

  static async getInfoMovieByID(req, res) {
    const { idVideo } = req.query;
    if (!idVideo) {
      return res
        .status(400)
        .json(createResponse(false, "Invalid data to get TV show information"));
    }
    const result = await videoService.getInfoVideoByID(idVideo);
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }
  static async update(req, res) {
    const { idVideo } = req.params;
    console.log("Dữ liệu từ body:", req.body);
    console.log("Tệp tin đã tải lên:", req.files);

    if (!idVideo) {
      return res
        .status(400)
        .json(createResponse(false, "ID video là bắt buộc", null));
    }

    const avatarUrl =
      req.files["avatar"] && req.files["avatar"][0]
        ? `/images/${req.files["avatar"][0].filename}`
        : req.body.currentAvatar;

    const backgroundUrl =
      req.files["background"] && req.files["background"][0]
        ? `/images/${req.files["background"][0].filename}`
        : req.body.currentBackground;

    const dataUpdateVideo = {
      fullName: req.body.fullName,
      description: req.body.description,
      star: req.body.star,
      avatar: avatarUrl,
      background: backgroundUrl,
      releaseDate: req.body.releaseDate,
      runTime: req.body.runTime,
      genres: req.body.genres,
      status: req.body.status,
      lastAirDate: req.body.lastAirDate,
      episodes: req.body.episodes,
      category: req.body.category,
      noOfSeasons: req.body.noOfSeasons,
    };

    try {
      const result = await videoService.updateService(idVideo, dataUpdateVideo);
      const { success, message, status } = result;
      return res.status(status).json(createResponse(success, message, null));
    } catch (error) {
      console.error("Lỗi cập nhật video:", error);
      return res
        .status(500)
        .json(createResponse(false, "Lỗi khi cập nhật video", null));
    }
  }
}

export default videoController;
