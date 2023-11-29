const mongoose = require('mongoose')
const { Schema, model } = mongoose
const category = require('./category-model')

const expenseSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,

    },
    date: {
        type: Date,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: category
    }

})
const Expense = model('Expense', expenseSchema)

module.exports = Expense