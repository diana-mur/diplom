import { useState } from "react"
import left from "../../assets/toleft.png"
import right from "../../assets/toright.png"

export const Carousel = ({ title, children, summaSlides, numSlides }) => {
    const [currentCount, setCurrentCount] = useState(0)
    const number = Math.floor(summaSlides / numSlides)

    const toRight = () => {
        (currentCount > number - 1) ? setCurrentCount(0) : setCurrentCount(currentCount + 1)
    }

    const toLeft = () => {
        (currentCount == 0) ? setCurrentCount(number) : setCurrentCount(currentCount - 1)
    }

    return (
        <div className="container column">
            <div className="space-between">
                {title}
                <div className="btn-carousel">
                    <button onClick={() => toLeft()} style={{
                        padding: "9px 12px 12px 9px",
                        borderRadius: "8px",
                    }}>
                        <img src={left} alt="" />
                    </button>
                    <button onClick={() => toRight()} style={{
                        padding: "9px 12px 12px 9px",
                        borderRadius: "8px",
                    }}>
                        <img src={right} alt="" />
                    </button>
                </div>
            </div>
            <div className="carousel">
                <div className="slides" style={{
                    transform: `translateX(-${currentCount * 101.33}%)`
                }}>
                    {children}
                </div>
            </div>
        </div>
    )
}