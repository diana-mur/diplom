import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Title } from "../components/Title"
import StarRating from "../components/starRating"
import { jwtDecode } from "jwt-decode"
import Chart from "../components/Chart"
import { get, post } from "../hooks/fetchForm"
import HandleRating from "../components/handleRating"
import Comment from "../components/Comment"

export default function Lesson() {
    const [data, setData] = useState('')
    const [comments, setComments] = useState([])
    const [complete, setComplite] = useState(false)
    const [commenting, setCommenting] = useState(false)
    const [compliteFilter, setCompliteFilter] = useState(false)
    const [results, setResults] = useState([])
    const [textComment, setTextComment] = useState('')
    const [userRating, setUserRating] = useState(0)

    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate()
    const location = useLocation()
    const lessonId = location.pathname.split('/')[2]

    let jwt
    token ? jwt = jwtDecode(token) : null

    useEffect(() => {
        get({ url: `lessons/findLesson/${lessonId}`, dispatch, token })
            .then(json => setData(json.lesson));
        get({ url: `comments/allForLesson/${lessonId}`, dispatch, token })
            .then(json => {
                const isComment = json?.comments.some(com => com.userId == id);
                setCommenting(isComment);
                setComments(json.comments)
            })
        get({ url: `comments/filter`, dispatch, token })
            .then(json => {
                const isCommentFilter = json?.comments.some(com => com.userId == id);
                setCompliteFilter(isCommentFilter)
            })
        get({ url: `lessons/allCompliteUser/${id}`, dispatch, token })
            .then(json => {
                const isComplite = json?.lessons.some(les => les.id == lessonId);
                setComplite(isComplite)
            })
        get({ url: `lessons/resultsLesson/${lessonId}`, dispatch, token })
            .then(json => setResults(json.lessons))

    }, [])

    let sumRating = 0
    for (let index = 0; index < comments.length; index++) {
        sumRating += Number(comments[index].value)
    }
    const rating = sumRating / comments.length

    const handleButtonPostComment = () => {
        post({
            url: `comments/create`, dispatch, token, data: {
                userId: id,
                lessonId,
                value: userRating,
                text: textComment
            }
        })
        alert('Ваш комментарий отправлен на обработку.')
        location.reload()
    }

    return (
        <>
            <div className="container">
                <div className="">
                    <div className="">
                        <h2>{data.name}</h2>
                        <p className="mb-5">{data.categoryId}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mb-3 lg:grid-cols-2">
                    <div className="w-full rounded-2xl blue aspect-video box-shadow">
                        <img src={`http://localhost:8080/${data.image}`} alt="изображение" />
                    </div>
                    <p>{data.content}</p>
                </div>
                <p>Форма пробного урока: {data.typeId}</p>
                {
                    jwt?.roleId == "USER" &&
                    <div className="flex">
                        <button className="bg-blue-300 ml-auto" onClick={() => navigate(`quiz`)}>{complete ? "пройти повторно" : "начать"}</button>
                    </div>
                }
            </div>
            {
                complete && !commenting && !compliteFilter &&
                <div className="container">
                    <Title type={3} title={'Ваша оценка'} />
                    <HandleRating onRatingChange={setUserRating} />
                    <textarea type="text" value={textComment} onChange={e => setTextComment(e.target.value)} className="mb-5" placeholder="Текст отзыва" required />
                    <button className="bg-white text-black" onClick={handleButtonPostComment}>отправить</button>
                </div>
            }
            {
                jwt?.roleId == "ADMIN" &&
                <div className="container">
                    <Title type={3} title={'Статистика по вопросам'} />
                    <div className="grid grid-cols-1 gap-5 mb-3 lg:grid-cols-2">
                        <div className="blue box-shadow rounded-2xl p-4" >
                            <Title type={5} title={'Правильность ответов'} />
                            <Chart array={results} max={100} x={'Ученики'} y={'Проценты'} />
                        </div>

                    </div>
                </div>
            }
            <div className="container">
                <Title type={3} title={'Отзывы'} position={'flex items-end gap-4'} >
                    <p>({comments.length})</p>
                    <StarRating rating={rating} />
                </Title>
                <div className="flex flex-col gap-4">
                    {
                        comments.map((comm) => (
                            <Comment type={2} key={comm.id} token={token} dispatch={dispatch} lessonId={lessonId} userId={comm.userId} rating={comm.value} text={comm.text} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}