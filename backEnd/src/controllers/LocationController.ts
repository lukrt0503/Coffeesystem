import { Request, Response } from "express";
import { Location } from "../models/location";

export const listLocation = async (req: Request, res: Response) => {
    try {
        const locations = await Location.listLocation();
        if (locations.length > 0) {
            return res.status(200).json(locations);
        }
        return res.status(404).json({ message: 'No locations found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const listLocationById = async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    try {
        const locations = await Location.listLocationById(Number(locationId));
        if (locations.length > 0) {
            return res.status(200).json(locations);
        }
        return res.status(404).json({ message: 'No locations found for this user' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const addLocation = async (req: Request, res: Response) => {
    const locationData = req.body;
    try {
        await Location.addLocation(locationData);
        return res.status(200).json({ message: 'Location added successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to add location' });
    }
}
export const deleteLocation = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await Location.deleteLocation(id);
        return res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to delete location' });
    }
}