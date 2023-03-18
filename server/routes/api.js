const express = require('express')
const router = express.Router()
const City = require('../models/City')
const request = require('request')

router.get('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName

    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9777a938a2d302fbb9ec08954beec26`, function (error, response, body) {
        const data = JSON.parse(response.body)

        if( data.message =='city not found' ) {
            res.send("not found")
        } else {

        const city = {
            name: data.name,
            temperature: (data.main.temp - 273.15).toFixed(1),
            condition: data.weather[0].main,
            conditionPic: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        }
        res.send(city)
       }
    })
})

router.get('/cities', function (req, res) {
    City.find({})
        .then(result => {
            res.send(result)
        })  
})

router.post('/city', function (req, res) {
    const city = new City({ name: req.body.name, temperature: req.body.temperature, condition: req.body.condition, conditionPic: req.body.conditionPic })
    city.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    City.deleteOne({ name: cityName })
        .then(result => {
            res.end()
        })    
})

module.exports = router