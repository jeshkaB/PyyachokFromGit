import {Link} from "react-router-dom";
import {UserInfo} from "../UserInfo/userInfo";
import {useSelector} from "react-redux";

import {app} from "../../services";

import {GoogleSignIn} from "../GoogleSignIn/GoogleSignIn";

import css from './HeaderStyle.module.css'


const Header = () => {
    const {isAuth, authUser, isGoogle} = useSelector(state => state.auth);
    const isManager = true

    return (
        <div className={css.Header}>
            <div className={css.Left}>
               <div className={css.Home}><Link className={css.Link} to={'/home'}> На головну </Link> </div>
                <div className={css.Pyyachok}><Link className={css.Link} to={'/UserEvents'}> Пиячки </Link></div>

            </div>

            <div className={css.Brand}>
                <div className={css.Title}>ПИЯЧОК</div>
                <img height={'60px'} src={'data:image/png;base64,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'} alt={''} />
            </div>


            {!isAuth ?
                <div className={css.Right}>
                    <div>
                        <GoogleSignIn/>
                        <div className={css.Enter}><Link className={css.Link} to={'/login'}>Увійти за email</Link></div>
                    </div>
                    <div className={css.Reg}>
                        <div className={css.Auth}> <Link className={css.Link} to={'/register'}>Зареєструватися</Link></div>
                        <div className={css.Auth}><Link className={css.Link} to={'/register'} state={isManager}>Зареєструватися як менеджер </Link></div>
                    </div>
                </div>
                :
                <div className={css.User}>
                    <UserInfo user={authUser} isGoogle={isGoogle}/>
                </div>}
        </div>
        //
        // <Navbar bg="light" variant="light">
        //     <Container>
        //         <Navbar.Brand href="/login">Пиячок</Navbar.Brand>
        //         <Nav className="me-auto">
        //
        //             <NavLink href="/home">На головну</NavLink>
        //             <NavLink href='/UserEvents'>Пиячок</NavLink>
        //
        //             <NavLink href="/login">Увійти</NavLink>
        //             <NavLink href='/register'>Зареєструватися</NavLink>
        //             <NavLink as={Link} to={'/register'} state={isManager}>Зареєструватися як менеджер закладу</NavLink>
        //         </Nav>
        //     </Container>
        // </Navbar>
    );
}

export {Header}
