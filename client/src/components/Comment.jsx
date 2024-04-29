import { useSelector } from "react-redux"
import StarRating from "./starRating"
import { useEffect, useState } from "react"

export default function Comment({ commentId, type, lessonId, userId, rating, text, comments, setComments }) {
    const [nameLesson, setNameLesson] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const token = useSelector((state) => state.auth.token)

    useEffect(() => {
        fetch(`http://localhost:8080/api/lessons/findLesson/${lessonId}`)
            .then(data => data.json())
            .then(json => setNameLesson(json.lesson.name));

        fetch(`http://localhost:8080/api/users/find/${userId}`)
            .then(data => data.json())
            .then(json => {
                setName(json.user.name);
                setSurname(json.user.surname)
            })
    }, [])


    function handleStatusChange(statusId) {
        fetch(`http://localhost:8080/api/comments/changeStatus`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                commentId,
                statusId
            })
        })
        setComments(comments.filter(comm => comm.id != commentId))
    }

    if (type == 1) {
        return (
            <div className="flex flex-col gap-7 blue box-shadow rounded-2xl p-4 sm:grid sm:gap-0 sm:items-center sm:grid-cols-4 lg:grid-cols-7">
                <div className="block lg:grid lg:grid-cols-3 lg:col-span-3">
                    <h6 className="">{nameLesson}</h6>
                    <h6 className="">{name} {surname}</h6>
                    <StarRating rating={rating} />
                </div>
                <p className="col-span-2 lg:col-span-3">{text}</p>
                <div className="flex flex-col gap-3">
                    <button className="bg-white text-black"
                        onClick={() => handleStatusChange("Принят")}>принять</button>
                    <button className="bg-red-400"
                        onClick={() => handleStatusChange("Отклонен")}>отклонить</button>
                </div>
            </div>
        )
    }
    if (type == 2) {
        return (
            <div className="grid">

            </div>
        )
    }
    if (type == 3) {
        return (
            <div className="grid">

            </div>
        )
    }
    if (type == 4) {
        return (
            <div className="grid">

            </div>
        )
    }
}