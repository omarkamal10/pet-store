import { Router as ExpressRouter } from 'express';
import { autoInjectable } from 'tsyringe';
import IRoute from '../utils/abstractions/route';
import OrderController from '../controllers/Order.Controller';

// // *==========================================================================
// // *                         Video Routes
// // *==========================================================================

@autoInjectable()
class OrderRoutes implements IRoute {
	public path = '/store';
	// eslint-disable-next-line new-cap
	public router = ExpressRouter();

	constructor(private orderController?: OrderController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/order`, new OrderController().createOrder);
		this.router.get(
			`${this.path}/order/:id`,
			new OrderController().getOrderById
		);
		this.router.get(
			`${this.path}/order/:id`,
			new OrderController().deleteOrder
		);
		this.router.put(
			`${this.path}/inventory`,
			new OrderController().getInventory
		);
	}
}

export default OrderRoutes;
