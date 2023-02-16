const {newsService, fileService, userService, restaurantService} = require("../services");
const uuid = require("uuid");
const {pathImg, statusCode} = require("../constants");
const path = require("path");
const {PATH_NEWS_PHOTO} = require("../constants/pathImg");



module.exports = {
    createNews: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;
            const userNews = await newsService.getNewsByParams({user: _id});
            const restaurantNews = await newsService.getNewsByParams({restaurant: restId});
            if (req.files) {
                const {newsImage} = req.files;
                const fileName = uuid.v4() + '.jpg';
                await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                const newNews = await newsService.createNews({
                    ...req.body,
                    user: _id,
                    restaurant: restId,
                    newsImage: fileName
                });
                await userService.updateUser(_id, {news: [...userNews, newNews]});
                await restaurantService.updateRestaurant(restId, {news: [...restaurantNews, newNews]});

                res.json(newNews)
            } else {
                const newNews = await newsService.createNews({...req.body, user: _id, restaurant: restId});
                await userService.updateUser(_id, {news: [...userNews, newNews]});
                await restaurantService.updateRestaurant(restId, {news: [...restaurantNews, newNews]});

                res.json(newNews)
            }

        } catch (e) {
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
            if (!req.files) {
                const news = await newsService.updateNews(newsId, req.body);
                res.json(news)
            } else {
                const {newsImage} = req.files;
                if (req.news.newsImage) {
                    const fileName = req.news.newsImage;
                    await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                    const news = await newsService.getNewsById(newsId)
                    res.json(news)
                } else {
                    const fileName = uuid.v4() + '.jpg';
                    await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                    const news = await newsService.updateNews(newsId, {...req.body, newsImage:fileName});
                    res.json(news)
                }
            }
        } catch
            (e) {
            next(e)
        }
    },

    deleteNews: async (req, res, next) => {
        try {
            const {newsId} = req.params;
            const {user, restaurant, newsImage} = await newsService.getNewsById(newsId); //ресторан - об’єкт

            await newsService.deleteNews(newsId);

            const userNews = await newsService.getNewsByParams({user});
            const upUserNews = userNews.filter(item => item._id !== newsId)
            await userService.updateUser(user, {news: upUserNews});

            const restaurantNews = await newsService.getNewsByParams({restaurant:restaurant._id});
            const upRestaurantNews = restaurantNews.filter(item => item._id !== newsId)
            await restaurantService.updateRestaurant(restaurant._id, {news: upRestaurantNews});

            res.status(statusCode.NO_CONTENT).json()

            if (newsImage) await fileService.deleteFile(pathImg.PATH_NEWS_PHOTO, newsImage)


        } catch (e) {
            next(e)
        }
    }

}
