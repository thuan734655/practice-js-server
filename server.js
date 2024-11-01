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
    origin: "https://practice-js1.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "baseURL"],
    credentials: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", routerMovie);
app.use("/", routerVideo);
app.use("/", routerTvShows);

app.listen(port, () => {
  console.log("server listen port 3000");
});
