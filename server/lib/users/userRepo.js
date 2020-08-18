const { getConnection } = require("../../db");

const createUser = (name, email, password, phone) => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(
			`INSERT INTO users(name, email, password, phone) VALUES (?,?,?,?)`,
			[name, email, password, phone],
			(err, result) => {
				if (err) reject(err);
				else resolve({ id: result.insertId });
			}
		);
	});
};

const getByUser = (value) => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(
			`SELECT name, email, password, phone FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1`,
			[value],
			(err, result) => {
				if (err) reject(err);
				else resolve(result[0]);
			}
		);
	});
};

module.exports = {
	createUser,
	getByUser,
};
