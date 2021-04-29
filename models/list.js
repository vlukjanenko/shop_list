const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const list = sequelize.define('lists', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	color: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	dat: {
		type: Sequelize.DATE,
		allowNull: false,
	}
});

module.exports = list;
