const Category = require('../models/category-model')
const { validationResult } = require('express-validator')
const categoryCltr = {}

categoryCltr.addCat = async function (req, res) {
    try {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(404).json({ errors: errors.array() })
        } else {
            const body = req.body
            const category = new Category(body)
            const Catres = await category.save()
            res.json(Catres)
        }
    } catch (e) {
        res.json(e)
    }
}

categoryCltr.getCat = async function (req, res) {
    try {
        const getRes = await Category.find()
        res.json(getRes)
    } catch (e) {
        res.json(e)
    }
}

categoryCltr.getOne = async function (req, res) {
    try {
        const id = req.params.id
        const getOne = await Category.findById(id)
        res.json(getOne)
    } catch (e) {
        res.json(e)
    }

}

categoryCltr.editCat = async function (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({ errors: errors.array() })
        } else {
            const id = req.params.id
            const body = req.body
            const editRes = await Category.findByIdAndUpdate(id, body, { new: true })
            res.json(editRes)
        }
    } catch (e) {
        res.json(e)
    }
}
categoryCltr.deleteCat = async function (req, res) {
    console.log(req)
    try {
        const id = req.params.id
        const delRes = await Category.findByIdAndDelete(id)
        res.json(delRes)
    } catch (e) {
        res.json(e)
    }
}
module.exports = categoryCltr