require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')

const configureDB = require('./config/db')
// const routes = require('./config/route')
const categoryCltr = require('./app/controllers/caterogy-Cltr')
const expenseCltr = require('./app/controllers/expense-Cltr')
const ValidationSchema = require('./app/helpers/categoryValiSch')
const EValidationSchema = require('./app/helpers/expenseValiSch')

const app = express()
const port = process.env.PORT || 3066

configureDB()
app.use(express.json())
app.use(cors())

app.post('/api/categories', checkSchema(ValidationSchema), categoryCltr.addCat)
app.get('/api/categories', categoryCltr.getCat)
app.get('/api/categories/:id', categoryCltr.getOne)
app.put('/api/categories/:id', checkSchema(ValidationSchema), categoryCltr.editCat)
app.delete('/api/categories/:id', categoryCltr.deleteCat)

app.post('/api/expenses', checkSchema(EValidationSchema), expenseCltr.add)
app.get('/api/expenses', expenseCltr.getExp)
app.get('/api/expenses/:id', expenseCltr.getOne)
app.put('/api/expenses/:id', checkSchema(EValidationSchema), expenseCltr.edit)
app.delete('/api/expenses/:id', expenseCltr.del)
// app.use('/', routes)

app.listen(port, () => {
    console.log('server running on port', port)
})