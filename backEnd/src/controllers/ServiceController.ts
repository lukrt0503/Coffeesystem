import { Request, Response } from "express";
import { Service } from "../models/service";
import { Image } from "../models/image";
import { GroupImage } from "../models/groupImage";
import { User } from "../models/user";

export const listService = async (req: Request, res: Response) => {
    const services = await Service.listServices();
    if (services.length > 0) {
        return res.status(200).json(services);
    } else {
        return res.status(404).json({ message: 'No services found' });
    }
}
export const addService = async (req: Request, res: Response) => {
    const service = req.body;
    try {
        const image = await Image.findOne({ where: { image: service.imageUrl } });
        const groupImage = await GroupImage.create({ image_id: Number(image?.image_id) })
        const user = await User.findOne({where: {coffeeShopName: service.coffeeShopName}})
        const body = {
            name: service.name,
            description: service.description,
            groupImage_id: groupImage.groupImage_id,
            user_id: user?.user_id
        }
        await Service.addService(body);
        return res.status(200).json({ message: 'Service added successfully' });
    } catch (ex) {
        console.log(ex)
        return res.status(400).json({ message: 'Service not found' });
    }
}
export const detailService = async (req: Request, res: Response) => {
    const id = req.params.id;
    const service = await Service.detailService(Number(id));
    if (service) {
        return res.status(200).json(service);
    } else {
        return res.status(404).json({ message: 'Service not found' });
    }
}
export const updateService = async (req: Request, res: Response) => {
    const service = req.body;
    try {
        await Service.updateService(service);
        return res.status(200).json({ message: 'Service updated successfully' });
    } catch (ex) {
        return res.status(400).json({ message: 'Service not found' });
    }
}
export const deleteService = async (req: Request, res: Response) => {
    const serviceId = req.params.serviceId;
    try {
        await Service.removeService(Number(serviceId));
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (ex) {
        return res.status(400).json({ message: 'Service not found' });
    }
}
export const serviceByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const services = await Service.getUserServices(Number(userId));
    if (services.length > 0) {
        return res.status(200).json(services);
    } else {
        return res.status(404).json({ message: 'No services found for this user' });
    }
}