import connectDB from "../config/connectDB.js";


class videoService  {
    static async videos() {
        try {
            const [result] = await connectDB.query(
              "SELECT * FROM video"
            );
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
}

export default videoService;
