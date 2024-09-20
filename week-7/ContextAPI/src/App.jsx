import {useState, useContext} from 'react';
import {CounterContext} from'./Context.jsx'

export default function App() {
    const [count, setCount] = useState(0);
    return(
    
        <CounterContext.Provider value = {{count, setCount}}>
            <Count />
        </CounterContext.Provider>
    )
}

function Count(){
    return(
       <>
         <CountRender />
         <Buttons />
       </>
    )
}

function CountRender(){
    const {count} = useContext(CounterContext);
    return(
        <>
        {count}
        </>
    )
}

function Buttons(){
    const {count , setCount} = useContext(CounterContext);
    return(
        <>
            <button onClick={()=>{setCount(count + 1)}}> Count +1 </button>
            <button onClick={()=>{setCount(count - 1)}}> Count -1 </button>
        </>
    )
}