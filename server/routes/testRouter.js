import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allQuestions, checkAnswer, clueForQuestion, createTest } from "../contrillers/testController.js";
import { upload } from "../loadingFiles/loadingFile.js";

const testRouter = express.Router()

testRouter.post('/create', upload.any(), createTest)
testRouter.get('/all/:lessonId', CheckRoleMiddleware(['ADMIN', 'USER']), allQuestions)
testRouter.get('/clue/:id', CheckRoleMiddleware(['ADMIN', 'USER']), clueForQuestion)
testRouter.post('/check', CheckRoleMiddleware(['ADMIN', 'USER']), checkAnswer)

export default testRouter