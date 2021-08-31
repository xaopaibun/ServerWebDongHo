var express = require('express')
const http = require("http");
var app = express()
const server = http.createServer(app);
const bodyParser = require("body-parser");
const ProductController = require('./src/controllers/product.controller');
const UserController = require('./src/controllers/user.controller');
const middleware = require('./src/middleware/middlewareAuthen');
const connectDb = require('./src/config/connectDb');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();
app.use(cors())

app.get('/api/v1/getproduct', ProductController.getProduct )
app.post('/api/v1/addproduct',middleware.authenToken,  ProductController.add_product)
app.get('/api/v1/getproduct/:_id', ProductController.getProductByID )
app.delete('/api/v1/deleteproduct/:_id',middleware.authenToken,  ProductController.removeProductByID )
app.put('/api/v1/updateproduct/:_id',middleware.authenToken,  ProductController.updateProductByID )
app.post('/api/v1/getproductbyname', ProductController.findProductByName )
app.get('/api/v1/listproduct&page=:_page&limit=:_limit',ProductController.getProductOfPage )
app.post('/api/v1/signup', UserController.signup)
app.post('/api/v1/loginAdmin', UserController.loginAdmin)

server.listen(process.env.PORT || 5000, () => {
  console.log('Server đang chay tren cong 5000');
});
