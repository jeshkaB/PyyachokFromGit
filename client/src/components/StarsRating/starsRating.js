import StarRatings from "react-star-ratings/build/star-ratings";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {markActions} from "../../redux";

const StarsRating = ({rating}) => {

    return (
        <div>
            <StarRatings
                rating={rating}
                starRatedColor="sandybrown"
                starEmptyColor="darkgrey"
                numberOfStars={5}
                name='rating'
                starDimension='20px'
                starSpacing='2px'
            />
        </div>
    );
}

export {StarsRating}
