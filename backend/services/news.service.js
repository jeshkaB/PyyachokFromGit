const News = require("../dataBase/News");
const {newsService, userService, restaurantService} = require("./index");

module.exports = {
    createNews(newsObj) {
        return News.create(newsObj)
    },
    getNews() {
        return News.find()
    },
    getNewsById(comId) {
        return News.findById(comId)
    },
    getNewsByParams(filter) {
        return News.find(filter)
    },
    updateNews(newsId, newsObj) {
        return News.findOneAndUpdate({_id: newsId}, newsObj, {new: true})
    },
    deleteNews(newsId) {
        return News.deleteOne({_id: newsId})
    },
    updateNewsInEntities: async (userId, restId, newNews) => {
        const userNews = await newsService.getNewsByParams({user: userId})
        await userService.updateUser(userId, {
            news: [
                ...userNews,
                newNews
            ]
        });
        const restaurantNews = await newsService.getNewsByParams({restaurant: restId});
        await restaurantService.updateRestaurant(restId, {
            news: [
                ...restaurantNews,
                newNews
            ]
        })
    }

}
