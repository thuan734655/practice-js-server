import express from 'express';
import userRouter from "./router/userRouter.js";

const app = express();
const port = 3000;

app.use('/user', userRouter);

app.listen(port, () => {
     console.log("server listen port 3000");
});
