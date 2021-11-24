const express = require('express')
const router = express.Router();

const ProductController = require('../controllers/product.controller');
const Crawler = require('../controllers/data.controller');
const middleware = require('../middleware/middlewareAuthen');

router.get('/getproduct', ProductController.getProduct )
router.post('/addproduct',middleware.authenToken,  ProductController.add_product)
router.get('/getproduct/:_id', ProductController.getProductByID )
router.delete('/deleteproduct/:_id',middleware.authenToken,  ProductController.removeProductByID )
router.put('/updateproduct/:_id',middleware.authenToken,  ProductController.updateProductByID )
router.post('/getproductbyname', ProductController.findProductByName )
router.get('/listproduct&page=:_page&limit=:_limit',ProductController.getProductOfPage )
router.get('/crawler/category=:category_product&length=:count', Crawler.crawler)

module.exports = router;