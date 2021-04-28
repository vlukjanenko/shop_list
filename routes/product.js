const {Router} = require('express');
const Product = require('../models/product');
const User_list = require('../models/user_list');
const router = Router();

// получить список

router.get('/lists/:id', async(req, res) => {
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
		const items = await Product.findAll({
			where: {
				id_list: req.params.id
			}
		})
		res.status(200).json(items);
		console.log("get products list");

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// добавить товар в список

router.post('/lists/:id', async(req, res) => {
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
		const listItem = await Product.create({

			id_list: req.params.id,
			title: req.body.title,
			amount: req.body.amount,
			checked: req.body.checked

		});

		res.status(200).json({product: listItem});
		console.log("add product to list");
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// удалить товар из списка
router.delete('/lists/:id_list/:id_product', async(req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.params.id_list
			}
		})
		if (!alowedToEdit.length) {
			return res.status(401).json({message: "Access Denied"});
		}
		await Product.destroy({
			where: {
				id: req.params.id_product
			}
		})
		console.log("del product from list");
		res.status(200).end();

	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

// изменить товар в списке

router.put('/lists/:id_list/:id_product', async(req, res) => {
	try {
		const alowedToEdit = await User_list.findAll({
			where: {
				id_user: req.user.id,
				id_list: req.params.id_list
			}
		});
		const alowedToEdit2 = await Product.findAll({
			where: {
				id: req.params.id_product
			}
		})

		if (!alowedToEdit.length || !alowedToEdit2.length) {
			return res.status(401).json({message: "Access Denied"});
		}

		await Product.update({

			id_list: req.params.id,
			title: req.body.title,
			amount: req.body.amount,
			checked: req.body.checked

		},
		{
			where: {
				id: req.params.id_product
			}
		});

		const listItem = await Product.findByPk(req.params.id_product);
		console.log("Edit product in list");
		res.status(200).json(listItem);
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
