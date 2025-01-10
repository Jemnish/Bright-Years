import { NextFunction , Response} from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/errorHandler";
import OrderModel, { IOrder } from "../models/order.model";

// create a new order
export const newOrder = CatchAsyncError(async (data:any, res: Response, next: NextFunction) => {
    
    
    const order = await OrderModel.create(data);

    res.status(201).json({
        success: true,
        order: order,
    });

});

// get all orders
export const getAllOrdersServices = async (res: Response) => {
    const orders = await OrderModel.find().sort({createdAt: -1});

    res.status(201).json({
        success: true,
        orders
    });
};