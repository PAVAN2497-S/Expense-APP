import logo from './logo.svg';
import './App.css';
import CategoryContainer from './components/categort-container'
import ExpenseContainer from './components/expense-container'
import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import ChartComp from './components/chart';

export const ExpenseContext = createContext()

function catReducer(state, action) {

  switch (action.type) {

    case 'CATEGORY': {
      return { ...state, cat: [...action.payload] }
    }
    case 'ADDCAT': {
      return { ...state, cat: [...state.cat, action.payload] }
    }
    case 'CATDELETE': {
      return { ...state, cat: state.cat.filter(ele => ele._id !== action.payload._id) }
    }
    case 'SET_EDITCAT': {

      return { ...state, editcat: action.payload }
    }
    case 'EDIT_CAT': {
      return {
        ...state, cat: state.cat.map((ele) => {
          if (ele._id == action.payload._id) {
            return { ...ele, name: action.payload.name }
          } else {
            return ele
          }

        }), editcat: {}
      }
    }
    case 'CANCEL': {
      return { ...state, editcat: {} }
    }
    default: {
      return { ...state }
    }
  }

}
function expReducer(state, action) {
  switch (action.type) {

    case 'EXPENSE': {
      return { ...state, exp: [...action.payload] }
    }
    case 'ADDEXP': {
      return { ...state, exp: [...state.exp, action.payload] }
    }
    case 'EXPDEL': {
      return { ...state, exp: state.exp.filter(ele => ele._id !== action.payload._id) }
    }
    case 'SET_EXP_EDIT': {
      return { ...state, editexp: action.payload }
    }
    case 'EXP_EDIT': {
      return {
        ...state, exp: state.exp.map((ele) => {
          if (ele._id == action.payload._id) {
            return { ...action.payload }
          } else {
            return { ...ele }
          }
        }), editexp: {}
      }
    }
    case 'CANCEL': {
      return { ...state, editexp: {} }
    }
    default: {
      return { ...state }
    }
  }
}


function App() {

  const [category, catDispatch] = useReducer(catReducer, { cat: [], editcat: {} })// category
  const [expense, expDispatch] = useReducer(expReducer, { exp: [], editexp: {} }) // expense

  useEffect(() => {
    axios.get('http://localhost:3066/api/categories')
      .then((res) => {
        catDispatch({ type: 'CATEGORY', payload: res.data })
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    axios.get('http://localhost:3066/api/expenses')
      .then((res) => {
        console.log(res.data, 'exp')
        expDispatch({ type: 'EXPENSE', payload: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <ExpenseContext.Provider value={{ category, catDispatch, expense, expDispatch }}>
        <h1> Expense App</h1>
        <CategoryContainer />
        <ExpenseContainer />
        <ChartComp />
      </ExpenseContext.Provider>
    </div>
  )



}

export default App;
