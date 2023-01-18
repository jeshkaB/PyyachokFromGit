import './HeaderStyle.css'

function Header(props) {
    return (
        <div className={'Header'}>
            <div>TO MAIN PAGE</div>
            <div>ПИЯЧОК</div>
            <div>
                <div>Увійти</div>
                <div>Зареєструватися</div>
                <div>USER</div>
            </div>
        </div>
    );
}

export {Header}
