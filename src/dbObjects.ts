import * as Sequelize from 'sequelize'
import { readdirSync } from 'fs'

const sequelize = new Sequelize.Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: './database.sqlite',
})

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

export const Users = require('./models/Users')(sequelize)
export const CurrencyShop = require('./models/CurrencyShop')(sequelize)
export const UserItems = require('./models/UserItems')(sequelize)

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' })