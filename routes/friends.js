const {Router} = require('express');
const Friend = require('../models/friend');
const router = Router();

router.get('/friends', async(req, res) => {
	try {
		console.log("Friends get")
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

router.post('/friends', async(req, res) => {
	try {
		console.log("Friends post")
	} catch (e) {
		console.log(e);
		res.status(500).json({message: 'Server error'});
	}
});

module.exports = router;
