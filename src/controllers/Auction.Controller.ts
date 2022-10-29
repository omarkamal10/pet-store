/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import AuctionUseCase from '../useCases/auction/Auction.UseCase';
import { autoInjectable } from 'tsyringe';
@autoInjectable()
export default class AuctionController {
	constructor(private auctionUseCase?: AuctionUseCase) {}
	createAuction = async (req: any, res: Response) => {
		const data = await this.auctionUseCase?.createAuction(req.body, req.userId);
		if (data?.data)
			return res.status(201).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	getAuctionById = async (req: Request, res: Response) => {
		const data = await this.auctionUseCase?.getAuctionById(req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	placeBid = async (req: any, res: Response) => {
		const data = await this.auctionUseCase?.placeBid(
			req.body,
			req.params,
			req.userId
		);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};

	getAllBids = async (req: any, res: Response) => {
		const data = await this.auctionUseCase?.getAllBids(req.userId);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};

	getPetBids = async (req: any, res: Response) => {
		const data = await this.auctionUseCase?.getPetBids(req.params, req.userId);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
}
