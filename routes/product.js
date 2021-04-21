const {Router} = require('express');
const List = require('../models/product');
const router = Router();

// получить список

router.get('/lists:id', async(req, res) => {
	try {

		console.log("get products list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// добавить товар в список

router.post('/lists:id', async(req, res) => {
	try {

		console.log("add product to list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// удалить товар из списка
router.delete('/lists:id', async(req, res) => {
	try {

		console.log("del product from list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// изменить товар в списке

router.delete('/lists:id', async(req, res) => {
	try {

		console.log("Edit product in list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
