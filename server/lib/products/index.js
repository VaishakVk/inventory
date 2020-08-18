const productRepo = require("./productRepo");
const {
	createProductSchema,
	idSchema,
	multipleIdSchema,
} = require("../../schema/files/products");
const validator = require("../../schema/validator");

/**
 * @function createProduct
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const createProduct = async (req, res) => {
	try {
		const productFields = req.body;
		const valid = validator.validate(createProductSchema, productFields);
		if (valid.status) {
			const response = await productRepo.createProduct(
				productFields.name,
				productFields.short_name,
				productFields.description,
				productFields.price
			);
			return res.status(200).send({
				status: true,
				response: response,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

/**
 * @function getProductById
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const getProductById = async (req, res) => {
	try {
		const productFields = { id: Number(req.params.id) };
		const valid = validator.validate(idSchema, productFields);
		if (valid.status) {
			const response = await productRepo.getProductById(productFields.id);
			return res.status(200).send({
				status: true,
				response: response,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};
/**
 * @function getAllProducts
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const getAllProducts = async (req, res) => {
	try {
		const response = await productRepo.getAllProducts();
		return res.status(200).send({
			status: true,
			response: response,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

/**
 * @function deleteProductById
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const deleteProductsById = async (req, res) => {
	try {
		const productFields = req.body;
		const valid = validator.validate(multipleIdSchema, productFields);
		if (valid.status) {
			const response = await productRepo.deleteProducts(productFields.id);
			return res.status(200).send({
				status: true,
				response: response,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	deleteProductsById,
};
