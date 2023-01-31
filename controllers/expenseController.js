const Expense = require('../expense')
const client = require('../index2')
const { collection } = require('../index2')

const getExpenses = async (req, res) => {
    try {
        const expenses = await collection.find({})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const setExpenses = async (req, res) => {
    const expense = new Expense({
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    })

    try {
        const newExpense = await expense.save()
        res.status(201).json(newExpense)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteExpense = async (req, res) => {

}


module.exports = {
    getExpenses,
    setExpenses,
    deleteExpense
}