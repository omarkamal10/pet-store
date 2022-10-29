/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import UserUseCase from '../useCases/user/User.UseCase';
import { autoInjectable } from 'tsyringe';
@autoInjectable()
export default class UserController {
	constructor(private userUseCase?: UserUseCase) {}
	createUser = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.createUser(req.body);
		if (data?.data)
			return res.status(201).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	getUserByUsername = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.getUserByUsername(req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	updateUser = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.updateUser(req.body, req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	deleteUser = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.deleteUser(req.params);
		if (data?.data)
			return res.status(200).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	createUserWithList = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.createUserWithList(req.body);
		if (data?.data)
			return res.status(201).json({
				message: 'Ok',
				data: data.data,
			});
		return res
			.status(400)
			.json({ message: 'Error', error: data?.err.error.message });
	};
	login = async (req: Request, res: Response) => {
		const data = await this.userUseCase?.login(req.body);
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
