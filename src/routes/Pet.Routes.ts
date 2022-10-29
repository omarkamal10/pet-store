import { Router as ExpressRouter } from 'express';
import { autoInjectable } from 'tsyringe';
import IRoute from '../utils/abstractions/route';
import PetController from '../controllers/Pet.Controller';
import { Authenticate } from '../middleware';

// // *==========================================================================
// // *                         Video Routes
// // *==========================================================================

@autoInjectable()
class PetRoutes implements IRoute {
	public path = '/pet';
	// eslint-disable-next-line new-cap
	public router = ExpressRouter();

	constructor(private petController?: PetController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}`,
			Authenticate(),
			new PetController().createPet
		);
		this.router.get(`${this.path}/:id`, new PetController().getPetById);
		this.router.get(`${this.path}/:status`, new PetController().getPetByStatus);
		this.router.put(
			`${this.path}/:id`,
			Authenticate(),
			new PetController().updatePet
		);
		this.router.delete(
			`${this.path}/:id`,
			Authenticate(),
			new PetController().deletePet
		);
	}
}

export default PetRoutes;
