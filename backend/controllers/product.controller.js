const { productService } = require("../services");
const { responseMessages } = require("../configs");

const addProduct = async (req, res) => {
  try {
    const product = await productService.saveProduct(req.body);
    req
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

module.exports = {
  addProduct,
  getAllProducts,
};
