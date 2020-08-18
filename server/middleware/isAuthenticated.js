const hasToken = require("../helpers/jwt").hasToken;
const userRepo = require("../lib/users/userRepo");
module.exports = async (req, res, next) => {
	try {
		let user;
		const payload = hasToken(req);
		if (!payload) next({ status: 401, message: "Invalid token" });
		user = await userRepo.getByUser(payload.email);

		if (!user) next({ status: 401, message: "Invalid user" });
		else {
			req.user = user;
		}
		next();
	} catch (err) {
		console.log(err);
		return next(err);
	}
};
