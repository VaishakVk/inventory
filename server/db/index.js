require("dotenv").config();

const mysql = require("mysql");
const constants = require("../constants");

let connection;

const connect = (param) => {
	const connection_string = {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	};

	if (param) delete connection_string.database;
	return new Promise((resolve, reject) => {
		connection = mysql.createConnection(connection_string);

		connection.connect((err) => {
			if (err) {
				console.error("Error connecting to MYSQL - ", err);
				reject(err);
			}
			resolve();
			console.log("Connected to MySQL Server!");
		});
	});
};

const getConnection = () => {
	return connection;
};
module.exports = {
	getConnection,
	connect,
};
