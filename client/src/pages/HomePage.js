import {GeneralNewsList, NewsList, RestaurantsList} from "../components";
 const HomePage = (props) => {
    return (
        <div>
            <div style={{display:'flex', flexDirection: "column"}}>

                <div> <GeneralNewsList/></div>
                <hr/>
                <div> <NewsList/></div>
                <div>
                    <div><RestaurantsList/></div>
                    <div> Топ закладів </div>
                </div>
            </div>

        </div>
    );
}

export {HomePage};
