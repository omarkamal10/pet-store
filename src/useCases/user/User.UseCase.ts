import UserRepository from '../../infrastructure/repositories/User.Repository';
import { autoInjectable } from 'tsyringe';
import { AppResponse } from '../../helpers';

@autoInjectable()
export default class UserUseCase {
	constructor(private userRepository?: UserRepository) {}

	async createUser(args: any) {
		try {
			const userCreated = await this.userRepository?.createUser(args);
			return AppResponse({ data: userCreated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async getUserByUsername(args: any) {
		try {
			const user = await this.userRepository?.getUserByUsername(args);
			delete user.password;
			return AppResponse({ data: user });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async updateUser(args: any, params: any) {
		try {
			const userUpdated = await this.userRepository?.updateUser(args, params);
			delete userUpdated.dataValues.password;
			return AppResponse({ data: userUpdated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async deleteUser(args: any) {
		try {
			await this.userRepository?.deleteUser(args);
			return AppResponse({ data: 'Deleted!' });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async createUserWithList(args: any) {
		try {
			const usersCreated = await this.userRepository?.createUserWithList(args);
			return AppResponse({ data: usersCreated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async login(args: any) {
		try {
			const data = await this.userRepository?.login(args);
			return AppResponse({ data });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
}
