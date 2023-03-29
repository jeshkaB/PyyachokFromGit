import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {Button} from "react-bootstrap";

import {GeneralNews} from "../components";

const GeneralNewsPage = () => {
    const navigate = useNavigate()
    const {errors} = useSelector(state => state.generalNews)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
                <Button variant="outline-secondary" onClick={() => navigate('/generalNews')}>Всі новини </Button>
            <div><GeneralNews/></div>
        </div>
    );
}

export {GeneralNewsPage}
