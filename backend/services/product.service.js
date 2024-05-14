const { Product } = require("../models");

const saveProduct = async (body) => {
  try {
    let product = await Product(body);
    product = product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

const findAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw error;
  }
};

const findById = async (id) => {
  try {
    const product = await Product.findById({ _id: id });
    return product;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: id });
    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = { saveProduct, findAllProducts, findById, deleteProduct };
