import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allLessons, changeLesson, createLC, createLesson, deleteLesson, allCompliteUser, findLesson, createUserCategories, lessonsForUser } from "../contrillers/lessonController.js";

const lessonRouter = express.Router()

lessonRouter.get('/all', allLessons)
lessonRouter.post('/create', CheckRoleMiddleware('ADMIN'), createLesson)
lessonRouter.post('/change', CheckRoleMiddleware('ADMIN'), changeLesson)
lessonRouter.post('/createComplite', createLC)
lessonRouter.get('/allCompliteUser/:userId', CheckRoleMiddleware('USER'), allCompliteUser)
lessonRouter.get('/findLesson/:lessonId', findLesson)
lessonRouter.post('/addUserCategories', createUserCategories)
lessonRouter.get('/lessonsForUser/:userId', lessonsForUser)
lessonRouter.get('/delete/:lessonId', CheckRoleMiddleware('ADMIN'), deleteLesson)

export default lessonRouter