import { useContext } from "react"
import { ExpenseContext } from "../App"
import axios from "axios"

export default function CategoryItem(props) {
    const { name, _id } = props
    const { catDispatch, category, expense } = useContext(ExpenseContext)

    function handleDelete() {
        const filterId = expense.exp.filter(ele => ele.categoryId == _id).length
        if (filterId) {
            alert('cannot delete categories')
        } else {
            axios.delete(`http://localhost:3066/api/categories/${_id}`)
                .then((res) => {
                    // console.log(res.data)
                    catDispatch({ type: 'CATDELETE', payload: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    function handleEdit() {
        const Obj = category.cat.find(ele => ele._id == _id)
        catDispatch({ type: 'SET_EDITCAT', payload: Obj })
        //console.log(Obj, 'obj')
    }

    return (
        <tr>
            <td>{name}</td>
            <td>
                <input type="button" value="edit" onClick={handleEdit} />
                <input type="button" value="remove" onClick={handleDelete} />
            </td>

        </tr>
        // <li>
        //     {name}
        //     <input type="button" value="edit" onClick={handleEdit} />
        //     <input type="button" value="remove" onClick={handleDelete} />

        // </li>
    )

}