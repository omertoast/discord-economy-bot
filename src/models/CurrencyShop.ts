import { DataTypes, Model, Sequelize } from 'sequelize'

export = (sequelize: Sequelize) => {
	interface CurrencyShopAttributes {
		name: string
		cost: number
	}

	class CurrencyShop extends Model<CurrencyShopAttributes> implements CurrencyShopAttributes {
		name!: string
		cost!: number
	}

	return CurrencyShop.init(
		{
			name: {
				type: DataTypes.STRING,
				unique: true,
			},
			cost: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize
		}
	)
}