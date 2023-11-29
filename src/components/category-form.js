import { useContext } from "react"
import { ExpenseContext } from "../App"
import { useState, useEffect } from "react"
import axios from "axios"

export default function CategoryForm(props) {
    const { catDispatch, category } = useContext(ExpenseContext)
    const [name, setName] = useState('')

    useEffect(() => {

        setName(category.editcat.name ? category.editcat.name : '')

    }, [category.editcat])

    function handleSubmit(e) {
        e.preventDefault()
        const catForm = {
            name: name
        }
        console.log(catForm)
        if (Object.keys(category.editcat).length > 0) {
            axios.put(`http://localhost:3066/api/categories/${category.editcat._id}`, catForm)
                .then((res) => {
                    //console.log(res.data, 'put')
                    catDispatch({ type: 'EDIT_CAT', payload: res.data })
                })

        } else {
            axios.post('http://localhost:3066/api/categories', catForm)
                .then((res) => {
                    // console.log(res.data)
                    catDispatch({ type: 'ADDCAT', payload: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })

        }
        setName('')
    }
    function handleToggle() {
        catDispatch({ type: 'CANCEL' })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add category</h1>
                <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type='submit' value={Object.keys(category.editcat).length > 0 ? 'update' : 'create'} /><br />
            </form>
            {Object.keys(category.editcat).length > 0 && (
                <button onClick={handleToggle}>cancel</button>
            )}
        </div>
    )

}