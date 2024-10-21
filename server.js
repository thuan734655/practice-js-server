import express from 'express';
import userRouter from "./router/userRouter.js";
import moviesRouter from './router/moviesRouter.js';
import TVShows from './router/TVShows.js'
import cors from 'cors';

const app = express();
const port = 3000;
     
app.use(cors({
     origin: '*', 
   }));

app.use('/user', userRouter);
app.use('/movies',moviesRouter);
app.use('/tvshows',TVShows);

app.listen(port, () => {
     console.log("server listen port 3000");
});
