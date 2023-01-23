import {NewsList, RestaurantsList} from "../components";
 const HomePage = (props) => {
    return (
        <div>
            <div style={{display:'flex', flexDirection: "column"}}>

                <div> <NewsList/></div>
                <div>

                    <div> form search</div>
                    <div> filter</div>
                    <div><RestaurantsList/></div>
                    <div> Топ закладів </div>

                </div>
            </div>

        </div>
    );
}

export {HomePage};
