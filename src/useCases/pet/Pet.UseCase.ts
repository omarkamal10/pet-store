import PetRepository from '../../infrastructure/repositories/Pet.Repository';
import { autoInjectable } from 'tsyringe';
import { AppResponse } from '../../helpers';

@autoInjectable()
export default class PetUseCase {
	constructor(private petRepository?: PetRepository) {}

	async createPet(args: any, userId: number) {
		try {
			const petCreated = await this.petRepository?.createPet(args, userId);
			return AppResponse({ data: petCreated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async getPetById(args: any) {
		try {
			const pet = await this.petRepository?.getPetById(args);
			return AppResponse({ data: pet });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async updatePet(args: any, params: any) {
		try {
			const petUpdated = await this.petRepository?.updatePet(args, params);
			delete petUpdated.dataValues.password;
			return AppResponse({ data: petUpdated });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async deletePet(args: any) {
		try {
			await this.petRepository?.deletePet(args);
			return AppResponse({ data: 'Deleted!' });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
	async getPetByStatus(args: any) {
		try {
			const pet = await this.petRepository?.getPetByStatus(args);
			return AppResponse({ data: pet });
		} catch (err) {
			console.log('ERROR in useCase', err);
			return AppResponse({ err });
		}
	}
}
