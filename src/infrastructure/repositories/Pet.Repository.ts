import db from '../models';
export default class PetRepository {
	public async createPet(args: any, userId: number) {
		try {
			args.ownerId = userId;
			const petCreated = await db.Pet.create(args);
			return petCreated;
		} catch (err) {
			console.log(err);
		}
	}
	public async getPetById(args: any) {
		try {
			const pet = await db.Pet.findOne({
				where: { id: args.id },
			});
			return pet;
		} catch (err) {
			console.log(err);
		}
	}
	public async updatePet(args: any, params: any) {
		try {
			const petUpdated = await db.Pet.update(args, {
				where: { id: params.id },
			});
			return petUpdated;
		} catch (err) {
			console.log(err);
		}
	}
	public async deletePet(args: any) {
		try {
			await db.Pet.destroy({ where: { ...args } });
			return 'Deleted!';
		} catch (err) {
			console.log(err);
		}
	}
	public async getPetByStatus(args: any) {
		try {
			const pet = await db.Pet.findOne({
				where: { status: args.status },
			});
			return pet;
		} catch (err) {
			console.log(err);
		}
	}
}
