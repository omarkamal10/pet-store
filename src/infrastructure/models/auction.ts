'use strict';
import { Model } from 'sequelize';

interface AuctionAttributes {
	id: number;
	title: string;
	petId: number;
	status: Enumerator;
	endingAt: string;
	highestBid: object;
	bidsHistory: Array<object>;
	seller: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
	const now = new Date();
	const endDate = new Date();
	endDate.setHours(now.getHours() + 1);
	class Auction extends Model<AuctionAttributes> implements AuctionAttributes {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number;
		title!: string;
		petId!: number;
		status!: Enumerator;
		endingAt!: string;
		highestBid!: object;
		bidsHistory!: Array<object>;
		seller!: number;

		static associate(models: any) {
			// define association here
			Auction.belongsTo(models.User);
			Auction.belongsTo(models.Pet);
		}
	}
	Auction.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			petId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Pets',
					key: 'id',
				},
			},
			title: { type: DataTypes.STRING, allowNull: false },
			status: {
				type: DataTypes.ENUM('OPEN', 'CLOSED'),
				allowNull: false,
				defaultValue: 'OPEN',
			},
			endingAt: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: endDate.toISOString(),
			},
			highestBid: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: { amount: 0 },
			},
			bidsHistory: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
				allowNull: true,
			},
			seller: {
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
			modelName: 'Auction',
		}
	);
	return Auction;
};
