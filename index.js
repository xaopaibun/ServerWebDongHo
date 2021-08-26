var express = require('express')
const http = require("http");
var app = express()
const server = http.createServer(app);
const bodyParser = require("body-parser");
const ProductController = require('./src/controllers/product.controller');
const connectDb = require('./src/config/connectDb');
const cors = require('cors');
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
/// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();
app.use(cors())


app.get('/getproduct', ProductController.getProduct )
app.post('/addproduct', ProductController.add_product)
app.get('/getproduct/:_id', ProductController.getProductByID )
app.delete('/deleteproduct/:_id', ProductController.removeProductByID )
app.put('/updateproduct/:_id', ProductController.updateProductByID )
app.post('/getproductbyname', ProductController.findProductsByName )

server.listen(process.env.PORT || 5000, () => {
  console.log('Server đang chay tren cong 5000');
});
