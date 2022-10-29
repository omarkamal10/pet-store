import db from '../models';
export default class AuctionRepository {
	public async createAuction(args: any, userId: number) {
		try {
			args.seller = userId;
			const auctionCreated = await db.Auction.create(args);
			return auctionCreated;
		} catch (err) {
			console.log(err);
		}
	}
	public async getAuctionById(args: any) {
		try {
			const auction = await db.Auction.findOne({
				where: { id: args.id },
			});
			return auction;
		} catch (err) {
			console.log(err);
		}
	}
	public async getAuctionByPetIdAndUserId(args: any, userId: number) {
		try {
			const auction = await db.Auction.findOne({
				where: { petId: args, seller: userId },
			});
			return auction;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	public async updateAuction(args: any, params: any) {
		try {
			console.log(args, params);
			const auctionUpdated = await db.Auction.update(args, {
				where: { id: params.id },
			});
			return auctionUpdated;
		} catch (err) {
			console.log(err);
		}
	}
	public async deleteAuction(args: any) {
		try {
			await db.Auction.destroy({ where: { ...args } });
			return 'Deleted!';
		} catch (err) {
			console.log(err);
		}
	}
}
