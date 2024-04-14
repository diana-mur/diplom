import express from "express";
import { body } from "express-validator";
import { allUsers, auth, changeUser, deleteUser, findUserById, reg } from "../contrillers/userController.js";
import { CheckRoleMiddleware } from "../middleware/RoleMw.js";
import { RegistrationMW } from "../middleware/validatorMw.js";

const userRouter = express.Router()

userRouter.post('/reg', RegistrationMW(body('email'), body('password')), reg)
userRouter.post('/auth', auth)
userRouter.get('/find/:userId', findUserById)
userRouter.get('/all', allUsers)
userRouter.post('/change', changeUser)
userRouter.get('/delete/:userId', CheckRoleMiddleware('ADMIN'), deleteUser)

export default userRouter