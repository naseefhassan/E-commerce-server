const express = require('express')
const router = express.Router()
const {signup}= require('../Controller/CommonController')

router.post('/signup',signup)

module.exports = router