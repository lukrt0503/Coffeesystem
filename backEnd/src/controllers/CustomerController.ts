import { Request, Response } from "express";
import { Customer } from '../models/customer';
export const listCustomer = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.getCustomers();
        if (customers.length > 0) {
            return res.status(200).json(customers);
        }
        return res.status(404).json({ message: 'Customers not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const searchCustomer = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const customers = await Customer.searchCustomers(name);
        if (customers.length > 0) {
            return res.status(200).json(customers);
        }
        return res.status(404).json({ message: 'Customers not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const detailCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const detailBanner = await Customer.detailCustomer(Number(id));
        return res.status(200).json(detailBanner);
    } catch (error) {
        return res.status(400).json({ message: 'Bad request' });
    }
}
export const updateCustomer = async (req: Request, res: Response) => {
    try {
        await Customer.updateCustomer(req.body);
        return res.status(200).json({ message: 'Banner update successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Bad request' });
    }
}
export const bannedCustomer = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.getCustomersBanned();
        if (customers.length > 0) {
            return res.status(200).json(customers);
        }
        return res.status(404).json({ message: 'Banned customers not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}