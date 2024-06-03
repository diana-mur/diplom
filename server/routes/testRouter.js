import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allQuestions, allQuestionsForUpdate, checkAnswer, clueForQuestion, createTest, updateTest } from "../contrillers/testController.js";
import { upload } from "../loadingFiles/loadingFile.js";

const testRouter = express.Router()

testRouter.post('/create', upload.any(), createTest)
testRouter.post('/update', upload.any(), updateTest)
testRouter.get('/all/:lessonId', CheckRoleMiddleware(['ADMIN', 'USER']), allQuestions)
testRouter.get('/allForUpdate/:lessonId', CheckRoleMiddleware(['ADMIN', 'USER']), allQuestionsForUpdate)
testRouter.get('/clue/:id', CheckRoleMiddleware(['ADMIN', 'USER']), clueForQuestion)
testRouter.post('/check', CheckRoleMiddleware(['ADMIN', 'USER']), checkAnswer)

export default testRouter