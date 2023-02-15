import StarRatings from "react-star-ratings/build/star-ratings";
import {useDispatch} from "react-redux";
import {markActions} from "../../../redux";
import {useState} from "react";

const MyMarksCard = ({mark}) => {
    const dispatch = useDispatch()
    const {restaurant, mark: myMark, _id} = mark;
    const [markStars, setMarkStars] = useState(myMark)

    const changeMark = async (value)=>{
        setMarkStars(value)
        await dispatch(markActions.updateById({id: _id, markObj:{'mark':value}}))
    }
    return (
        <div>
            <h2> {restaurant.name}</h2>
            <StarRatings rating={markStars} changeRating={value=>changeMark(value)}/>

        </div>
    );
};

export {MyMarksCard}
