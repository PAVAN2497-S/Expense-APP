import { useContext } from "react"
import { ExpenseContext } from "../App"
import { useState, useEffect } from "react"
import axios from "axios"


export default function ExpenseForm(props) {
    const { expDispatch } = useContext(ExpenseContext)
    const { category, expense } = useContext(ExpenseContext)
    const [title, setTitle] = useState('')
    const [categoryId, setCategotyId] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        setTitle(expense.editexp.title ? expense.editexp.title : '')
        setCategotyId(expense.editexp.categoryId ? expense.editexp.categoryId : '')
        setAmount(expense.editexp.amount ? expense.editexp.amount : '')
        setDate(expense.editexp.date ? expense.editexp.date : '')

    }, [expense.editexp])

    function handleSubmit(e) {
        e.preventDefault()
        const expForm = {
            title: title,
            amount: Number(amount),
            categoryId: categoryId,
            date: date
        }
        if (Object.keys(expense.editexp).length > 0) {
            axios.put(`http://localhost:3066/api/expenses/${expense.editexp._id}`, expForm)
                .then((res) => {
                    expDispatch({ type: 'EXP_EDIT', payload: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios.post('http://localhost:3066/api/expenses', expForm)
                .then((res) => {
                    //console.log(res.data)
                    expDispatch({ type: 'ADDEXP', payload: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        setTitle('')
        setCategotyId('')
        setAmount('')
        setDate('')
    }
    function handleToggle() {
        expDispatch({ type: 'CANCEL' })
    }


    return (
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={title} placeholder='title' onChange={(e) => { setTitle(e.target.value) }} /><br />
                <select value={categoryId} onChange={(e) => { setCategotyId(e.target.value) }}>
                    <option value=''>category</option>
                    {category.cat.map((ele) => {
                        return <option key={ele._id} value={ele._id}>{ele.name}</option>
                    })}
                </select><br />
                <input type='text' placeholder='amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} /><br />
                <input type='date' value={date} onChange={(e) => { setDate(e.target.value) }} /><br />
                <input type='submit' value={Object.keys(expense.editexp).length > 0 ? 'update' : 'create'} />
            </form>
            {Object.keys(expense.editexp).length > 0 && (
                <button onClick={handleToggle}>cancel</button>
            )}
        </div>
    )


}