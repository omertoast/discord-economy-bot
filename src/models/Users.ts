import { Sequelize, DataTypes, Model } from 'sequelize'
import { UserItems } from '../dbObjects'

export = (sequelize: Sequelize) => {
	interface UsersAttributes {
		user_id: string
		balance: number
	}

	class Users extends Model<UsersAttributes> implements UsersAttributes {
		user_id!: string
		balance!: number
		async addItem(item: any): Promise<any> {
			const useritem = await UserItems.findOne({
				where: { user_id: this.user_id, item_id: item.id },
			})

			if (useritem) {
				useritem.amount += 1;
				return useritem.save()
			}

			return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
		}
		async getItems(): Promise<any> {
			return UserItems.findAll({
				where: { user_id: this.user_id },
				include: ['item'],
			})
		}
	}

	return Users.init(
		{
			user_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			sequelize,
		}
	)
}