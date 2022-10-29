import { Router as ExpressRouter } from 'express';
import { autoInjectable } from 'tsyringe';
import IRoute from '../utils/abstractions/route';
import UserController from '../controllers/User.Controller';

// // *==========================================================================
// // *                         Video Routes
// // *==========================================================================

@autoInjectable()
class UserRoutes implements IRoute {
	public path = '/user';
	// eslint-disable-next-line new-cap
	public router = ExpressRouter();

	constructor(private statusController?: UserController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}`, new UserController().createUser);
		this.router.get(
			`${this.path}/:username`,
			new UserController().getUserByUsername
		);
		this.router.put(`${this.path}/:username`, new UserController().updateUser);
		this.router.delete(
			`${this.path}/:username`,
			new UserController().deleteUser
		);
		this.router.post(
			`${this.path}/createWithList`,
			new UserController().createUserWithList
		);
		this.router.post(`${this.path}/login`, new UserController().login);
	}
}

export default UserRoutes;
