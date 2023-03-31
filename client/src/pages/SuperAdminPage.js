import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {
    GeneralNewsCreate,
    GeneralNewsList,
    NewsList,
    RestaurantCreate,
    RestaurantsForModeration,
    RestaurantsList, UsersList
} from "../components";

import css from './SuperAdminPage.module.css'

const SuperAdminPage = () => {
    const navigate = useNavigate();
    // const {errors} = useSelector(state => state.generalNews);
    const {userId} = useSelector(state => state.auth)
    const [stateRestList, setStateRestList] = useState(false);
    const [stateNewsList, setStateNewsList] = useState(false);
    const [stateGenNewsList, setStateGenNewsList] = useState(false);
    const [stateUsers, setStateUsers] = useState(false);

    return (
        <div className={css.Hole}>
            <div className={css.Border}>
                <h3> Заклади, що очікують на модерацію </h3>
                <RestaurantsForModeration/>
            </div>

            <div>
                <div className={css.To} onClick={() => setStateRestList(true)}> Створення та редагування закладів</div>
                {stateRestList &&
                    <div>
                        <div className={css.Button}>
                            <button onClick={() => setStateRestList(false)}>Згорнути</button>
                        </div>
                        <RestaurantCreate userId={userId}/>
                        <h4>або</h4>
                        <div className={css.Border}>
                            <h4>Оберіть заклад для редагування</h4>
                            <RestaurantsList/>
                        </div>
                    </div>}
            </div>

            <div>
                <div className={css.To} onClick={() => setStateNewsList(true)}> Редагування новин закладів</div>
                {stateNewsList &&
                    <div>
                        <div className={css.Button}>
                            <button onClick={() => setStateNewsList(false)}>Згорнути</button>
                        </div>
                        <h4>Оберіть новину для редагування</h4>
                        <NewsList/>
                    </div>}
            </div>

            <div>
                <div className={css.To} onClick={() => setStateGenNewsList(true)}> Створення та редагування загальних
                    новин
                </div>
                {stateGenNewsList &&
                    <div>
                        <div className={css.Button}>
                            <button onClick={() => setStateGenNewsList(false)}>Згорнути</button>
                        </div>
                        <GeneralNewsCreate/>
                        <h4>або</h4>
                        <div className={css.Border}>
                            <h4>Оберіть новину для редагування</h4>
                            <GeneralNewsList/>
                        </div>

                    </div>}
            </div>
            <div className={css.To} onClick={() => setStateUsers(true)}>Користувачі</div>
            {stateUsers &&
                <div>
                    <div className={css.Button}>
                        <button onClick={() => setStateUsers(false)}>Згорнути</button>
                    </div>
                    <h4>Оберіть користувача для редагування</h4>
                    <UsersList/>
                </div>}
            <div className={css.To} onClick={() => {navigate('top')}}> Топ закладів</div>
            <div className={css.To} onClick={() => {navigate('views')}}> Статистика переглядів по всім закладам</div>
        </div>
    );
}

export {SuperAdminPage};
