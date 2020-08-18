const userRepo = require("./userRepo");
const jwtHelper = require("../../helpers/jwt");
/**
 * @function getUserDetails
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const getUserDetails = async (req, res) => {
	try {
		delete req.user.password;
		delete req.user.phone;
		return res.status(200).send({
			status: true,
			response: req.user,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = { getUserDetails };
