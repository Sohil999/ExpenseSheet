const express = require('express')
const router = express.Router()
const { getExpenses, setExpenses } = require('../controllers/expenseController')


router.get('/', getExpenses)


router.post('/', setExpenses)


module.exports = router