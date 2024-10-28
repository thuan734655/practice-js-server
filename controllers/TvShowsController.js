import TvShowService from "../services/TvShowsService.js";
import createResponse from "../services/createResponse.js";

class TvShowController {
  static async getAllTvShows(req, res) {
    const result = await TvShowService.tvShows();
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }

  static async getTvShowInformation(req, res) {
    const { idVideo } = req.body;
    if (!idVideo) {
      return res
        .status(400)
        .json(createResponse(false, "Invalid data to get TV show information"));
    }
    const result = await TvShowService.getTvShowById(idVideo);
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }
}

export default TvShowController;
