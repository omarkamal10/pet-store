/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import PetUseCase from '../useCases/pet/Pet.UseCase';
import { autoInjectable } from 'tsyringe';
@autoInjectable()
export default class PetController {
	constructor(private petUseCase?: PetUseCase) {}
	createPet = async (req: any, res: Response) => {
		const data = await this.petUseCase?.createPet(req.body, req.userId);
		if (data?.data)
			return res.status(201).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	getPetById = async (req: Request, res: Response) => {
		const data = await this.petUseCase?.getPetById(req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	updatePet = async (req: Request, res: Response) => {
		const data = await this.petUseCase?.updatePet(req.body, req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	deletePet = async (req: Request, res: Response) => {
		const data = await this.petUseCase?.deletePet(req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	getPetByStatus = async (req: Request, res: Response) => {
		const data = await this.petUseCase?.getPetByStatus(req.body);
		if (data?.data)
			return res.status(201).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
}
