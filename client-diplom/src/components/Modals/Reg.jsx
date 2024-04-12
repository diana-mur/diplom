import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { regThunk } from "../../redux/regSlice"
import { useNavigate } from "react-router-dom"

export const Reg = () => {
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (regState.message) {
            navigate('/auth')
        }
    }, [regState])

    const handleCheckbox = () => {
        setCheckbox(prev => !prev)
    }

    return (
        <div className="container column aling-center">
            <div className="titles">
                <h1>Регистрация</h1>
            </div>
            <div className="form">
                <input type="text" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Фамилия ребенка" required />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя ребенка" required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваша эл. почта" required />
                <input type="date" value={birth} onChange={e => setBirth(e.target.value)} placeholder="Дата рождения ребенка" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
                <div className="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox" checked={checkbox} onChange={handleCheckbox} required />
                    <label htmlFor="checkbox">Я согласен на обработку моих персональных данных и<br /> персональных данных моего ребенка (опекуна) и согласен с<br /> <a>политикой конфиденциальности</a></label>
                </div>
                {
                    regState.error && <p>{regState.error}</p>
                }
                {
                    regState.message && <p>{regState.message}</p>
                }
            </div>
            <button onClick={() => {
                dispatch(regThunk({
                    surname,
                    name,
                    email,
                    birthday: birth,
                    password
                }))
            }}>зарегистрироваться</button>
        </div>

    )
}