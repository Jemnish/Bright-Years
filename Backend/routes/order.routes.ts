import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, getAllOrders } from '../controller/order.controller';


const OrderRouter  = express.Router();


OrderRouter.post('/create-order',isAuthenticated,createOrder);
OrderRouter.get('/get-orders-admin',isAuthenticated,authorizeRoles('admin'),getAllOrders);



export default OrderRouter;