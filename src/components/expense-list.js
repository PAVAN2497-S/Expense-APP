import ExpenseItem from "./expense-item"
import { useContext } from "react"
import { ExpenseContext } from '../App.js'

export default function ExpenseList(props) {
    const { expense, category } = useContext(ExpenseContext)

    return (
        <div>
            {Object.keys(expense.exp).length !== 0 && (
                <div>
                    <h1>Expense List-{Object.keys(expense.exp).length}</h1>
                    {Object.keys(category.cat).length && <table border='1'>
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>category</th>
                                <th>amount</th>
                                <th>date</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {expense.exp.map((ele) => {
                                return <ExpenseItem key={ele._id} {...ele} />
                            })}

                        </tbody>
                    </table>}
                </div>
            )

            }


        </div>
    )

}