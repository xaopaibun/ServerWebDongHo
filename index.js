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

app.get('/getproduct', ProductController.getProduct )
app.post('/addproduct',middleware.authenToken,  ProductController.add_product)
app.get('/getproduct/:_id', ProductController.getProductByID )
app.delete('/deleteproduct/:_id',middleware.authenToken,  ProductController.removeProductByID )
app.put('/updateproduct/:_id',middleware.authenToken,  ProductController.updateProductByID )
app.post('/getproductbyname', ProductController.findProductByName )
app.get('/listproduct&page=:_page&limit=:_limit',ProductController.getProductOfPage )
app.post('/signup', UserController.signup)
app.post('/loginAdmin', UserController.loginAdmin)

server.listen(process.env.PORT || 5000, () => {
  console.log('Server đang chay tren cong 5000');
});
