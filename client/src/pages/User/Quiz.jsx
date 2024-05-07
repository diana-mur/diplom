import { useEffect, useState } from "react"
import { get, post } from "../../hooks/fetchForm"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { Title } from "../../components/Title"

export default function Quiz() {
    const [lessonName, setLessonName] = useState('')
    const [lessonType, setLessonType] = useState('')
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState('')
    const [video, setVideo] = useState(null)
    const [promp, setPromp] = useState('')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentPrompCount, setCurrentPrompCount] = useState(0)
    const [visiblePromp, setVisiblePromp] = useState(false)

    const question = questions[currentQuestionIndex]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const location = useLocation()
    const lessonId = location.pathname.split('/')[2]

    // let videoBlob
    let jwt
    token ? jwt = jwtDecode(token) : null

    useEffect(() => {
        get({ url: `lessons/findLesson/${lessonId}`, dispatch, token })
            .then(json => {
                setLessonName(json.lesson.name)
                setLessonType(json.lesson.typeId)
                if (json.lesson.typeId == 'тест') {
                    get({ url: `tests/all/${lessonId}`, dispatch, token })
                        .then(json => setQuestions(json.questions))
                }
                if (json.lesson.typeId == 'видео-урок') {
                    const fetchVideo = async () => {
                        if (json.lesson.video) {
                            try {
                                const response = await fetch(`http://localhost:8080/${json.lesson.video}`);
                                const videoData = await response.arrayBuffer();
                                const videoBlob = new Blob([videoData], { type: 'video/mp4' })
                                setVideo(videoBlob)
                            }
                            catch (error) {
                                console.error('Failed to fetch video:', error);
                            }
                        }
                    }
                    fetchVideo()
                }
            }
            )
    }, [token])

    const handleAnswer = (ans) => {
        if (!ans) return alert('нужно отметить вариант')
        setAnswer('')
        setVisiblePromp(false);
        setAnswers(prev => [...prev, { id: question?.id, answer: ans }])

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    useEffect(() => {
        if (currentQuestionIndex + 1 == questions.length) {
            post({
                url: `tests/check`, dispatch, token, data: {
                    answers
                }
            })
                .then(json => {
                    post({
                        url: `lessons/createComplite`, dispatch, token, data: {
                            result: json?.correct,
                            promp: currentPrompCount,
                            lessonId,
                            userId: jwt?.id
                        }
                    })
                })

            navigate(`../../../lessons/${lessonId}/finish`)
        }
    }, [answers])


    const handlePromp = (e) => {
        e.preventDefault()

        get({ url: `tests/clue/${question?.id}`, dispatch, token })
            .then(json => {
                setPromp(json.clue);
                setCurrentPrompCount(currentPrompCount + 1);
                setVisiblePromp(true)
            })
    }

    const handleFinish = () => {
        post({
            url: `lessons/createComplite`, dispatch, token, data: {
                result: null,
                promp: null,
                lessonId,
                userId: jwt?.id
            }
        })
        navigate(`../../../lessons/${lessonId}/finish`)
    }

    console.log(video);

    if (lessonType == 'видео-урок') return (
        <div className="container flex flex-col">
            <Title type={1} title={lessonName} />
            {/* <iframe className="w-full aspect-video mb-5" src={`http://localhost:8080/${video}`}></iframe> */}
            <iframe className="w-full aspect-video mb-5" src={video ? URL.createObjectURL(video) : null}></iframe>
            <button className="self-end mb-3 bg-blue-300" onClick={handleFinish}>закончить</button>
        </div>
    )

    if (lessonType == 'тест') return (
        <div className="container">
            <div className="flex flex-col " value={answer} onChange={e => setAnswer(e.target.value)}>
                <Title type={1} title={lessonName} />
                <h6 className="mb-2">{`Вопрос ${currentQuestionIndex + 1}`}</h6>
                {
                    question?.image &&
                    <div className="w-full aspect-video lg:w-1/2">
                        <img className="object-cover h-full w-full" src={`http://localhost:8080/${question?.image}`} alt="" />
                    </div>
                }
                <h6 className="mb-3">{question?.question}</h6>
                <div className="flex flex-col gap-2 mb-5">
                    <div className="flex items-center gap-1">
                        <input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v1`} value="v1" />
                        <label htmlFor={`answer${currentQuestionIndex}v1`}>
                            {question?.v1}
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v2`} value="v2" />
                        <label htmlFor={`answer${currentQuestionIndex}v2`}>
                            {question?.v2}
                        </label>
                    </div>
                    {
                        question?.v3 &&
                        <div className="flex items-center gap-1">
                            <input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v3`} value="v3" />
                            <label htmlFor={`answer${currentQuestionIndex}v3`}>
                                {question?.v3}
                            </label>
                        </div>
                    }
                    {
                        question?.v4 &&
                        <div className="flex items-center gap-1">
                            <input type="radio" name={`answer${currentQuestionIndex}`} id={`answer${currentQuestionIndex}v4`} value="v4" />
                            <label htmlFor={`answer${currentQuestionIndex}v1`}>
                                {question?.v4}
                            </label>
                        </div>
                    }
                </div>
                <button className={`self-end mb-3 ${currentQuestionIndex + 1 == questions.length ? `bg-blue-300` : 'bg-white text-black'}`} onClick={() => handleAnswer(answer)}>{currentQuestionIndex + 1 == questions.length ? 'закончить' : 'далее'}</button>
                <button className="self-end" onClick={handlePromp}>подсказка</button>
                {
                    visiblePromp && <p>{promp}</p>
                }
            </div>
        </div>
    )
}