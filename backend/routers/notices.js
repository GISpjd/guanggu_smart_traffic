var express = require('express')

var router = express.Router()

const { getOne, getAll, exec } = require('../db')
module.exports = router
