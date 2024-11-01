import TvShowService from "../services/TvShowsService.js";
import createResponse from "../services/createResponse.js";

class TvShowController {
  static async getAllTvShows(req, res) {
    const result = await TvShowService.tvShows();
    const { success, message, data, status } = result;
    return res.status(status).json(createResponse(success, message, { data }));
  }
}

export default TvShowController;
