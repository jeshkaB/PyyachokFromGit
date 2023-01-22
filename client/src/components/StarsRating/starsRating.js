import StarRatings from "react-star-ratings/build/star-ratings";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {markActions} from "../../redux";

const StarsRating = ({marksOfRest}) => {

    const {marks} = useSelector(state => state.mark);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(markActions.getAll())
    }, [])


//вибираємо зі всіх оцінок оцінки нашого закладу і виводимо їх середнє арифметичне
    //TODO наскільки цикл в циклі є кошерним рішенням? Можливо краще в БД записувати не айдішки а повні значення?

    const marksOfRestValue = [];
    marksOfRest.forEach(marksOfRestItem => {
        marks.forEach(marksItem => {
            if (marksItem._id === marksOfRestItem) {
                marksOfRestValue.push(marksItem.mark);
            }
        });
    });

    const rating = marksOfRestValue.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / marksOfRestValue.length

// const rating = 3.33333
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
