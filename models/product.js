const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const procuct = sequelize.define('products', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	id_list: {
		allowNull: false,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		type: Sequelize.INTEGER,
		references: {
			model: 'lists',
			key: 'id'
		}
	},
	title: {
		allowNull: false,
		type: Sequelize.STRING
	},
	amount: {
		type: Sequelize.INTEGER
	},
	checked: {
		allowNull: false,
		type: Sequelize.BOOLEAN
	}
});

module.exports = procuct;
