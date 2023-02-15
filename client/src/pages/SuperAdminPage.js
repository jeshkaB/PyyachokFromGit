import {useState} from "react";
import {NewsList, RestaurantCreate, RestaurantsForModeration, RestaurantsList} from "../components";
import {useSelector} from "react-redux";

const SuperAdminPage = ()=> {
    const {userId} = useSelector(state => state.auth)
    const [stateRestList,setStateRestList] = useState(false);
    const [stateNewsList,setStateNewsList] = useState(false);

    return (
        <div>
            <div>
                <h3> Заклади, що очікують на модерацію </h3>
                <RestaurantsForModeration/>
            </div>

            <div>
                <RestaurantCreate userId={userId}/>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateRestList(true)}> Редагування закладів </h3>
                {stateRestList &&
                    <div>
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
            <div> GeneralNews</div>
            <div> UsersList</div>
            <div> Analytics</div>

        </div>
    );
}

export {SuperAdminPage};
