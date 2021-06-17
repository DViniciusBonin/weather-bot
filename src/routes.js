const express = require('express')
const HomeController = require('./controllers/HomeController')

const router = express.Router();
const homeController = new HomeController();

router.get('/', (req, res) => {
    res.render('home')
})

router.post('/submit', homeController.submit)

module.exports = router