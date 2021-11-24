const productModel = require('../models/product.model');

const add_product = async (req, res, next) => {
    const {name, content, amount, image,  price} = req.body
    try {
        const data = await productModel.createProduct({name, content, amount, image, price});
        res.status(200).send({ success: true,message: 'Add Product Success', data : data});
    } catch (error) {
        res.status(400).send({success: false, message: 'Update Failed'});
    }
}

const getProductByID = async (req, res, next) => {
    try {
       const data = await productModel.findProductByID(req.params._id);
        res.status(200).send({success: true,data});
    } catch (error) {
        res.status(400).send({ success: false, message: 'Get Product Failed'});
    }
}


const removeProductByID = async (req, res, next) => {
    try {
        const data = await productModel.removeProductByID(req.params._id);
        res.status(200).send({ success: true, message: 'Delete Product Success', data});
    } catch (error) {
        res.status(400).send({ success: false, message: 'Delete Product Failed'});
    }
}

const updateProductByID = async (req, res, next) => {
    try {
       const data = await productModel.findProductByIDAndUpdateProduct(req.params._id, req.body);
        res.status(200).send({ success: true, message: 'Update Product Success',   data :  data});
    } catch (error) {
        res.status(400).send({ success: false,message: 'Update Product Failed'});
    }
}


const findProductByName = async (req, res, next) => {
    try {
       const data = await productModel.findProductsByName(req.body.name);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ success: false,message: 'Find Product Failed'});
    }
}

const getProduct = async (req, res, next) => {
    try {
       const data = await productModel.getProduct();
       console.log(data.length)
        res.status(200).send({success: true,data});
    } catch (error) {
        res.status(400).send({ success: false,message: 'Get Product Failed'});
    }
}

const getProductOfPage = async (req, res, next) => {
    try {
       const _page = parseInt(req.params._page);
       const _limit = parseInt(req.params._limit);
        const data = await productModel._getProduct(_limit, _page);
        res.status(200).send({success: true,data});
    } catch (error) {
        res.status(500).send({ message:  "Error Occured" });
    }
}


module.exports = {
    add_product,
    getProduct,
    getProductByID ,
    removeProductByID ,
    updateProductByID,
    findProductByName,
    getProductOfPage
}
