const bcryptHelpers = require("../../helpers/bcrypt");
const userRepo = require("../users/userRepo");
const jwt = require("../../helpers/jwt");
const signup = async (data) => {
	try {
		data.hashedPassword = await bcryptHelpers.hash(data.password);
		const signupres = await userRepo.createUser(
			data.name,
			data.email,
			data.hashedPassword,
			data.phone
		);
		signupres.user_details = { name: data.name, email: data.email };
		return signupres;
	} catch (err) {
		throw err;
	}
};

const login = async (email, password) => {
	try {
		const userData = await userRepo.getByUser(email);
		if (!userData) throw { status: 404, message: "User does not exist" };
		await bcryptHelpers.comparePassword(password, userData.password);
		const payload = { email };
		const token = jwt.sign(payload);
		return {
			token: token,
			user_details: { name: userData.name, email: userData.email },
		};
	} catch (err) {
		throw err;
	}
};
module.exports = { signup, login };
