import express from 'express';
import userRouter from "./router/userRouter.js";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
     origin: '*', 
   }));

app.use('/user', userRouter);

app.listen(port, () => {
     console.log("server listen port 3000");
});
