export const Title = ({ type, position, title, children }) => {
    if (type == '1') {
        return (
            <div className={position + " mb-5 "}>
                <h2>{title}</h2>
                {children}
            </div>
        )
    }
    if (type == '2') {
        return (
            <div className="flex justify-between items-center mb-5">
                <h2 className="mb-5">{title}</h2>
                <p className="text-right">зз - завершили занятие;<br />оп - отправлено приглашение</p>
            </div>
        )
    }
    if (type == '3') {
        return (
            <div className={`flex ${position}`}>
                <h3>{title}</h3>
                {children}
            </div>
        )
    }
}