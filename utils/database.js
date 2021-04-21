const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		timestamps: false
	  }
});

module.exports = sequelize;
