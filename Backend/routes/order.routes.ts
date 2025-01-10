import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createOrder } from '../controller/order.controller';


const OrderRouter  = express.Router();


OrderRouter.post('/create-order',isAuthenticated,createOrder);


export default OrderRouter;