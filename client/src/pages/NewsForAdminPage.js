import {NewsForAdmin} from "../components";
import {useSelector} from "react-redux";


const NewsForAdminPage = () => {
    const {errors} = useSelector(state => state.restaurant);


    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
                 <NewsForAdmin/>
        </div>
    );
};

export {NewsForAdminPage};
