
import {StarsRating} from "../StarsRating/starsRating";

const MarksCard = ({mark}) => {
    const date = mark.createdAt.slice(0, 10)

    return (
        <div>
            {mark && <div>
                <StarsRating rating={mark.mark}/>
                <p>{mark.user?.name}</p>
                <p>{date}</p>
            </div>}

        </div>
    );
};

export {MarksCard}
