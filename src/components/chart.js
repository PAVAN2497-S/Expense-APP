import { PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { ExpenseContext } from '../App'
import { useContext } from 'react'


export default function ChartComp(props) {
    const { expDispatch, expense, category } = useContext(ExpenseContext)

    const arr = expense.exp.reduce((pv, cv) => {
        const catName = category.cat.find(ele => ele._id == cv.categoryId).name
        console.log(catName)
        if (pv.hasOwnProperty(catName)) {
            pv[catName] += cv.amount
        } else {
            pv[catName] = cv.amount
        }
        return pv

    }, {})
    console.log(arr)

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Expense Distribution</h1>
            <PieChart data={Object.entries(arr)} />

        </div>

    )
}