import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authThunk } from "../../redux/authSlice"

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <div className="container column aling-center">
            <div className="titles">
                <h1 style={{
                    marginBottom: "40px"
                }}>Вход</h1>
            </div>
            <div className="form">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Эл. почта" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
                {
                    authState.error && <p style={{ color: "red" }}>{authState.error}</p>
                }
                {
                    authState.message && <p style={{ color: "red" }}>{authState.message}</p>
                }
            </div>
            <button onClick={() => {
                dispatch(authThunk({
                    email,
                    password
                }))
            }}>войти</button>
        </div>
    )
}