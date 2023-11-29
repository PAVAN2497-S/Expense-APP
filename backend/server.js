const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3066

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/expense-app')
    .then(() => {
        console.log('connected to DB')
    })
    .catch((e) => {
        console.log('error connecting to DB', e.message)
    })

// categories
const { Schema, model } = mongoose

//A schema in Mongoose defines the structure of documents (data) that will
//  be stored in a specific MongoDB collection. Each field in the schema corresponds
//   to a property that a document in that collection can have.

const categorySchema = new Schema({ //new Schema -creates a new instance of the Mongoose Schema class
    name: {
        type: String,
        required: true
    }
})
const Category = model('Category', categorySchema) // model- is like a collection - 


app.get('/api/categories', (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.post('/api/categories', (req, res) => {
    const { body } = req //
    const c1 = new Category() // This line creates a new instance of the Mongoose model 'Category'. It initializes an empty category object
    c1.name = body.name
    c1.save()
        .then((cat) => {
            res.json(cat)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

{/*
In Mongoose, when you define a model,
like Category in this code, it represents a collection in MongoDB.
You don't call categories.find() because you're not working directly
with a collection but with the Mongoose model itself.
 */}
app.get('/api/categories/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id)
        .then((cat) => {
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.put('/api/categories/:id', (req, res) => { // update
    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id, body, { runValidators: true, new: true })
        .then((cat) => {
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
})
app.delete('/api/categories/:id', (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((cat) => {
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
})  //delete


// for expense
const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    expenseDate: {
        type: Date,
        default: new Date()
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    }

})
const Expense = model('Expense', expenseSchema) // model

app.get('/api/expenses', (req, res) => {
    Expense.find()
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
})
app.post('/api/expenses', (req, res) => {
    const { body } = req
    const c1 = new Expense()
    Object.assign(c1, body)
    c1.save()
        .then((exp) => {
            res.json(exp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

app.get('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findById(id)
        .then((exp) => {
            res.json(exp)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.put('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id, body, { runValidators: true, new: true })
        .then((exp) => {
            res.json(exp)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.delete('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    Expense.findByIdAndDelete(id)
        .then((exp) => {
            res.json(exp)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.listen(port, () => {
    console.log('server running on port 3066')
})