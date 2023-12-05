import { Request, Response } from "express";
import { News } from "../models/news";
import { GroupImage } from "../models/groupImage";
import { Image } from "../models/image";
export const listNews = async (req: Request, res: Response) => {
    try {
        const news = await News.listNews();
        return res.status(200).json(news);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const detailNews = async (req: Request, res: Response) => {
    const newsId = req.params.id;
    try {
        const news = await News.detailNews(Number(newsId));
        if (news) {
            return res.status(200).json(news);
        }
        return res.status(404).json({ message: 'News not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const addNews = async (req: Request, res: Response) => {
    const { description, imageUrl, title, userId } = req.body;
    try {
        const image = await Image.findOne({ where: { image: imageUrl } });
        const groupImage = await GroupImage.create({ image_id: Number(image?.image_id) })
        await News.addNews({ title: title, description: description, user_id: userId, groupImage_id: groupImage.groupImage_id, created_date: new Date() });
        return res.status(200).json({ message: 'News created successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to create news' });
    }
}
export const updateNews = async (req: Request, res: Response) => {
    const newsData = req.body;
    try {
        const news = await News.findByPk(newsData.newsId)
        if (news) {
            await news.update(newsData);
        }
        return res.status(200).json({ message: 'News updated successfully' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Unable to update news' });
    }
}
export const deleteNews = async (req: Request, res: Response) => {
    const newsId = req.params.id;
    try {
        await News.deleteNews(Number(newsId));
        return res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to delete news' });
    }
}
export const newsByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const userNews = await News.getUserNews(Number(userId));
        if (userNews.length > 0) {
            return res.status(200).json(userNews);
        }
        return res.status(404).json({ message: 'No news found for this user' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}