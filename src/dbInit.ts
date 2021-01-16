const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

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

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
		CurrencyShop.upsert({ name: 'Coffee', cost: 2 }),
		CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
