const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const friend = sequelize.define('friends', {
	id_user: {
		primaryKey: true,
		allowNull: false,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		type: Sequelize.INTEGER,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	id_friend: {
		primaryKey: true,
		allowNull: false,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		type: Sequelize.INTEGER,
		references: {
			model: 'users',
			key: 'id'
		}
	}
});

module.exports = friend;
