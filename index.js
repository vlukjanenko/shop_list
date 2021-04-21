const express = require('express');
const app = express();
const PORT = 3000;
const listRoutes = require('./routes/list');
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const productsRoutes = require('./routes/product');
const sequelize = require('./utils/database');

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', friendsRoutes);

app.use('/api', listRoutes);

app.use('/api', productsRoutes)

async function start() {
	try {
		await sequelize.sync({force: true});
		//await sequelize.sync();
		app.listen(PORT);
	} catch (e) {
		console.log(e);
	}
}

start();
