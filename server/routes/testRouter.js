import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allQuestions, createTest } from "../contrillers/testController.js";

const testRouter = express.Router()

testRouter.post('/create', CheckRoleMiddleware('ADMIN'), createTest)
testRouter.get('/all/:lessonId', allQuestions)

export default testRouter