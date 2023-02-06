import {StarsRating} from "../../StarsRating/starsRating";

const MyMarksCard = ({mark}) => {

    const {restaurant, mark: myMark} = mark;

    return (
        <div>
            <h2> {restaurant.name}</h2>
            <StarsRating rating={myMark}/>

        </div>
    );
};

export {MyMarksCard}
