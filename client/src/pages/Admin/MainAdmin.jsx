import { useEffect, useState } from "react"
import { Title } from "../../components/Title"
import { MainCardLesson } from "../../components/mainCardLesson"
import image from "../../assets/img1.png"
import plus from "../../assets/plus.png"
import { useNavigate } from "react-router-dom"
import Comment from "../../components/Comment"
import StarRating from "../../components/starRating"

export const MainAdmin = () => {
    const [cards, setCards] = useState([])
    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8080/api/lessons/all')
            .then(data => data.json())
            .then(json => setCards(json.lessons))
        fetch('http://localhost:8080/api/comments/filter')
            .then(data => data.json())
            .then(json => setComments(json.comments))
    }, [])

    return (
        <>
            <div className="container">
                <Title type={2} title={"Занятия"} />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        cards?.map(card => (
                            <MainCardLesson
                                key={card.id}
                                id={card.id}
                                nameLesson={card.name}
                                img={image}
                                numStudents={card.finish}
                                numInvite={card.invite}
                                ageUnder={card.ageUnder}
                                ageUp={card.ageUp} />
                        ))
                    }
                    <button className="blue box-shadow flex justify-center items-center" onClick={() => navigate(`/newLesson`)}>
                        <div className="bg-white flex justify-center items-center p-5 rounded-[50%]">
                            <img src={plus} alt="" />
                        </div>
                    </button>
                </div>
            </div>
            <div className="container">
                <Title type={1} title={'Модерация отзывов'} />
                {
                    comments?.map((comm) => (
                        <Comment type={1} key={comm.id} commentId={comm.id} lessonId={comm.lessonId} userId={comm.userId} rating={comm.value} text={comm.text} comments={comments} setComments={setComments} />
                    ))
                }
                <StarRating rating={2} />
            </div>
        </>
    )
}