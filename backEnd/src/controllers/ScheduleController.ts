import { Request, Response } from "express";
import { Event } from "../models/event";
import { Schedule } from "../models/schedule";
export const listCustomerSchedule = async (req: Request, res: Response) => {
    const customerId = req.params.customerId;
    try {
        const schedules = await Schedule.getSchedulesByCustomer(Number(customerId));
        if (schedules.length > 0) {
            return res.status(200).json(schedules);
        }
        return res.status(404).json({ message: 'No schedules found for this customer' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const listUserSchedule = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const schedules = await Schedule.getSchedulesByUser(Number(userId));
        if (schedules.length > 0) {
            return res.status(200).json(schedules);
        }
        return res.status(404).json({ message: 'No schedules found for this user' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const bookSchedule = async (req: Request, res: Response) => {
    const { customerId, eventId, ticketCount } = req.body;
    try {
        const event = await Event.findOne({ where: { event_id: eventId } });
        await Schedule.bookSchedule({ customer_id: customerId, event_id: eventId, ticket_count: ticketCount, user_id: event?.user_id });
        return res.status(200).json({ message: 'Schedule booked successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to book schedule' });
    }
}
export const updateSchedule = async (req: Request, res: Response) => {
    const scheduleData = req.body;
    try {
        await Schedule.updateSchedule(scheduleData.scheduleId, scheduleData);
        return res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to update schedule' });
    }
}
export const deleteSchedule = async (req: Request, res: Response) => {
    const scheduleId = req.body.scheduleId;
    try {
        await Schedule.deleteSchedule(scheduleId);
        return res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Unable to delete schedule' });
    }
}