import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header>
            <Link className="logo">ДетиВДеле</Link>
            <button className="white">вход</button>
        </header>   
    )
}