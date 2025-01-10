import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

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

// get all users
export const getAllUsersService = async (res: Response) => {
    const users = await userModel.find().sort({createdAt: -1});

    res.status(201).json({
        success: true,
        users
    });
}

// update user role
export const updateUserRoleService = async (id: string, role: string, res: Response) => {
    const user = await userModel.findByIdAndUpdate(id,{role}, {new: true});

    res.status(201).json({
        success: true,
        user
    });
    
}