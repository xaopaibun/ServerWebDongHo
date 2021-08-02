var express = require('express')
const http = require("http");
const connectDb = require('./src/config/connectDb');
var app = express()

const UserController = require('./src/controllers/user.controller');
const server = http.createServer(app);
connectDb()
var cors = require('cors')
app.use(cors())
const socketIo = require("socket.io")(server);
let arr = []

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.emit("sendId", socket.id);
  socket.emit("sendDataServer", arr);
  socket.on("sendDataClient", function (data) { 
    arr.push({...data, id: socket.id})
    socketIo.emit("sendDataServer", arr);
  })
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get('/test', (req, res, next) => {
  res.send(arr);
});

app.post('/test2', (req, res, next) => {
  console.log('abc')
  res.send('abc', req.body.test)
});

app.post('/', function (req, res) {
  console.log('abc')
  res.send('abc', req.body.test)
});

app.post('/signup', UserController.signup)
app.post('/loginFb', UserController.loginFb)
app.post('/login', UserController.login)

server.listen(8000, () => {
  console.log('Server đang chay tren cong 8000');
});
