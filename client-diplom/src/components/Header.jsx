import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

export const Header = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <header>
            <Link to={'/home'} className="logo">ДетиВДеле</Link>
            <button onClick={token ? () => navigate('/profile') :
            location.pathname == '/auth' ? () => navigate('/reg') : () => navigate('/auth')} className="white">{token ? "профиль" : location.pathname == '/auth' ? "зарегистрироваться" : "вход"}</button>
        </header>
    )
}