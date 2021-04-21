const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');

// Проверка авторизации пользователя

router.get('/check', async(req, res) => {
	try {
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
			return res.status(500).json({message: 'Error user exist'});
		}

		const salt = await bcrypt.genSalt(10);
		const hashdedPassword = await bcrypt.hash(req.body.password, salt);

		const user = await User.create({

			email: req.body.email,
			name: req.body.name,
			password: hashdedPassword,
			phone: req.body.phone

		});
		res.status(201).json({user});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Аутентикация пользователя

router.post('/login', async (req, res) => {
	try {
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
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Обновление профиля пользователя

router.put('/profile', async(req, res) => {
	try {
		console.log("Refresh user");
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
