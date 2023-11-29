import ExpenseForm from "./expense-form"
import ExpenseList from "./expense-list"

export default function ExpenseContainer(props){
    return (
        <div style={{ display: 'flex', gap: '100px' }}>
            <ExpenseList />
            <ExpenseForm />
        </div>
    )
}