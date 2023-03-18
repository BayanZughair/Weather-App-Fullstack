const express = require('express')
const api = require('./server/routes/api')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = 3444


const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/weatherDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))


app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', api)

app.listen(port, function () {
    console.log(`running server on port ${port}`)
  })
