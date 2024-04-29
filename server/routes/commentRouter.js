import express from "express";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { allComments, changeStatus, commentsForFilter, createComment, deleteComment } from "../contrillers/commentController.js";

const commentRouter = express.Router()

commentRouter.post('/create', createComment)
commentRouter.post('/changeStatus', CheckRoleMiddleware('ADMIN'), changeStatus)
commentRouter.get('/allForLesson/:lessonId', allComments)
commentRouter.get('/filter', CheckRoleMiddleware('ADMIN'), commentsForFilter)
commentRouter.get('/delete/:commentId', deleteComment)

export default commentRouter