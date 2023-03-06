import {GeneralNewsList, NewsList, RestaurantsList, TopList} from "../components";
 const HomePage = (props) => {
    return (
        <div>
            <div style={{display:'flex', flexDirection: "column"}}>

                <div> <GeneralNewsList/></div>
                <hr/>
                <div> <NewsList/></div>
                <div>
                    <div> <TopList/> </div>
                    <div><RestaurantsList/></div>
                </div>
            </div>

        </div>
    );
}

export {HomePage};
