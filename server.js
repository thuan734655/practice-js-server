import express from "express";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import routerMovie from "./routes/moviesRouter.js";
import cors from "cors";
import routerVideo from "./routes/videoRoutes.js";
import routerTvShows from "./routes/TVShowsRoutes.js";
const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:1234",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", routerMovie);
app.use("/", routerVideo);
app.use("/", routerTvShows);

app.listen(port, () => {
  console.log("server listen port 3000");
});
