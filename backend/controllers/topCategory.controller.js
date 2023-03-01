const {commentService, userService, restaurantService, topCategoryService} = require("../services");
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
    }
}
