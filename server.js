require('dotenv').config()
const express = require('express')
const router = require('./src/routes')
const bodyParser = require('body-parser');

const server = express();

const port = process.env.PORT || 7000

server.engine("html", require("ejs").renderFile)
server.set('view engine', 'html');
server.set('views', './src/views')
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(router)


server.listen(port, () => console.log(`server is running in http://localhost:${port}`))