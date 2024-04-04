import jwt from "jsonwebtoken"
import { } from "dotenv/config"

export const CheckRoleMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.headers.authorization) return res.send({ message: "Вы не авторизованы" })
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (decoded.roleId != role) return res.send({ message: "Нет доступа" })
        next()
        return
    }
}