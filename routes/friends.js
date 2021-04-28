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


/*
**	Добавить друга
*/

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
		if (e.errors[0].validatorKey === "not_unique") { // переделать, чтоб без исключений
			return res.status(400).json({message: 'User already in friends list'});
		}
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

/*
**	удалить из друзей
*/

router.delete('/friends/:id', async (req, res) => {
	try {
		await Friend.destroy({
			where: {
				id_user: req.user.id,
				id_friend: req.params.id
			}
		});
		res.status(200).end();
	} catch {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
})

/*
**	получить список пользователей
*/

router.get('/users', async(req, res) => {
	try {
		console.log("Come to load all users");
		const u = await User.findAll();
		u.forEach(element => {
			element.password = "";
		});
		res.status(200).json({users: u});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
