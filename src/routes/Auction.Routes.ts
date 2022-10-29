import { Router as ExpressRouter } from 'express';
import { autoInjectable } from 'tsyringe';
import IRoute from '../utils/abstractions/route';
import AuctionController from '../controllers/Auction.Controller';
import { Authenticate } from '../middleware';
// // *==========================================================================
// // *                         Video Routes
// // *==========================================================================

@autoInjectable()
class AuctionRoutes implements IRoute {
	public path = '/auction';
	// eslint-disable-next-line new-cap
	public router = ExpressRouter();

	constructor(private auctionController?: AuctionController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}`,
			Authenticate(),
			new AuctionController().createAuction
		);
		this.router.get(`${this.path}/:id`, new AuctionController().getAuctionById);
		this.router.post(
			`${this.path}/:id/bid`,
			Authenticate(),
			new AuctionController().placeBid
		);
		this.router.get(
			`${this.path}/bid/all`,
			Authenticate(),
			new AuctionController().getAllBids
		);
		this.router.get(
			`${this.path}/bid/pet/:id`,
			Authenticate(),
			new AuctionController().getPetBids
		);
	}
}

export default AuctionRoutes;
