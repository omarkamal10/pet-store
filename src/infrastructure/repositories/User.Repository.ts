import bcrypt from 'bcryptjs';
import { TokenGenerator } from '../../helpers';
import db from '../models';
export default class UserRepository {
	public async createUser(args: any) {
		try {
			args.password = bcrypt.hashSync(args.password, 10);
			const userCreated = await db.User.create(args);
			return userCreated;
		} catch (err) {
			console.log(err);
		}
	}
	public async getUserByUsername(args: any) {
		try {
			const user = await db.User.findOne({
				where: { username: args.username },
			});
			delete user.dataValues.password;
			return user;
		} catch (err) {
			console.log(err);
		}
	}
	public async updateUser(args: any, params: any) {
		try {
			const userUpdated = await db.User.update(args, {
				where: { username: params.username },
			});
			return userUpdated;
		} catch (err) {
			console.log(err);
		}
	}
	public async deleteUser(args: any) {
		try {
			const userCreated = await db.User.destroy({ where: { ...args } });
			return userCreated;
		} catch (err) {
			console.log(err);
		}
	}
	public async createUserWithList(args: any) {
		try {
			const userCreated = await db.User.bulkCreate(args);
			return userCreated;
		} catch (err) {
			console.log(err);
		}
	}
	public async login(args: any) {
		try {
			console.log(args);
			const { username, password } = args;
			const user = await db.User.findOne({ where: { username } });
			if (!user || !bcrypt.compareSync(password, user.password))
				return 'Wrong Credentials';
			delete user.dataValues.password;
			const token = TokenGenerator({ userId: user.id, username: user.name });
			return { token, user };
		} catch (err) {
			console.log(err);
		}
	}
}
