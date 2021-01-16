import * as Sequelize from 'sequelize';
import { readdirSync } from 'fs'

const sequelize = new Sequelize.Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: './database.sqlite',
});

//const MODELS_FILE_PATH = './models/'
//const db: db = {}

//interface database {
	//sequelize: Sequelize()
	//Sequelize: Sequelize
//}

//readdirSync(MODELS_FILE_PATH)
	//.filter(file => {
		//return (file.indexOf(".") !== 0) && (file.slice(-3) === ".js")
	//})
	//.forEach(file => {
		//const model = require(MODELS_FILE_PATH.concat(file))(sequelize, Sequelize.DataTypes)
		//db[model.name] = model
	//})

//Object.keys(db).forEach(modelName => {
  //if (db[modelName].associate) {
    //db[modelName].associate(db);
  //}
//})

//db.sequelize = sequelize
//export const Users = require('./models/Users')(sequelize, Sequelize.DataTypes, Sequelize.Model);

export interface UsersAttributes {
	user_id: string
	balance: number
}

export class Users extends Sequelize.Model<UsersAttributes> implements UsersAttributes {
	user_id!: string
	balance!: number
	addItem: (item: any) => Promise<any>;
	getItems: () => any;
}

Users.init(
	{
		user_id: {
			type: Sequelize.DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: Sequelize.DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems')(sequelize, Sequelize.DataTypes);

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

/* eslint-disable-next-line func-names */
Users.prototype.addItem = async function(item) {
	const useritem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (useritem) {
		useritem.amount += 1;
		return useritem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = function() {
	return UserItems.findAll({
		where: { user_id: this.user_id },
		include: ['item'],
	});
};

module.exports = { Users, CurrencyShop, UserItems };
