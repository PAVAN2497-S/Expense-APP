
import CategoryForm from "./category-form"
import CategoryList from "./category-list"

export default function  CategoryContainer (props){

    return (
        <div style={{ display: 'flex', gap: '100px' }}>
            <CategoryList />
            <CategoryForm />
        </div>
    )

}