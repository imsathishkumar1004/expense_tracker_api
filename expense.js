const mongoose = require ('mongoose')
const expenseScehma = new mongoose.Schema({
    amount: Number,
    desc: String,
    title: String,
})
const Expense = mongoose.model('Expenses', expenseScehma)
module.exports = Expense