import { useEffect, useState } from "react"
import { get, post } from "../../hooks/fetchForm"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { Title } from "../../components/Title"

export default function Quiz() {
    const [questions, setQuestions] = useState([])
    const [video, setVideo] = useState(null)
    const [promp, setPromp] = useState('')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [correctPrompCount, setCorrectPrompCount] = useState(0)
    const [visiblePromp, setVisiblePromp] = useState(false)

    const question = questions[currentQuestionIndex]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const location = useLocation()
    const lessonId = location.pathname.split('/')[2]

    let jwt
    token ? jwt = jwtDecode(token) : null

    const handleAnswer = (answer) => {
        setVisiblePromp(false);
        // if (answer = question?.correct) {
        //     setCorrectAnswerCount(correctAnswerCount + 1)
        // }
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            post({
                url: `lessons/createComplite`, dispatch, token, data: {
                    result: correctAnswerCount,
                    prompt,
                    lessonId,
                    userId: jwt?.id
                }
            })
            navigate(`../../../lessons/${lessonId}/finish`)
        }
    }

    const handlePrompt = (e) => {
        e.preventDefault()

        get({ url: `tests/clue/${question?.id}` })
            .then(json => {
                setPromp(json.clue);
                setCorrectPrompCount(correctPrompCount + 1);
                setVisiblePromp(true)
            })
    }

    useEffect(() => {
        get({ url: `lessons/findLesson/${lessonId}`, dispatch, token })
            .then(json => {
                if (json.lesson.typeId == 'тест') {
                    get({ url: `tests/all/${lessonId}`, dispatch, token })
                        .then(json => setQuestions(json.questions))
                }
                if (json.lesson.typeId == 'видео-урок') {
                    setVideo(json.lesson.video)
                }
            }
            )
    }, [token])

    return (
        <>
            <div className="flex flex-col">
                <Title type={5} title={question?.question} />
                <label htmlFor={`answer${currentQuestionIndex}v1`}><input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v1`} value="v1" />
                    {question?.v1}</label>
                <label htmlFor={`answer${currentQuestionIndex}v2`}><input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v2`} value="v2" />
                    {question?.v1}</label>
                {
                    question?.v3 &&
                    <>
                        <label htmlFor={`answer${currentQuestionIndex}v3`}><input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v3`} value="v3" />
                            {question?.v3}</label>
                    </>
                }
                {
                    question?.v4 &&
                    <>
                        <label htmlFor={`answer${currentQuestionIndex}41`}><input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v4`} value="v4" />
                            {question?.v4}</label>
                    </>
                }
                <button onClick={() => handleAnswer()}>{currentQuestionIndex == questions.length ? 'Закончить' : 'Далее'}</button>

            </div>
        </>
    )
}