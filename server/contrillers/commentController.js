import { Op } from "sequelize";
import models from "../models/models.js";

const Comment = models.Comment

export const createComment = async (req, res) => {
    const { userId, lessonId, value, text } = req.body
    if (!userId || !lessonId || !value || !text) return res.send({ message: "Все поля должны быть заполнены" })
    const comment = await Comment.create({
        userId, lessonId, statusId: "В обработке", value, text
    })
    return res.send({ comment })
}

export const changeStatus = async (req, res) => {
    const { commentId, statusId } = req.body
    const comment = await Comment.findOne({
        where: { id: commentId }
    })
    if (!comment) return res.send({ message: "Комментарий не найден" })
    await comment.update({ statusId })
    return res.send({ comment })
}

export const allComments = async (req, res) => {
    const { lessonId } = req.params
    const comments = await Comment.findAll({
        where: {
            [Op.and]: [{ lessonId }, { statusId: 'Принят' }]
        }
    })
    return res.send({ comments })
}

export const commentsForFilter = async (req, res) => {
    const comments = await Comment.findAll({
        where: { statusId: 'В обработке' }
    })
    return res.send({ comments })
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params

    const comment = await Comment.findOne({ where: { id: commentId } })
    if (!comment) return res.send({ message: "Комментарий не найден" })
    await comment.destroy()

    return res.send({ comment })
}