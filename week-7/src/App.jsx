import { lazy, Suspense, memo } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

const ListTodo = lazy ( ()=> import('./components/ListTodo'))
const AddTodo = lazy ( ()=> import('./components/AddTodo'))
const FilterTodo = lazy ( ()=> import('./components/FilterTodo'))




function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Suspense fallback={"loading..."}><ListTodo /></Suspense>} />
            <Route path="/addtodo" element={<Suspense fallback={"loading..."}><AddTodo /></Suspense>} />
            <Route path="/filter"  element={<Suspense fallback={"loading..."}><FilterTodo /></Suspense>} />
        </Routes>
        </BrowserRouter>  
      </RecoilRoot>
    </>
  )
}

const Header  = memo(() => {
  const navigate = useNavigate()

  return(
    <main style={{margin : '20px'}}>
      <button onClick={ () => {navigate('/')}} style={{margin : '0px 10px 0px 10px'}}>Todo List</button>
      <button onClick={ () => {navigate('/addtodo')}} style={{margin : '0px 10px 0px 10px'}}>Add Todo</button>
      <button onClick={ () => {navigate('/filter')}} style={{margin : '0px 10px 0px 10px'}}>Filter Todo</button>

    </main>
  )
}
)

export default App
