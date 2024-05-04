import bcrypt from "bcrypt"
import models from "../models/models.js"
import { generateAccessToken } from "../generateToken/generateToken.js"
import { validationResult } from "express-validator"

const User = models.User

// создание пользователя
export const reg = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const { surname, name, birthday, email, password } = req.body

    let user = await User.findOne({ where: { email } })

    if (user) return res.send({ message: 'Адрес эл. почты уже используется' })

    if (!surname || !name || !birthday || !email || !password) return res.send({ message: 'Не все поля заполнены' })

    const hashPassword = bcrypt.hashSync(password, 10)

    user = await User.create({ surname, name, birthday, email, password: hashPassword, roleId: 'USER' })

    return res.send({ user })
}

// вход
export const auth = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.send({ message: 'Адрес эл. почты не найден' })

    const isValidPassword = bcrypt.compareSync(password, user.password)

    if (!isValidPassword) return res.send({ message: 'Неверный пароль' })

    const token = generateAccessToken(user.id, user.roleId)

    return res.send({ user, token })
}

// найти пользователя 
export const findUserById = async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: userId } })
    if (!user) return res.send({ message: "Пользователь не найден" })
    return res.send({ user })
}

// все пользователи
export const allUsers = async (req, res) => {
    const users = await User.findAll()
    return res.send({ users })
}

// изменение пользователя
export const changeUser = async (req, res) => {
    const { id, surname, name, email, password } = req.body
    if (!id || !surname || !name || !email || !password) return res.send({ message: "Все поля должны быть заполнены" })
    const user = await User.findOne({ where: { id } })
    if (!user) return res.send({ message: "Пользователь не найден" })
    user.update({
        surname, name, email, password
    })
    return res.send({ user })
}

// удаление пользователя
export const deleteUser = async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: userId } })
    if (!user) return res.send({ message: "Пользователь не найден" })
    await user.destroy()
    return res.send({ user })
}