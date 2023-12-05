import { Request, Response } from "express";
import { Location } from "../models/location";
import { Event } from "../models/event";
import { GroupImage } from "../models/groupImage";
import { Image } from "../models/image";
export const listEvent = async (req: Request, res: Response) => {
    try {
        const events = await Event.getEvents();
        if (events.length > 0) {
            return res.status(200).json(events);
        }
        return res.status(404).json({ message: 'No events found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const addEvent = async (req: Request, res: Response) => {
    const { userId, name, address, imageUrl, date, startTime, endTime, seatCount, price, description, fromAge, toAge } = req.body;
    try {
        const image = await Image.findOne({ where: { image: imageUrl } });
        const groupImage = await GroupImage.create({ image_id: Number(image?.image_id) })
        const location = await Location.create({ address: address, user_id: userId })
        await Event.addEvent({ name: name, location_id: location.location_id, date: date, groupImage_id: groupImage.groupImage_id, description: description || "", start_time: startTime, end_time: endTime, to_age: toAge, from_age: fromAge, seat_count: seatCount, price: price, user_id: userId });
        return res.status(200).send('Event added successfully');
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Error adding event' });
    }
}
export const detailEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const eventInfo = await Event.getDetailEvent(Number(eventId));
        if (eventInfo) {
            return res.status(200).json(eventInfo);
        }
        return res.status(404).json({ message: 'Event not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const eventInfo = req.body;
        const event = await Event.findByPk(eventInfo.eventId)
        if (event) {
            await event.update(eventInfo)
        }
        return res.status(200).send('Event updated successfully');
    } catch (error) {
        return res.status(400).json({ message: 'Error updating event' });
    }
}
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        await Event.deleteEvent(Number(eventId));
        return res.status(200).send('Event deleted successfully');
    } catch (error) {
        return res.status(400).json({ message: 'Error deleting event' });
    }
}
export const eventByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userEvents = await Event.getUserEvents(Number(userId));
        if (userEvents.length > 0) {
            return res.status(200).json(userEvents);
        }
        return res.status(404).json({ message: 'No events found for the user' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}