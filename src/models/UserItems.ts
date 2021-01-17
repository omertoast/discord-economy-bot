import { DataTypes, Model, Sequelize } from "sequelize";

export = (sequelize: Sequelize) => {
	interface UserItemsAttributes {
		user_id: string
		item_id: string
		amount: number
	}

	class UserItems extends Model<UserItemsAttributes> implements UserItemsAttributes {
		user_id!: string
		item_id!: string
		amount: number
	}

	return UserItems.init(
		{
			user_id: DataTypes.STRING,
			item_id: DataTypes.STRING,
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize
		}
	)
}