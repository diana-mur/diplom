import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { Title } from "../components/Title"
import StarRating from "../components/starRating"
import { jwtDecode } from "jwt-decode"

export default function Lesson() {
    const [data, setData] = useState('')
    const [comments, setComments] = useState([])
    const [completeArray, setCompliteArray] = useState([])
    const [complete, setComplite] = useState(false)

    const id = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)
    const location = useLocation()
    const lessonId = location.pathname.split('/')[2]

    let jwt
    token ? jwt = jwtDecode(token) : null

    useEffect(() => {
        fetch(`http://localhost:8080/api/lessons/findLesson/${lessonId}`)
            .then(data => data.json())
            .then(json => setData(json.lesson));
        fetch(`http://localhost:8080/api/comments/allForLesson/${lessonId}`)
            .then(data => data.json())
            .then(json => setComments(json.comments))
        fetch(`http://localhost:8080/api/lessons/allCompliteUser/${id}`)
            .then(data => data.json())
            .then(json => setCompliteArray(json.lessons))

    }, [])

    let sumRating
    for (let index = 0; index < comments.length; index++) {
        sumRating += value
    }
    const rating = sumRating / comments.length

    return (
        <>
            <div className="container">
                <h2>{data.name}</h2>
                <p className="mb-5">{data.categoryId}</p>
                <div className="grid grid-cols-1 gap-5 mb-3 lg:grid-cols-2">
                    <div className="w-full rounded-2xl blue aspect-video box-shadow">
                        <img src={data.image} alt="изображение" />
                    </div>
                    <p>{data.content}</p>
                </div>
                <p>Форма пробного урока: {data.typeId}</p>
                {
                    jwt?.roleId != "ADMIN" &&
                    <div className="flex">
                        <button className="bg-blue-300 ml-auto">начать</button>
                    </div>
                }
            </div>
            {
                jwt?.roleId == "ADMIN" &&
                <div className="container">
                    <Title type={3} title={'Статистика по вопросам'} />
                </div>
            }
            <div className="container">
                <Title type={3} title={'Отзывы'} position={'flex items-center gap-4'} >
                    <p>({comments.length})</p>
                    <StarRating rating={5} />
                </Title>
            </div>
        </>
    )
}