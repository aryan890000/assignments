import { useState } from "react";
import { useRecoilValue } from "recoil";
import { TodoAtom } from "../store/atoms/TodoAtom";

const FilterTodo = () =>{

    const [filterSearch,setFilterSearch] = useState("")
    const [filteredTodo,setFilteredTodo] = useState([])
    const todoList = useRecoilValue(TodoAtom)

    const handleFilter = (e)=>{
        setFilterSearch(e.target.value)
        setFilteredTodo(todoList.filter(todo => todo.title && todo.title.includes(e.target.value)));
    }


    return(
        <>
            <input 
                type="text" 
                placeholder="Enter a todo title to filter" 
                name="filter" 
                style={{borderRadius:"7px", padding:"7px"}}  
                value={filterSearch} 
                onChange={handleFilter}
            />
            
            {filteredTodo.map(todo => (
            <div key={todo.id} style={{display:"flex", gap:"10px", justifyContent: "center"}}>
                <p> Title : {todo.title}</p> 
                <p>Description : {todo.description}</p>
            </div>
        ) )}

        
            
        </>

    )
}



export default FilterTodo;