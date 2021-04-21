const {Router} = require('express');
const List = require('../models/list');
const router = Router();

// получить списки

router.get('/lists', async(req, res) => {
	try {

		console.log("get lists");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// добавление списка

router.post('/lists', async (req, res) => {
	try {

		console.log("add list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// удаление списка
router.delete('/lists/:id', async(req, res) => {
	try {

		console.log("delete list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// изменение списка
router.put('/:id', async(req, res) => {
	try {

		console.log("change list");


	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// поделиться списком

router.post('/user-lists', async (req, res) => {
	try {

		console.log("share list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// отобрать список

router.delete('/user-lists/:id', async(req, res) => {
	try {

		console.log("unshare user from list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// Получить пользователей списка

router.get('/user-lists/:id/users', async(req, res) => {
	try {

		console.log("get users of list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
