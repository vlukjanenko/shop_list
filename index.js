const express = require('express');
const app = express();
const PORT = 3000;
const verify = require('./routes/verifyToken');
const listRoutes = require('./routes/list');
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const productsRoutes = require('./routes/product');
const sequelize = require('./utils/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.json());

app.use(
	session({
	  secret: "keyboard cat",
	  store: new SequelizeStore({
		db: sequelize,
	  }),
	  resave: false, // we support the touch method so per the express-session docs this should be set to false
	  proxy: true, // if you do SSL outside of node.
	})
  );

  app.use('/api/auth', authRoutes);

 /*
 **	Проверка авторизации ключ и сессия
 ** при запросах к апи
 */

  app.use('/api', verify);

  app.use('/api', friendsRoutes);

  app.use('/api', listRoutes);

  app.use('/api', productsRoutes)

 /*
 **	На прочие запросы отправляем index.html ангуляр приложения
 ** там уже своя провекра пользователя и перенаправление
 */

// app.use('/', (req, res) => {
//	  res.sendFile('/home/host1216784/quickphoto33.ru/nodejs_app/www/public/index.html');
//  });


async function start() {
	try {
		//await sequelize.sync({force: true}); //force - пересоздает таблицы
		await sequelize.sync();
		app.listen(PORT);
	} catch (e) {
		console.log(e);
	}
}

start();
