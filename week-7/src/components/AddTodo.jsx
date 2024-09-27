import {useState} from 'react';
import { TodoAtom } from '../store/atoms/TodoAtom'
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = () => {

    const [todo,setTodo] = useState({title:"",description:""})
    const setAtomTodo = useSetRecoilState(TodoAtom)

    const handleTodo = ()=> {
        const newTodo = {id:uuidv4() ,...todo}
        setAtomTodo( prev => [...prev,newTodo ])
        setTodo({title:"",description:""})
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTodo( prev => ({
            ...prev,
            [name] : value
        }))
    }


    return(
        <main style={{display:"flex",gap:"10px"}}>
            <input 
                type="text" 
                style={{borderRadius:"7px", padding:"0px 10px 0px 10px"}}  
                placeholder="Enter a todo title" 
                name = "title"
                value = {todo.title}
                onChange={handleChange}
            />

            <input 
                type="text"  
                style={{borderRadius:"7px", padding:"0px 10px 0px 10px"}} 
                placeholder="Enter a todo description"
                name = "description" 
                value={todo.description}
                onChange = { handleChange}
            />

            <button onClick={handleTodo}>Add</button>
        </main>
    )
}

export default AddTodo;