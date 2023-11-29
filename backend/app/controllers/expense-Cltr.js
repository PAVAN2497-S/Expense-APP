const Expense = require('../models/expense-model')
const { validationResult } = require('express-validator')
const expenseCltr = {}

expenseCltr.add = async function (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        } else {
            const body = req.body
            const expense = new Expense(body)
            const expRes = await expense.save()
            res.json(expRes)
        }
    } catch (e) {
        res.json(e)
    }
}

expenseCltr.getExp = async function (req, res) {
    try {
        getRes = await Expense.find()
        res.json(getRes)
    } catch (e) {
        res.json(e)
    }
}

expenseCltr.getOne = async function (req, res) {
    try {
        const id = req.params.id
        const getRes = await Expense.findById(id)
        res.json(getRes)
    } catch (e) {
        res.json(e)
    }
}
expenseCltr.edit = async function (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({ errors: errors.array() })
        } else {
            const id = req.params.id
            const body = req.body
            const editRes = await Expense.findByIdAndUpdate(id, body, { new: true })
            res.json(editRes)
        }
    } catch (e) {
        res.json(e)
    }
}
expenseCltr.del = async function (req, res) {
    try {
        const id = req.params.id
        const delRes = await Expense.findByIdAndDelete(id)
        res.json(delRes)
    } catch (e) {
        res.json(e)
    }
}

module.exports = expenseCltr