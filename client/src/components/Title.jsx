export const Title = ({ type, position, title, onClick, children }) => {
    if (type == '1') {
        return (
            <div className={position + " mb-5 "} onClick={onClick}>
                <h2>{title}</h2>
                {children}
            </div>
        )
    }
    if (type == '2') {
        return (
            <div className="flex justify-between items-center mb-5" onClick={onClick}>
                <div className="flex gap-5 items-center">
                    <h2 className="mb-5">{title}</h2>
                    {children}
                </div>
                <p className="text-right">зз - завершили занятие;<br />оп - отправлено приглашение</p>
            </div>
        )
    }
    if (type == '3') {
        return (
            <div className={`flex mb-5 ${position}`} onClick={onClick}>
                <h3>{title}</h3>
                {children}
            </div>
        )
    }
    if (type == '4') {
        return (
            <div className={`flex mb-5 ${position}`} onClick={onClick}>
                <h4>{title}</h4>
                {children}
            </div>
        )
    }
    if (type == '5') {
        return (
            <div className={`flex mb-5 ${position}`} onClick={onClick}>
                <h5>{title}</h5>
                {children}
            </div>
        )
    }
}