import { useEffect, useState } from "react"
import { get } from "../../hooks/fetchForm"
import { useDispatch, useSelector } from "react-redux"
import { Title } from "../../components/Title"
import { MainCardLesson } from "../../components/mainCardLesson"

export default function MainUser() {
    const [cards, setCards] = useState([])
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        get({ url: 'lessons/all', dispatch, token })
            .then(json => setCards(json.filteredLessons))
    }, [])

    return (
        <>
            <div className="container">
                <Title type={1} title={"Занятия"} />
                {
                    cards?.map((category, index) => (
                        <div className="" key={index}>
                            <Title type={3} position={'mt-5'} title={category.name} />
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={category.id}>
                                {
                                    category?.lessons.map(card => (
                                        <MainCardLesson
                                            key={card.id}
                                            id={card.id}
                                            nameLesson={card.name}
                                            img={card.image}
                                            numStudents={card.finish}
                                            numInvite={card.invite}
                                            ageUnder={card.ageUnder}
                                            ageUp={card.ageUp}
                                            visible={false} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}