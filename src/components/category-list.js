import CategoryItem from "./category-item"
import { useContext } from "react"
import { ExpenseContext } from "../App"
export default function CategoryList(props) {
    const { category } = useContext(ExpenseContext)

    return (
        <div>
            {Object.keys(category.cat).length > 0 && (
                <div>

                    <h1>CATEGORY LIST-{Object.keys(category.cat).length}</h1>
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>categories</th>
                                <th>options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.cat.map((ele) => {
                                return <CategoryItem {...ele} key={ele._id} />
                            })}
                        </tbody>
                    </table>
                    {/* <ul>
                        {category.cat.map((ele) => {
                            return <CategoryItem {...ele} key={ele._id} />
                        })}
                    </ul> */}
                </div>
            )}
        </div>
    )

}