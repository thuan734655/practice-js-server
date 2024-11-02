import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import routerMovie from "./routes/moviesRouter.js";
import routerVideo from "./routes/videoRoutes.js";
import routerTvShows from "./routes/TVShowsRoutes.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:1234", "https://practice-js1.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "baseURL"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use("/images", express.static(path.join(__dirname, "images"))); // Serve static files

app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies from requests

// Define routes
app.use("/", authRouter);
app.use("/", routerMovie);
app.use("/", routerVideo);
app.use("/", routerTvShows);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
