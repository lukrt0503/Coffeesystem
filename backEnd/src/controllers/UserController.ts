import { Request, Response } from "express";
import { User } from "../models/user";
export const listUser = async (req: Request, res: Response) => {
    const users = await User.getUsers();
    if (users.length > 0) {
        return res.status(200).json(users);
    } else {
        return res.status(404).json({ message: 'No users found' });
    }
}
export const searchUser = async (req: Request, res: Response) => {
    const name = req.params.name;
    const users = await User.searchUsers(name);
    if (users.length > 0) {
        return res.status(200).json(users);
    } else {
        return res.status(404).json({ message: 'No users found' });
    }
}
export const detailUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.detailUser(Number(id));
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
}
export const updateUser = async (req: Request, res: Response) => {
    const user = req.body;
    try {
        await User.updateUser(user)
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (ex) {
        console.log(ex)
        return res.status(400).json({ message: 'User not found' });
    }
}
export const bannedUser = async (req: Request, res: Response) => {
    const users = await User.getUsersBanned();
    if (users.length > 0) {
        return res.status(200).json(users);
    } else {
        return res.status(404).json({ message: 'No banned users found' });
    }
}