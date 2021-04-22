const {Router} = require('express');
const Friend = require('../models/friend');
const List = require('../models/list');
const User_list = require('../models/user_list');
const User = require('../models/user');
const { Op } = require('sequelize');
const router = Router();

// получить списки

router.get('/lists', async(req, res) => {
	try {
		const listsForUser = await User_list.findAll({
			where: {
				id_user: req.user.id
			}
		})
		const userLists = [];
		for (i = 0; i < listsForUser.length; i++) {
			const lst = await List.findByPk(listsForUser[i].id_list);
			userLists.push(lst)
		}
		console.log("get lists");
		res.status(200).json({userLists});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// добавление списка

router.post('/lists', async (req, res) => {
	try {

		// 1 надо создать сам список
		const list = await List.create({
			title: req.body.title,
			color: req.body.color,
			dat: req.body.dat
		});

		//2 добавляем в связку
		const user_list = await User_list.create({
			id_user: req.user.id,
			id_list: list.id
		})
		console.log("add list");
		res.status(201).json({list});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// удаление списка
router.delete('/lists/:id', async(req, res) => {
	try {
		await List.destroy({
			where: {
				id: req.params.id
			}
		});
		console.log("delete list");
		res.status(200).end();
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});


/*
	изменение списка
*/

router.put('/lists/:id', async(req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.params.id
			}
		})
		if (!alowedToEdit.length) {
			return res.status(401).json({message: "Access Denied"});
		}
		await List.update({
			title: req.body.title,
			color: req.body.color,
			dat: req.body.dat
		},
		{
			where: {
				id: req.params.id
			}
		});
		console.log("change list");
		res.status(200).json({list: await List.findByPk(req.params.id)});
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// поделиться списком

router.post('/user-lists', async (req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.body.id_list
			}
		})
		const alowedToEdit2 = await Friend.findAll({
			where: {
				id_user: req.user.id,
				id_friend: req.body.id_user
			}
		});

		if (!alowedToEdit.length || !alowedToEdit2.length) {
			return res.status(401).json({message: "Access Denied"});
		}
		await User_list.create({
			id_user: req.body.id_user,
			id_list: req.body.id_list
		})
		console.log("share list");
		res.status(201).end();
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

/*
	отобрать список
*/

router.delete('/user-lists/:id', async(req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.params.id
			}
		})

		if (!alowedToEdit.length) {
			return res.status(401).json({message: "Access Denied"});
		}
		await User_list.destroy({
			where: {
				id_list: req.params.id,
				id_user: {
					[Op.ne]: req.user.id
				}
			}
		})
		console.log("unshare user from list");
		res.status(200).end();
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Получить пользователей списка

router.get('/user-lists/:id/users', async(req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.params.id
			}
		})

		if (!alowedToEdit.length) {
			return res.status(401).json({message: "Access Denied"});
		}

		const listShares = await User_list.findAll({
			where: {
				id_list: req.params.id
			}
		});
		const usersList = [];
		for(i = 0; i < listShares.length; i++) {
			const usr = await User.findByPk(listShares[i].id_user);
			usr.password = "";
			usersList.push(usr);
		}

		res.status(200).json({users: usersList});
		console.log("get users of list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
