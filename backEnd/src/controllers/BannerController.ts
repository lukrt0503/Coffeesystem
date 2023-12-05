import { Request, Response } from "express";
import { Banner } from "../models/banner";
export const listBanner = async (req: Request, res: Response) => {
    try {
        const banners = await Banner.listBanner();
        if (banners.length > 0) {
            return res.status(200).json(banners);
        }
        return res.status(404).json({ message: 'No banners found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const addBanner = async (req: Request, res: Response) => {
    try {
        const { bannerId, userId, imageUrl } = req.body;
        await Banner.addBanner({ banner_id: bannerId, user_id: userId, image_url: imageUrl });
        return res.status(200).json({ message: 'Banner added successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Bad request' });
    }
}
export const detailBanner = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const detailBanner = await Banner.detailBanner(Number(id));
        return res.status(200).json(detailBanner);
    } catch (error) {
        return res.status(400).json({ message: 'Bad request' });
    }
}
export const updateBanner = async (req: Request, res: Response) => {
    try {
        const { bannerId, imageUrl, userId } = req.body;
        const banner = await Banner.findByPk(bannerId);
        if (banner) {
            await banner.update({
                image_url: imageUrl, user_id: userId
            });
        }
        return res.status(200).json({ message: 'Banner update successfully' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Bad request' });
    }
}
export const deleteBanner = async (req: Request, res: Response) => {
    const bannerId = parseInt(req.params.id); // Lấy bannerId từ đường dẫn URL
    try {
        await Banner.destroy({
            where: { banner_id: bannerId },
        });
        return res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete banner' });
    }
}