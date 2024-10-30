import createResponse from "../services/createResponse.js";
import videoService from "../services/videoService.js";

class videoController {
  static async videos(req, res) {
    const result = await videoService.videos();
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }

  static async add(req, res) {
    const idUser = req.cookies.idUser;

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
      idUser: idUser,
    };

    try {
      const result = await videoService.addService(videoData);
      return res
        .status(result.status)
        .json(createResponse(result.success, result.message, result.data));
    } catch (error) {
      console.error("Error saving video:", error);
      return res
        .status(500)
        .json(createResponse(false, "Error saving video", null));
    }
  }
  static async getMyList(req, res) {
    const idUser = req.cookies.idUser;
    const result = await videoService.getMyListService(idUser);
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }
}

export default videoController;
