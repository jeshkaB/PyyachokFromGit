import {useNavigate} from "react-router-dom";

const Tag = ({tag}) => {
    const navigate = useNavigate()

    return (
        <p onClick={()=>navigate('../restaurants', {state:{tag}}) }>
            {tag}
        </p>
    );
};

export {Tag}
