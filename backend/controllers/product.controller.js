const { productService } = require("../services");
const { responseMessages } = require("../configs");

const addProduct = async (req, res) => {
  try {
    const product = await productService.saveProduct(req.body);
    res
      .status(201)
      .json({ status: 201, message: responseMessages.PRODUCT_ADD_SUCCESS });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json({
      status: 200,
      message: responseMessages.PRODUCTS_RETRIEVE_SUCCESS,
      data: products,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.findById(req.params.id);
    if (product)
      return res
        .status(404)
        .json({ status: 404, message: responseMessages.PRODUCT_NOT_FOUND });

    return res.status(200).json({
      status: 200,
      message: responseMessages.PRODUCT_RETRIEVE_SUCCESS,
      data: product,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (product)
      return res
        .status(404)
        .json({ status: 404, message: responseMessages.PRODUCT_NOT_FOUND });

    return res.status(200).json({
      status: 200,
      message: responseMessages.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
