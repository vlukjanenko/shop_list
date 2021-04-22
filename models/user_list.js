const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const user_list = sequelize.define('user_lists', {
	id_user: {
		allowNull: false,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		type: Sequelize.INTEGER,
		references: {
			model: 'users',
			key: 'id'
		}
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
	}
});

module.exports = user_list;
