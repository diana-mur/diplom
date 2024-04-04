import { Op } from "sequelize";
import models from "../models/models.js";

const Test = models.Test
const Question = models.Question

export const createTest = async (req, res) => {
    const { lessonId, questions } = req.body
    for (let i = 0; i < questions.length; i++) {
        const question = await Question.create({
            question: questions[i].question,
            v1: questions[i].v1,
            v2: questions[i].v2,
            v3: questions[i]?.v3,
            v4: questions[i]?.v4,
            correct: questions[i].correct,
            clue: questions[i].clue,
            image: questions[i].image,
        })
        const test = await Test.create({
            lessonId,
            questionId: question.id
        })
    }
    return res.send({ questions })
}

export const allQuestions = async (req, res) => {
    const { lessonId } = req.params

    const test = await Test.findAll({
        where: { lessonId },
        attributes: ['questionId']
    })
    const questionIds = test.map(item => item.questionId)

    const questions = await Question.findAll({
        where: {
            id: {
                [Op.in]: questionIds
            }
        }
    })

    return res.send({ questions })
}