import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get, post } from "../../hooks/fetchForm"
import { jwtDecode } from "jwt-decode"
import { Title } from "../../components/Title"

export default function ReductProfile() {
    const [prevPassword, setPrevPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [data, setData] = useState([])

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    let jwt
    token ? jwt = jwtDecode(token) : null
    const id = jwt?.id

    useEffect(() => {
        get({ url: `users/find/${id}`, dispatch, token })
            .then(json => setData(json.user))
    }, [token])

    const handleChange = (e, attribute) => {
        const newValue = e.target.value
        setData(prev => ({ ...prev, [attribute]: newValue }))
    }

    const changeUser = () => {
        post({
            url: `users/change`, dispatch, token, data: {
                id,
                surname: data.surname,
                name: data.name,
                email: data.email
            }
        })
            .then(json => {
                alert(json.message);
                location.reload()
            })
    }

    const changePassword = () => {
        post({
            url: `users/changePass`, dispatch, token, data: {
                id,
                prevPassword,
                newPassword
            }
        })
            .then(json => {
                alert(json.message);
                location.reload()
            })
    }

    return (
        <div className="container">
            <Title type={1} title={'Изменение профиля'} />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                <div className="flex flex-col blue box-shadow rounded-xl p-7">
                    <Title type={5} title={'Основные данные'} />
                    <input type="text" value={data.surname} onChange={e => handleChange(e, 'surname')} placeholder="Фамилия" />
                    <input type="text" value={data.name} onChange={e => handleChange(e, 'name')} placeholder="Имя" />
                    <input type="email" value={data.email} onChange={e => handleChange(e, 'email')} placeholder="Эл. почта" />
                    <button className="self-start bg-white text-black" onClick={changeUser}>сохранить</button>
                </div>
                <div className="flex flex-col blue box-shadow rounded-xl p-7">
                    <Title type={5} title={'Смена пароля'} />
                    <input type="password" value={prevPassword} onChange={e => setPrevPassword(e.target.value)} placeholder="Старый пароль" />
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Новый пароль" />
                    <button className="self-start bg-white text-black" onClick={changePassword}>сохранить</button>
                </div>
            </div>
        </div>
    )
}