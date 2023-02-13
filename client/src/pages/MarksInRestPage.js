import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../redux";
import {MarksInRest} from "../components";


const MarksInRestPage = () => {
    const dispatch = useDispatch();

    const {id} = useParams();
    const {restaurant} = useSelector(state => state.restaurant);
    const {marks} = restaurant;

    useEffect(()=>{
        dispatch(restaurantActions.getById(id))
    }, [dispatch])

    return (
        <div>
            <MarksInRest markIds ={marks}/>
        </div>
    );
};

export {MarksInRestPage}
