import { useEffect, useState } from "react"
import { get, post } from "../../hooks/fetchForm"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { InputComment } from "../../components/inputComment"
import { jwtDecode } from "jwt-decode"
import { Title } from "../../components/Title"

export default function Result() {
    const [username, setUsername] = useState('')
    const [lessonName, setLessonName] = useState('')
    const [result, setResult] = useState('')
    const [maxCount, setMaxCount] = useState('')
    const [userRating, setUserRating] = useState('')
    const [textComment, setTextComment] = useState('')

    const pasScore = Math.ceil(result / maxCount) > 0.5

    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()
    const location = useLocation()
    const lessonId = location.pathname.split('/')[2]

    let jwt
    token ? jwt = jwtDecode(token) : null
    const id = jwt?.id

    useEffect(() => {
        get({ url: `users/find/${id}`, dispatch, token })
            .then(json => setUsername(json.user.name));
        get({ url: `lessons/findLesson/${lessonId}`, dispatch, token })
            .then(json => {
                setLessonName(json.lesson.name)
                if (json.lesson.typeId == 'тест') {
                    get({ url: `lessons/result/${lessonId}/${jwt?.id}`, dispatch, token })
                        .then(json => setResult(json.result.result))
                }
                if (json.lesson.typeId == 'видео-урок') {

                }
            }
            )
            .then(get({ url: `tests/all/${lessonId}`, dispatch, token })
                .then(json => setMaxCount(json.questions.length))
            )
    }, [token])

    const handleButtonPostComment = () => {
        post({
            url: `comments/create`, dispatch, token, data: {
                userId: jwt?.id,
                lessonId,
                value: userRating,
                text: textComment
            }
        })
        alert('Ваш комментарий отправлен на обработку.')
    }

    return (
        <div className="container">
            <Title type={1} title={lessonName} />
            {
                pasScore &&
                <Title type={4} title={`Поздравляем, ${username}!`} />
            }
            <h6 className="mb-3">Ваш результат: <span className=" text-3xl font-['Aqum_Two']">{result}/{maxCount}</span></h6>
            {
                pasScore &&
                <h6 className="mb-5">Мы отправили приглашение к Вам на почту. Надеемся, что Вам всё понравилось!</h6>
            }
            <InputComment
                setUserRating={setUserRating}
                textComment={textComment}
                setTextComment={setTextComment}
                handleButtonPostComment={handleButtonPostComment}
                styleButton={"bg-blue-300"}
                id={jwt?.id}
                lessonId={lessonId}
                dispatch={dispatch}
                token={token}
            />
            <button className="block bg-white text-black mt-3" onClick={() => navigate('../../../')}>вернуться к курсам</button>
        </div>
    )
}