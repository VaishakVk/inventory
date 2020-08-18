const { getConnection } = require("../../db");

const createProduct = (name, short_name, description, price) => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(
			`INSERT INTO products(name, short_name, description, price) VALUES (?,?,?,?)`,
			[name, short_name, description, price],
			(err, result) => {
				if (err) reject(err);
				else resolve({ id: result.insertId });
			}
		);
	});
};

const getAllProducts = () => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(`SELECT * FROM products`, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

const getProductById = (id) => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(
			`SELECT * FROM products WHERE id = ? LIMIT 1`,
			[id],
			(err, result) => {
				if (err) reject(err);
				else resolve(result[0]);
			}
		);
	});
};

const deleteProducts = (id) => {
	return new Promise((resolve, reject) => {
		const connection = getConnection();
		connection.query(
			`DELETE FROM products WHERE id IN (?)`,
			[id],
			(err, result) => {
				if (err) reject(err);
				else {
					if (result.affectedRows == id.length)
						resolve({ message: "Deleted successfully" });
					else
						reject({
							status: 400,
							message: "Some or all rows were not deleted",
						});
				}
			}
		);
	});
};

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	deleteProducts,
};
