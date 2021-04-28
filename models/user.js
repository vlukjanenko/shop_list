const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const user = sequelize.define('users', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phone: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

module.exports = user;
