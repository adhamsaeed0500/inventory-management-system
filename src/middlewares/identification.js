const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
	let token;
	if (req.headers.client === 'not-browser') {
		token = req.headers.authorization;
	} else {
		token = req.cookies['Authorization'];
	}

	if (!token) {
		return res.status(403).json({ success: false, message: 'Unauthorized' });
	}

	try {
		const userToken = token.split(' ')[1];
		const jwtVerified = jwt.verify(userToken, 'Adham@123');
		if (jwtVerified) {
			req.user = jwtVerified;
			next();
		} else {
			return res.status(400).json({success:false , message:'invalid token'})
		}
	} catch (error) {
		return res.status(400).json({success:false , message:'invalid token'}) 
	}
};

