const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

	console.log("come to verify")
	const token = req.header('Token');

	if (!token || !req.session.isAuth) return res.status(401).json({message: "Access Denied"});

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified; //получаем из токена ид юзера
		next();
	} catch (err) {
		res.status(400).json({message: "Invalid token"});
	}
}
