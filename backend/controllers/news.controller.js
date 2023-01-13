const {newsService, fileService, userService, restaurantService, commentService} = require("../services");
const uuid = require("uuid");
const {pathImg, statusCode} = require("../constants");

module.exports = {
    createNews: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.params;
            if (req.files) {
                const {buffer} = req.files[0];
                const fileName = uuid.v4() + '.jpg';
                await fileService.writeFile(pathImg.PATH_NEWS_PHOTO, fileName, buffer);
                const newNews = await newsService.createNews({...req.body, user:_id, restaurant: restId, newsImage: fileName });
                await newsService.updateNewsInEntities(_id,restId,newNews)
                res.json(newNews)
            }
            else {const newNews = await newsService.createNews({...req.body, user:_id, restaurant: restId });
                await newsService.updateNewsInEntities(_id,restId,newNews)
                res.json(newNews)
            }

        }catch (e) {
          next(e)
        }
    },

    getNews: async (req, res, next) => {
        try {
            const news = await newsService.getNews();
            res.json(news)

        } catch (e) {
            next(e)
        }
    },
    getNewsById: async (req, res, next) => {
        try {
            const {newsId} = req.params;
            const news = await newsService.getNewsById(newsId);
            res.json(news)
        } catch (e) {
            next(e)
        }
    },
    updateNews: async (req, res, next) => {
        try {
            const {newsId} = req.params;
            const news = await newsService.updateNews(newsId, req.body);

            res.json(news)

            if (req.files) {
                const fileName = news.newsImage;
                const {buffer} = req.files[0];
                await fileService.writeFile(pathImg.PATH_NEWS_PHOTO, fileName, buffer)
            }

        } catch (e) {
            next(e)
        }
    },

    deleteNews: async (req, res, next) => {
        try {
            const {newsId} = req.params;
            const {user,restaurant,newsImage} = await newsService.getNewsById(newsId);

            await newsService.deleteNews(newsId);

            const userNews = await newsService.getNewsByParams({user});
            const upUserNews = userNews.filter(item=>item._id!==newsId)
            await userService.updateUser(user, {
                news: upUserNews
            });

            const restaurantNews = await newsService.getNewsByParams({restaurant});
            const upRestaurantNews = restaurantNews.filter(item=>item._id !==newsId)
            await restaurantService.updateRestaurant(restaurant, {
                news: upRestaurantNews
            });

            res.status(statusCode.NO_CONTENT)

            if (newsImage) await fileService.deleteFile(pathImg.PATH_NEWS_PHOTO, newsImage)


        } catch (e) {
            next(e)
        }
    }
}
