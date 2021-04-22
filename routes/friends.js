const {Router} = require('express');
const Friend = require('../models/friend');
const User = require('../models/user');
const router = Router();

router.get('/friends', async(req, res) => {
	try {
		const friends = await Friend.findAll({
			where: {
				id_user: req.user.id
			}
		});
		const usersList = [];
		for(i = 0; i < friends.length; i++) {
			const user = await User.findByPk(friends[i].id_friend);
			user.password = "";
			usersList.push(user);
		}
		res.status(200).json({friends: usersList});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

router.post('/friends', async(req, res) => {
	try {
		// TODO: проверка если ид друга равно ид пользователия. Или это на клиенте делать?

		const user = await User.findByPk(req.body.id_friend);
		const result = await Friend.create({
			id_user: req.user.id,
			id_friend: user.id
		})
		console.log("Friends post")
		res.status(201).json({user});
	} catch (e) {
		if (e.errors[0].validatorKey === "not_unique") {
			return res.status(400).json({message: 'User already in friends list'});
		}
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
