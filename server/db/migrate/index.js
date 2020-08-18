const { connect, getConnection } = require("../index");
const tables = require("../migrate/tables");
const database = require("../migrate/database");

try {
	connect("database")
		.then(() => {
			let connection = getConnection();
			connection.query(database, (err, result) => {
				if (err) {
					console.log(err);
				}

				connect().then(() => {
					let connection = getConnection();
					connection.query(database, (err, result) => {
						if (err) {
							console.log(err);
						}
						const modelsKeys = Object.keys(tables);
						for (let i = 0; i < modelsKeys.length; i++) {
							let currentQuery = tables[modelsKeys[i]];
							connection.query(currentQuery);
						}
					});
				});
			});
		})
		.catch((err) => {
			console.error(err);
		});
} catch (err) {
	console.log(err);
	throw err;
}
