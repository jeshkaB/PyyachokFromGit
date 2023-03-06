import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import {useDispatch, useSelector} from "react-redux";
import {restaurantActions, topCategoryActions} from "../../redux";
import {useEffect} from "react";

const TopCard = ({categ}) => {
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, []);

   let restaurantsWithTheCategory=[]
   restaurants.forEach(rest => {
       if (rest.topCategories.includes(categ._id))
           restaurantsWithTheCategory.push(rest)
   })
    const randomIntForRest = () => Math.floor(Math.random() * restaurantsWithTheCategory.length)
    const restaurantForRender = restaurantsWithTheCategory[randomIntForRest()]

    return (
        <div>
            {restaurantForRender &&
                <div>
                    <h4> {categ.title}</h4>
                    <RestaurantCard restaurant={restaurantForRender}/>
                </div>}
        </div>
    );
};

export {TopCard}
