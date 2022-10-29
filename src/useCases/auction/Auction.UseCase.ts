import AuctionRepository from '../../infrastructure/repositories/Auction.Repository';
import { autoInjectable } from 'tsyringe';
import { AppResponse } from '../../helpers';
import db from '../../infrastructure/models';

@autoInjectable()
export default class AuctionUseCase {
	constructor(private auctionRepository?: AuctionRepository) {}

	async createAuction(args: any, userId: number) {
		try {
			const auctionWithSamePetIdAndSeller =
				await this.auctionRepository?.getAuctionByPetIdAndUserId(
					args.petId,
					userId
				);
			if (auctionWithSamePetIdAndSeller)
				throw Error('Pet already in another auction');
			const auctionCreated = await this.auctionRepository?.createAuction(
				args,
				userId
			);
			return AppResponse({ data: auctionCreated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async getAuctionById(args: any) {
		try {
			const auction = await this.auctionRepository?.getAuctionById(args);
			return AppResponse({ data: auction });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async placeBid(args: any, params: any, userId: number) {
		try {
			const { amount } = args;
			const auction = await this.auctionRepository?.getAuctionById(params);

			if (userId === auction.seller) throw Error('Cannot bid on own auction');
			if (userId === auction.highestBid.bidder)
				throw Error('Already Highest Bidder');
			if (amount <= auction.highestBid.amount) {
				throw Error(
					`Your bid must be higher than ${auction.highestBid.amount}`
				);
			}

			if (!auction.bidsHistory) auction.bidsHistory = [];
			auction.bidsHistory.push({
				amount,
				bidder: userId,
			});

			auction.highestBid.amount = amount;
			auction.highestBid.bidder = userId;

			await this.auctionRepository?.updateAuction(auction.dataValues, params);
			return AppResponse({ data: auction });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async getAllBids(userId: number) {
		try {
			const data: Array<object> = [];
			const userAuctions = await db.Auction.findAll({
				where: { seller: userId },
			});
			await Promise.all(
				userAuctions.map(async (userAuction: any) => {
					data.push({
						petId: userAuction.petId,
						bids: userAuction.bidsHistory,
					});
				})
			);
			return AppResponse({ data });
		} catch (err) {
			return AppResponse({ err });
		}
	}
	async getPetBids(params: any, userId: number) {
		try {
			const userAuction = await db.Auction.findOne({
				where: { seller: userId, petId: params.id },
			});
			const data = userAuction.bidsHistory;
			return AppResponse({ data });
		} catch (err) {
			return AppResponse({ err });
		}
	}
}
