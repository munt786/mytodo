import {useState,useEffect,useRef} from 'react'
import { FaCheckCircle,FaCircle } from 'react-icons/fa';
import './MyTodo.css';

function MyTodo(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [todos,setTodos]=useState([]);
    const [editIndex,setEditIndex]=useState(null);
    const inputRef=useRef(null)

    useEffect(()=>{
        const savedTodos=JSON.parse(localStorage.getItem('mytodos'))
        if(savedTodos){
            setTodos(savedTodos);
        }
        resetForm();
    },[])

    const resetForm=()=>{
        setTitle('');
        setDescription('');
        inputRef.current.focus();
    }

    function addTodo(){
        if(title.trim()!=='' && description.trim()!==''){
            const newTodo=([...todos,{id:Date.now(),title,description, completed: false}]);
            setTodos(newTodo);
            localStorage.setItem('mytodos',JSON.stringify(newTodo));
            resetForm();
        }
    }

    function editTodo(){
        if(title.trim()!=='' && description.trim()!==''){
            if(editIndex===null) return;
            const editedTodos=todos.map((todo,index)=>index===editIndex?{id:Date.now(),title,description}:todo)
            setTodos(editedTodos);
            localStorage.setItem('mytodos',JSON.stringify(editedTodos));
            setEditIndex(null);
            resetForm();
        }
    }
    function editById(id){
        if(!todos[id]) return;
        setTitle(todos[id].title);
        setDescription(todos[id].description);
        setEditIndex(id);
    }

    function deleteById(id){
        const updatedTodos=todos.filter((_,index)=>index!==id);
        setTodos(updatedTodos);
        localStorage.setItem('mytodos',JSON.stringify(updatedTodos));
        resetForm();
    }

    function toggleComplete(id){
        const updatedTodos=todos.map((todo)=>
            todo.id===id?{...todo, completed: !todo.completed}:todo
        )
        setTodos(updatedTodos);
        localStorage.setItem('mytodos',JSON.stringify(updatedTodos));
    }

    return(
        <div className='main-container'>
            <div className='input-container'>
                <input type='text' placeholder='Enter title...'
                className='input-field' ref={inputRef}
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea rows={3} placeholder='Enter description...'
                className='input-field'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
                <button className='input-btn'
                onClick={editIndex!==null?editTodo:addTodo}
                >{editIndex!==null?'Update':'Add'}</button>
            </div>
            <div className='todo-container'>
                {todos.map((todo,index)=>(
                    <div key={index} className='todo-box' style={{backgroundColor:todo.completed?'rgba(100,255,100,0.5)':'rgba(255,50,50,0.6)'}}>
                        <span><h4 style={{textAlign:'left'}}>{todo.title}</h4></span>
                        <span><p>{todo.description}</p></span>
                        <button onClick={()=>toggleComplete(todo.id)} className='btn-complete'>
                            {todo.completed?<FaCheckCircle/>:<FaCircle style={{color:'transparent',border:'3px solid black',borderRadius:'50%'}}/>}
                        </button>
                        <button onClick={()=>editById(index)} className='btn-edit'>Edit</button>
                        <button onClick={()=>deleteById(index)} className='btn-delete'>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyTodo;