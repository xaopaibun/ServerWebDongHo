const productModel = require('../models/product.model');

const add_product = async (req, res, next) => {
    try {
        await productModel.createProduct(req.body);
        res.status(200).send({ message: 'Add Product Success'});
    } catch (error) {
        res.status(203).send({ message: 'Update Failed'});
    }
}

const getProductByID = async (req, res, next) => {
    try {
       const data = await productModel.findProductByID(req.params._id);
        res.status(200).send(data);
    } catch (error) {
        res.status(203).send({ message: 'Get Product Failed'});
    }
}


const removeProductByID = async (req, res, next) => {
    try {
       await productModel.removeProductByID(req.params._id);
        res.status(200).send({ message: 'Delete Product Success'});
    } catch (error) {
        res.status(203).send({ message: 'Delete Product Failed'});
    }
}

const updateProductByID = async (req, res, next) => {
    try {
       await productModel.findProductByIDAndUpdateProduct(req.params._id, req.body);
        res.status(200).send({ message: 'Update Product Success'});
    } catch (error) {
        res.status(203).send({ message: 'Update Product Failed'});
    }
}


const findProductByName = async (req, res, next) => {
    try {
       const data = await productModel.findProductsByName(req.body.name);
        res.status(200).send(data);
    } catch (error) {
        res.status(203).send({ message: 'Find Product Failed'});
    }
}

const getProduct = async (req, res, next) => {
    try {
       const data = await productModel.getProduct();
        res.status(200).send(data);
    } catch (error) {
        res.status(203).send({ message: 'Get Product Failed'});
    }
}

const getProductOfPage = async (req, res, next) => {
    try {
       const _page = parseInt(req.params._page);
       const _limit = parseInt(req.params._limit);
        const data = await productModel._getProduct(_limit, _page);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message:  "Error Occured" });
    }
}


module.exports = {
    add_product: add_product,
    getProduct: getProduct,
    getProductByID : getProductByID,
    removeProductByID : removeProductByID,
    updateProductByID : updateProductByID,
    findProductByName : findProductByName,
    getProductOfPage :  getProductOfPage
}