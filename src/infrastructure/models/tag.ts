'use strict';
import { Model } from 'sequelize';

interface TagAttributes {
	id: number;
	name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
	class Tag extends Model<TagAttributes> implements TagAttributes {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number;
		name!: string;

		static associate(models: any) {
			// define association here
		}
	}
	Tag.init(
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
			modelName: 'Tag',
		}
	);
	return Tag;
};
