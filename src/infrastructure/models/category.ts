'use strict';
import { Model } from 'sequelize';

interface CategoryAttributes {
	id: number;
	name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
	class Category
		extends Model<CategoryAttributes>
		implements CategoryAttributes
	{
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number;
		name!: string;

		static associate(models: any) {
			// define association here
			Category.hasMany(models.Pet);
		}
	}
	Category.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'Category',
		}
	);
	return Category;
};
