import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allLessons, changeLesson, createLC, createLesson, deleteLesson, allCompliteUser, findLesson, resultsLesson, categories, types, resultLesson } from "../contrillers/lessonController.js";
import { upload } from "../loadingFiles/loadingFile.js";

const lessonRouter = express.Router()

lessonRouter.get('/all', CheckRoleMiddleware(['ADMIN', 'USER']), allLessons)
lessonRouter.get('/categories', CheckRoleMiddleware(['ADMIN', 'USER']), categories)
lessonRouter.get('/types', CheckRoleMiddleware(['ADMIN', 'USER']), types)
lessonRouter.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createLesson)
lessonRouter.post('/change', CheckRoleMiddleware(['ADMIN']), changeLesson)
lessonRouter.post('/createComplite', CheckRoleMiddleware(['USER']), createLC)
lessonRouter.get('/allCompliteUser/:userId', CheckRoleMiddleware(['USER']), allCompliteUser)
lessonRouter.get('/resultsLesson/:lessonId', CheckRoleMiddleware(['ADMIN', 'USER']), resultsLesson)
lessonRouter.get('/result/:lessonId/:userId', CheckRoleMiddleware(['ADMIN', 'USER']), resultLesson)
lessonRouter.get('/findLesson/:lessonId', CheckRoleMiddleware(['ADMIN', 'USER']), findLesson)
lessonRouter.get('/delete/:lessonId', CheckRoleMiddleware(['ADMIN']), deleteLesson)

export default lessonRouter