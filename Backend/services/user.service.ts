import { Response } from "express";
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async(id: string, res: Response) => {
    const userJson = await redis.get(id);
    if(userJson){
        res.status(201).json({
            success: true,
            user: JSON.parse(userJson),
        });
    }
}