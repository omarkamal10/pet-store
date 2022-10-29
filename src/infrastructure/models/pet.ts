'use strict';
import { Model } from 'sequelize';

interface PetAttributes {
	id: number;
	name: string;
	categoryId: number;
	photoUrls: Array<string>;
	tags: Array<object>;
	status: Enumerator;
	ownerId: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
	class Pet extends Model<PetAttributes> implements PetAttributes {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number;
		name!: string;
		categoryId!: number;
		photoUrls!: Array<string>;
		tags!: Array<object>;
		status!: Enumerator;
		ownerId!: number;

		static associate(models: any) {
			// define association here
			Pet.belongsTo(models.Category);
			Pet.belongsTo(models.User);
			Pet.hasOne(models.Auction);
		}
	}
	Pet.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			categoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Categories',
					key: 'id',
				},
			},
			photoUrls: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			tags: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('pending', 'available', 'sold'),
				allowNull: false,
				defaultValue: 'available',
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'Pet',
		}
	);
	return Pet;
};
