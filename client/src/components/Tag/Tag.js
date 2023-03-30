import {useNavigate} from "react-router-dom";

const Tag = ({tag}) => {
    const navigate = useNavigate()

    return (
        <p style={{cursor:'pointer', color: 'teal', margin: 0}} onClick={()=>navigate('../restaurants', {state:{tag}}) }>
            {tag}
        </p>
    );
};

export {Tag}
