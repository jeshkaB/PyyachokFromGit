const {restaurantService, topCategoryService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    createTopCategory: async (req, res, next) => {
        try {
            const topCategory = await topCategoryService.createTopCategory(req.body);

            res.status(statusCode.CREATE).json(topCategory)

        } catch (e) {
            next(e)
        }
    },
    getTopCategories: async (req, res, next) => {
        try {
            const topCategories = await topCategoryService.getTopCategories();
            res.json(topCategories)

        } catch (e) {
            next(e)
        }
    },
    getTopCategoryById: async (req, res, next) => {
        try {
            const {categId} = req.params;
            const topCategory = await topCategoryService.getTopCategoryById(categId)
            res.json(topCategory)

        } catch (e) {
            next(e)
        }
    },
    updateTopCategory: async (req, res, next) => {
        try {
            const {categId} = req.params;
            const topCategory = await topCategoryService.updateTopCategory(categId, req.body)
            res.json(topCategory)

        } catch (e) {
            next(e)
        }
    },
    deleteTopCategory: async (req, res, next) => {
        try {
            const {categId} = req.params;
            const {restaurants} = await topCategoryService.getTopCategoryByIdWithRest(categId)

            await topCategoryService.deleteTopCategory(categId);

            const updateRestByCategory = async (rest) => {
                const index = rest.topCategories.findIndex(categ => categ = categId);
                if (index !== -1) {
                    const newTopCategories = rest.topCategories.slice(index, 1)
                    await restaurantService.updateRestaurant(rest, {
                        topCategories: newTopCategories
                    });
                }
            }
            if (restaurants) restaurants.map(rest=>updateRestByCategory(rest))

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    },
    addRestaurantInCategory: async (req,res,next)=> {
        try {
            const {categId} = req.params;
            const {restId} = req.query;

            const restaurant = await restaurantService.getRestaurantById(restId)
            const prevCategoriesInRest = restaurant?.topCategories

            await restaurantService.updateRestaurant(restId,{
                topCategories: [
                    ...prevCategoriesInRest,
                    categId
                ]
            })

            const category = await topCategoryService.getTopCategoryById(categId);

            const prevRestaurantsInCategory = category?.restaurants
            await topCategoryService.updateTopCategory(categId, {
                restaurants: [
                    ...prevRestaurantsInCategory,
                    restId
                ]
            })

            res.status(statusCode.CREATE).json()


        }catch (e) {
            next(e)
        }
    },

    removeRestaurantInCategory:
        async (req, res, next) => {
            try {
                const {categId} = req.params;
                const {restId} = req.query;

                const restaurant = await restaurantService.getRestaurantById(restId)
                const prevCategoriesInRest = restaurant.topCategories;
                const newCategoriesInRest = prevCategoriesInRest.filter(categ => categ.toString() !== categId)
                await restaurantService.updateRestaurant(restId,{
                    topCategories: newCategoriesInRest
                })

                const category = await topCategoryService.getTopCategoryById(categId);
                const prevRestaurantsInCategory = category?.restaurants
                const newRestaurantsInCategory = prevRestaurantsInCategory.filter(rest=> rest.toString() !== restId)
                await topCategoryService.updateTopCategory(categId, {
                    restaurants: newRestaurantsInCategory
                })

                res.status(statusCode.NO_CONTENT).json()

            } catch (e) {
                next(e)
            }
        },
}
