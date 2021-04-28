const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verifyToken');


// Проверка авторизации пользователя
// Нужно ли обновлять токен?

router.get('/check', verify, async(req, res) => {
	try {
		const token = req.header('Token');
		const user = await User.findByPk(req.user.id);
		user.password = ""
		res.status(200).json({token, user});
		console.log("Check user");
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Регистрация пользователя

router.post('/register', async (req, res) => {
	try {
		console.log("come to add user");
		const users = await User.findAll({
			where: {
				email: req.body.email
			}
		})

		if (users.length) {
			return res.status(400).json({message: 'Error user already exist'});
		}

		const salt = await bcrypt.genSalt(10);
		const hashdedPassword = await bcrypt.hash(req.body.password, salt);

		const user = await User.create({

			email: req.body.email,
			name: req.body.name,
			password: hashdedPassword,
			phone: req.body.phone

		});
		const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
		req.session.isAuth = true;
		user.password = '';
		res.header('Token', token).status(201).json({token, user});

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});

	}
});

// Аутентикация пользователя

router.post('/login', async (req, res) => {
	try {
		console.log("come to login user");
		const users = await User.findAll({
			where: {
				email: req.body.email
			}
		})

		if (!users.length) {
			return res.status(400).json({message: 'Wrong email'});
		}
		const user = users[0];
		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) return res.status(400).json({message: "Invalid password"});
		const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
		req.session.isAuth = true;
		user.password = '';
		res.header('Token', token).status(200).json({token, user});
		console.log("Login user");
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Закрытие сессии

router.post('/logout', async (req, res) => {
	try {
		console.log("Logout");
		req.session.destroy();
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Обновление профиля пользователя

router.put('/profile', verify, async(req, res) => {
	try {
		await User.update({
			name: req.body.name,
			phone: req.body.phone
		},
		{
			where: {
				id: req.user.id
			}
		});
		console.log("Refresh user");
		res.status(200).end();
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
