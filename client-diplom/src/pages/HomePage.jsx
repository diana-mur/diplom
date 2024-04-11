import { Background } from "../components/Background"
import { MainImage } from "../components/MainImage"

export const HomePage = () => {
    return (
        <>
            <div className="container space-between">
                <div className="leftText">
                    <h1>ДетиВДеле</h1>
                    <p>веб-приложение для детей и подростков,<br /> помогающее выбрать дополнительные<br /> общеразвивающие направления</p>
                </div>
                <Background />
                <div className="mainImage">
                    <img src="src/assets/EarthImage.png" alt="" />
                </div>
                {/* <MainImage /> */}
                <div className="rightText">
                    <h2>Вместе к звездам:<br /> найди свой путь<br /> в мире возможностей!</h2>
                    <button className="blue">начать</button>
                </div>
            </div>
            <div className="container">

            </div>
        </>
    )
}