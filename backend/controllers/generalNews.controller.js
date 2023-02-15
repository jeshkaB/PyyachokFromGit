const {fileService, userService, generalNewsService} = require("../services");
const uuid = require("uuid");
const {pathImg, statusCode} = require("../constants");
const path = require("path");
const {PATH_NEWS_PHOTO} = require("../constants/pathImg");

module.exports = {
    createNews: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const userNews = await generalNewsService.getNewsByParams({user: _id});

            if (req.files) {
                const {newsImage} = req.files;
                const fileName = uuid.v4() + '.jpg';
                await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                const newNews = await generalNewsService.createNews({
                    ...req.body,
                    user: _id,
                    newsImage: fileName
                });
                await userService.updateUser(_id, {news: [...userNews, newNews]});

                res.json(newNews)
            } else {
                const newNews = await generalNewsService.createNews({...req.body, user: _id});
                await userService.updateUser(_id, {news: [...userNews, newNews]});

                res.json(newNews)
            }
        } catch (e) {
            next(e)
        }
    },

    getNews: async (req, res, next) => {
        try {
            const news = await generalNewsService.getNews();
            res.json(news)

        } catch (e) {
            next(e)
        }
    },
    getNewsById: async (req, res, next) => {
        try {
            const {newsId} = req.params;
            const news = await generalNewsService.getNewsById(newsId);
            res.json(news)
        } catch (e) {
            next(e)
        }
    },
    updateNews: async (req, res, next) => {
        try {

            const {newsId} = req.params;
            if (!req.files) {
                const news = await generalNewsService.updateNews(newsId, req.body);
                res.json(news)
            } else {
                const {newsImage} = req.files;
                if (req.news.newsImage) {
                    const fileName = req.news.newsImage;
                    await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                } else {
                    const fileName = uuid.v4() + '.jpg';
                    await newsImage.mv(path.resolve(__dirname, '..', PATH_NEWS_PHOTO, fileName));
                    const news = await generalNewsService.updateNews(newsId, {...req.body, newsImage:fileName});
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
            const {user, newsImage} = await generalNewsService.getNewsById(newsId);

            await generalNewsService.deleteNews(newsId);

            const userNews = await generalNewsService.getNewsByParams({user});
            const upUserNews = userNews.filter(item => item._id !== newsId)
            await userService.updateUser(user, {news: upUserNews});

            if (newsImage) await fileService.deleteFile(pathImg.PATH_NEWS_PHOTO, newsImage)
            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }

}
