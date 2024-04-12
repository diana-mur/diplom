import { useState } from "react"
import { Background } from "../components/Background"
import { Carousel } from "../components/Carousel/Carousel"
import { MainImage } from "../components/MainImage"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"

export const HomePage = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()

    const cards = [
        {
            title: "Искусство и ремесла",
            elements: [
                "Рисование и живопись",
                "Творческая мастерская (работа с разными материалами)",
                "Графический дизайн",
                "Лепка и резьба по дереву или глине",
                "Ткачество и вышивка",
                "Фотография и видеосъемка",
                "Выжигание по дереву и декоративная роспись",
                "Создание украшений и аксессуаров",
                "Мастер-классы по созданию поделок и подарков"
            ]
        },
        {
            title: "Спорт и физическая активность",
            elements: [
                "Футбол, баскетбол, волейбол",
                "Плавание и водные виды спорта",
                "Теннис и настольный теннис",
                "Художественная гимнастика и акробатика",
                "Йога и стретчинг",
                "Скалолазание и альпинизм"
            ]
        },
        {
            title: "Музыка и танцы",
            elements: [
                "Игра на музыкальных инструментах (гитара, фортепиано, скрипка и т.д.)",
                "Вокал и хоровое пение",
                "Танцевальные направления (бальные, современные, народные танцы)",
                "Уроки дирижирования",
                "Звукозапись и звукорежиссура"
            ]
        },
        {
            title: "Наука и технологии",
            elements: [
                "Робототехника и программирование",
                "Научные эксперименты и лабораторные работы",
                "Компьютерная графика и анимация",
                "Веб-разработка и создание мобильных приложений",
                "Математические и научные кружки"
            ]
        },
        {
            title: "Литература и языки",
            elements: [
                "Литературный кружок (чтение и обсуждение книг)",
                "Изучение иностранных языков",
                "Писательский мастер-класс",
                "Разбор и анализ литературных произведений",
                "Театральная студия"
            ]
        },
    ]

    return (
        <>
        <Header/>
            <section>
                <Background />
                <div className="container space-between aling-center">
                    <div className="leftText">
                        <h1>ДетиВДеле</h1>
                        <p>веб-приложение для детей и подростков,<br /> помогающее выбрать дополнительные<br /> общеразвивающие направления</p>
                    </div>
                    <div className="mainImage">
                        <img src="src/assets/EarthImage.png" alt="" />
                    </div>
                    {/* <MainImage /> */}
                    <div className="rightText">
                        <h3 style={{
                            textAlign: "right"
                        }}>Вместе к звездам:<br /> найди свой путь<br /> в мире возможностей!</h3>
                        <button onClick={token ? () => navigate('/') : () => navigate('/reg')} className="blue">начать</button>
                    </div>
                </div>
            </section>
            <section>
                <Background />
                <div className="container column aling-center">
                    <h2>Кто мы?</h2>
                    <div className="galery">
                        <div className="photo">
                            <img src="src/assets/photo2.png" alt="" />
                        </div>
                        <div className="text">
                            <h6>Управление по культуре и искусству администрации города Оренбурга <span>запустило проект для детей Оренбуржья, который поможет им</span> раскрыть свои таланты и развить навыки</h6>
                        </div>
                        <div className="photo">
                            <img src="src/assets/photo2.png" alt="" />
                        </div>
                        <div className="photo">
                            <img src="src/assets/photo2.png" alt="" />
                        </div>
                        <div className="photo">
                            <img src="src/assets/photo2.png" alt="" />
                        </div>
                        <div className="photo">
                            <img src="src/assets/photo2.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Background />
                <Carousel title={<h2>Направления</h2>} summaSlides={5} numSlides={4}>
                    {
                        cards.map((card, index) => (
                            <div className="card aling-center" key={index}>
                                <h4>{card.title}</h4>
                                <div className="elements">
                                    {
                                        card.elements.map((el, index) => (
                                            <div className="element" key={index}>
                                                <img src="src/assets/star.png" alt="" />
                                                <p>{el}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button>пройти пробное занятие</button>
                            </div>
                        ))
                    }
                </Carousel>
            </section>
        </>
    )
}