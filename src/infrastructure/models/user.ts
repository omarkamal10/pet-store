'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	userStatus: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number;
		username!: string;
		firstName!: string;
		lastName!: string;
		email!: string;
		password!: string;
		phone!: string;
		userStatus!: number;

		static associate(models: any) {
			// define association here
			User.hasMany(models.Auction);
			User.hasMany(models.Pet);
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: { type: DataTypes.STRING, allowNull: false, unique: true },
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },
			phone: { type: DataTypes.STRING, allowNull: false },
			userStatus: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
