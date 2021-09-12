var express = require('express')
const http = require("http");
var app = express()
const server = http.createServer(app);
const bodyParser = require("body-parser");
const connectDb = require('./src/config/connectDb');
const path = require('path');
const cors = require('cors');

const AuthenRouter = require('./src/routers/authen')
const ProductRouter = require('./src/routers/product')
const diemSV = require("./src/controllers/diemSV.controller")
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use(cors())
app.use('/api/v1/auth', AuthenRouter)
app.use('/api/v1/product', ProductRouter)

app.get('/', (req, res) => res.send("Server Start Success"))

app.get("/caodata", diemSV.CaoDataDiemSinhVienEPU)
app.get("/caolichhoc", diemSV.CaoDataLichHocSinhVienEPU)
server.listen(process.env.PORT || 5000, () => {
  console.log('Server đang chay tren cong 5000');
});
