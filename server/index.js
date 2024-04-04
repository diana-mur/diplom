import { } from "dotenv/config"
import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import models from "./models/models.js";
import userRouter from "./routes/userRouter.js";
import commentRouter from "./routes/commentRouter.js";
import lessonRouter from "./routes/lessonRouter.js";
import testRouter from "./routes/testRouter.js";

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/comments', commentRouter)
app.use('/api/lessons', lessonRouter)
app.use('/api/tests', testRouter)

const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
        console.log(`СЕРВЕР РАБОТАЕТ НА ПОРТУ ${PORT}`);
    })
}

start()