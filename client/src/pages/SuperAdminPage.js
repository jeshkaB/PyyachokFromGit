import {useState} from "react";
import {
    GeneralNewsCreate,
    GeneralNewsList,
    NewsList,
    RestaurantCreate,
    RestaurantsForModeration,
    RestaurantsList, UsersList
} from "../components";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const SuperAdminPage = ()=> {
    const navigate = useNavigate();
    // const {errors} = useSelector(state => state.generalNews);
    const {userId} = useSelector(state => state.auth)
    const [stateRestList,setStateRestList] = useState(false);
    const [stateNewsList,setStateNewsList] = useState(false);
    const [stateGenNewsList,setStateGenNewsList] = useState(false);
    const [stateUsers,setStateUsers] = useState(false);

    return (
        <div>
            <div>
                <h3> Заклади, що очікують на модерацію </h3>
                <RestaurantsForModeration/>
            </div>

            <div>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateRestList(true)}> Створення та редагування закладів </h3>
                {stateRestList &&
                    <div>
                        <RestaurantCreate userId={userId}/>
                        <button onClick={() => setStateRestList(false)}>Згорнути</button>
                        <h4>Оберіть заклад для редагування</h4>
                        <RestaurantsList/>
                    </div>}
            </div>

            <div>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateNewsList(true)}> Редагування новин закладів </h3>
                {stateNewsList &&
                    <div>
                        <button onClick={() => setStateNewsList(false)}>Згорнути</button>
                        <h4>Оберіть новину для редагування</h4>
                        <NewsList/>
                    </div>}
            </div>

            <div>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateGenNewsList(true)}> Створення та редагування загальних новин </h3>
                {stateGenNewsList &&
                    <div>
                        <GeneralNewsCreate/>
                        <button onClick={() => setStateGenNewsList(false)}>Згорнути</button>
                        <h4>Оберіть новину для редагування</h4>
                        <GeneralNewsList/>
                    </div>}
            </div>
            <div> <h3 style={{cursor: "pointer"}} onClick={() => setStateUsers(true)}>Користувачі </h3>
                {stateUsers &&
                    <div>
                        <button onClick={() => setStateUsers(false)}>Згорнути</button>
                        <h4>Оберіть користувача для редагування</h4>
                        <UsersList/>
                    </div>}
            </div>
            <div> <h3 style={{cursor: "pointer"}} onClick={() => {navigate('top')}}> Топ закладів </h3>
            </div>
            <div>
                <h3 style={{cursor: "pointer"}} onClick={() => {navigate('views')}}> Статистика переглядів по всім закладам </h3>
            </div>

        </div>
    );
}

export {SuperAdminPage};
