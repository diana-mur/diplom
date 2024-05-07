import { useEffect, useState } from "react"
import { get } from "../hooks/fetchForm"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { Title } from "../components/Title"
import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../redux/authSlice"
import CardLesson from "../components/miniCardLesson"
import useWindowSize from "../hooks/windowSize"
import Chart from "../components/Chart"
import Comment from "../components/Comment"
import { dateType } from "../hooks/dateType"

export default function Profile() {
    const [data, setData] = useState([])
    const [lessons, setLessons] = useState([])
    const [result, setResult] = useState([])
    const [comments, setComments] = useState([])
    const [birth, setBirth] = useState('')

    const { width } = useWindowSize()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token)

    let jwt
    token ? jwt = jwtDecode(token) : null

    const id = jwt?.id
    const max = width <= 1280 ? 2 : (width >= 1536 ? 4 : 3)

    useEffect(() => {
        get({ url: `users/find/${id}`, dispatch, token })
            .then(json => {
                setData(json.user);
                setBirth(dateType(json.user.birthday))
            })
        // получаем массив с результатами оконченных занятий
        get({ url: `lessons/allCompliteUser/${id}`, dispatch, token })
            .then(json => {
                json?.lessons.forEach(lesson => {
                    get({ url: `lessons/findLesson/${lesson.lessonId}`, dispatch, token })
                        .then(dataLesson => {
                            setLessons(prev => [...prev, dataLesson.lesson]);
                            if (dataLesson.lesson.typeId == 'тест') {
                                get({ url: `tests/all/${dataLesson.lesson.id}`, dispatch, token })
                                    .then(data => {
                                        console.log(Number(lesson.result));
                                        const res = Number((Number(lesson.result) / Number(data.questions?.length)) * 100)
                                        console.log(res);
                                        setResult(prev => [...prev, { result: res }])
                                    })
                            }
                        })
                })
            })
        get({ url: `comments/userComments/${id}`, dispatch, token })
            .then(json => setComments(json.comments))
    }, [token])

    if (jwt?.roleId == 'ADMIN') return (
        <>
            <div className="container">
                <div className="flex flex-col blue box-shadow rounded-xl py-8 px-8">
                    <Title type={5} title={'Личная информация'} />
                    <p className="font-bold">Фамилия: <span className="font-normal">{data.surname}</span></p>
                    <p className="font-bold">Имя: <span className="font-normal">{data.name}</span></p>
                    <p className="font-bold">Эл. почта: <span className="font-normal">{data.email}</span></p>
                    <p className="font-bold">Дата рождения: <span className="font-normal">{birth}</span></p>
                    {/* <button className="self-start mt-6 mb-3 bg-white text-black" onClick={() => navigate('../redProfile')}>редактировать</button> */}
                    <button className="self-start mt-6 bg-red-400" onClick={() => dispatch(logOut())}>выйти</button>
                </div>
            </div>
        </>
    )

    if (jwt?.roleId == 'USER') return (
        <>
            <div className="container grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col blue box-shadow rounded-xl py-8 px-8 col-span-1">
                    <Title type={5} title={'Личная информация'} />
                    <p className="font-bold">Фамилия: <span className="font-normal">{data.surname}</span></p>
                    <p className="font-bold">Имя: <span className="font-normal">{data.name}</span></p>
                    <p className="font-bold">Эл. почта: <span className="font-normal">{data.email}</span></p>
                    <p className="font-bold">Дата рождения: <span className="font-normal">{birth}</span></p>
                    <button className="self-start mt-6 mb-3 bg-white text-black" onClick={() => navigate('../redProfile')}>редактировать</button>
                    <button className="self-start bg-red-400" onClick={() => dispatch(logOut())}>выйти</button>
                </div>
                <div className="flex flex-col blue box-shadow rounded-xl py-8 px-8 col-span-1 lg:col-span-2 xl:col-span-3">
                    <Title type={5} title={'Пройденные занятия'} position={'items-center justify-between'}>
                        <Link>Все</Link>
                    </Title>
                    <div className={`grid grid-cols-1 flex-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`}>
                        {
                            lessons.length == 0
                                ?
                                <p>У Вас нет пройденных занятий</p>
                                :
                                lessons.slice(0, max).map(item => (
                                    <CardLesson id={item.id} name={item.name} img={item.image} />
                                ))
                        }
                    </div>
                </div>
                <div className="blue box-shadow rounded-xl py-8 px-8 col-span-1 lg:col-span-3 xl:col-span-4">
                    <Chart array={result} x={'уроки'} y={'баллы'} />
                </div>
            </div>
            <div className="container">
                <Title type={3} title={'Мои отзывы'} />
                <div className="flex flex-col gap-3">
                    {
                        comments.map((comm) => (
                            <Comment
                                type={4}
                                token={token}
                                dispatch={dispatch}
                                commentId={comm.id}
                                statusId={comm.statusId}
                                lessonId={comm.lessonId}
                                rating={comm.value}
                                text={comm.text}
                                comments={comments}
                                setComments={setComments}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}