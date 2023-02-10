import {NewsList} from "../components";
import {useSelector} from "react-redux";


const NewsListPage = (props) => {
    const {errors} = useSelector(state => state.news)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <NewsList/>
        </div>
    );
}

export {NewsListPage};
