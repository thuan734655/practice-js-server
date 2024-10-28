import createResponse from "../services/createResponse.js";
import videoService from "../services/videoService.js";

class videoController {
  static async movies(req,res) {
    const result = await videoService.videos();
    const { success, message, data, status } = result;
    return res
      .status(status)
      .json(createResponse(success, message, { data }));
  }
}

export default videoController;
