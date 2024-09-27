import { useRecoilValue } from 'recoil';
import { TodoAtom } from '../store/atoms/TodoAtom'


const ListTodo = () => {
const todoList = useRecoilValue(TodoAtom)

return(
    <div>
        {todoList.map((todo,index) => (
            <div key={index} style={{display:"grid" ,gridTemplateColumns: "1fr 1fr", gap:"10px"}}>
                <p>Title : {todo.title}</p>
                <p>Description : {todo.description}</p>
            </div>
        ))}
    </div>
)
}  

export default ListTodo;
