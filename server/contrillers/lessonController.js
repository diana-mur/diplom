import { Op } from "sequelize";
import models from "../models/models.js";

const Lesson = models.Lesson
const LessonComplited = models.LessonComplited
const UserCategory = models.UserCategory

export const allLessons = async (req, res) => {
    const lessons = await Lesson.findAll()
    return res.send({ lessons })
}

export const createLesson = async (req, res) => {
    const { name, content, video, ageUnder, ageUp, image, typeId, categoryId } = req.body
    if (!name || !ageUnder || !ageUp || !typeId || !categoryId) return res.send({ message: "Все поля должны быть заполнены" })
    const lesson = await Lesson.create({
        name, content, video, ageUnder, ageUp, image, invite: '0', typeId, categoryId
    })
    return res.send({ lesson })
}

export const changeLesson = async (req, res) => {
    const { id, name, content, video, ageUnder, ageUp, image, invite, typeId, categoryId } = req.body;

    if (!id) return res.send({ message: "ID урока обязателен для обновления" });

    const updateData = {};
    if (name) updateData.name = name;
    if (content) updateData.content = content;
    if (video) updateData.video = video;
    if (ageUnder) updateData.ageUnder = ageUnder;
    if (ageUp) updateData.ageUp = ageUp;
    if (image) updateData.image = image;
    if (invite) updateData.invite = invite;
    if (typeId) updateData.typeId = typeId;
    if (categoryId) updateData.categoryId = categoryId;

    const lesson = await Lesson.findOne({ where: { id } });
    if (!lesson) return res.send({ message: "Занятие не найдено" });

    await lesson.update(updateData);
    return res.send({ lesson });
}

export const createLC = async (req, res) => {
    const { assessment, prompt, lessonId, userId } = req.body
    const LC = await LessonComplited.create({
        assessment, prompt, lessonId, userId
    })
    return res.send({ LC })
}

export const allCompliteUser = async (req, res) => {
    const { userId } = req.params
    const LC = await LessonComplited.findAll({
        where: { userId },
        attributes: ['lessonId']
    })
    const lessonIds = LC.map(item => item.lessonId)

    const lessons = await Lesson.findAll({
        where: {
            id: {
                [Op.in]: lessonIds
            }
        }
    })

    return res.send({ lessons })
}

export const findLesson = async (req, res) => {
    const { lessonId } = req.params
    const lesson = await Lesson.findOne({ where: { id: lessonId } })
    return res.send({ lesson })
}

export const createUserCategories = async (req, res) => {
    const { userId, categoryIds } = req.body
    for (let i = 0; i < categoryIds.length; i++) {
        const category = await UserCategory.create({
            categoryId: categoryIds[i].categoryId,
            userId
        })
    }
    return res.send({ categoryIds })
}

export const lessonsForUser = async (req, res) => {
    const { userId } = req.params

    const userCategories = await UserCategory.findAll({
        where: { userId },
        attributes: ['categoryId']
    })
    const categoryIds = userCategories.map(item => item.categoryId)

    const LC = await LessonComplited.findAll({
        where: { userId },
        attributes: ['lessonId']
    })
    const lessonIds = LC.map(item => item.lessonId)

    const lessons = await Lesson.findAll({
        where: {
            id: {
                [Op.not]: lessonIds
            },
            categoryId: {
                [Op.in]: categoryIds
            }
        }
    })
    return res.send({ lessons })
}

export const deleteLesson = async (req, res) => {
    const { lessonId } = req.params

    const lesson = await Lesson.findOne({ where: { id: lessonId } })
    if (!lesson) return res.send({ message: "Занятие не найдено" })
    await lesson.destroy()

    const LC = await LessonComplited.destroy({ where: { lessonId } })

    return res.send({ lesson, LC })
}