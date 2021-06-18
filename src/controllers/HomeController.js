const { response } = require('express')
const temperature = require('../services/temperature-bot')

class HomeController {
    async submit(req, res) {
        const { city } = req.body

        const result = await temperature(city)
        result.city = city
        // console.log(result)
        // res.render('temperatura', result)
        return res.status(200).json(result)
    }
}

module.exports = HomeController;