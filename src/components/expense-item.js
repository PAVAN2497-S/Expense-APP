import { useContext } from "react"
import { ExpenseContext } from "../App"
import axios from "axios"

export default function ExpenseItem(props) {
    const { expense, category } = useContext(ExpenseContext)
    const { expDispatch } = useContext(ExpenseContext)
    const { _id, title, categoryId, amount, date } = props
    console.log(date, 'item')
    function handleDelete() {
        axios.delete(`http://localhost:3066/api/expenses/${_id}`)
            .then((res) => {
                expDispatch({ type: 'EXPDEL', payload: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleEdit() {
        const expObj = expense.exp.find(ele => ele._id == _id)
        expDispatch({ type: 'SET_EXP_EDIT', payload: expObj })

    }
    return (
        <tr>
            <td>{title}</td>
            {category.cat.length > 0 && <td>{category.cat.find(ele => ele._id == categoryId).name}</td>}
            <td>{amount}</td>
            <td>{new Date(date).toLocaleDateString()}</td>
            <td><button onClick={handleDelete}>delete</button>
                <button onClick={handleEdit}>edit</button>
            </td>
        </tr>
    )

}