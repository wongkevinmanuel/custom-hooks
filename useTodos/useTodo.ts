import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

interface Props{
    //Props: React.ReactNode,
    initialState: initialState[]    
}

type initialState = {
    id: number,
    description: string,
    done: boolean
}

const init = () => {
    return JSON.parse(localStorage.getItem('todos') || '[]') ;
}

export const useTodo =( estadoInicial : initialState[] ) => {

    const [todos, distpach] = useReducer(todoReducer, estadoInicial, init);
    
    //Guardar en memoria de local storage
    //se dispara al cambio de todos
    useEffect(() => {
        //Serializa el todos para guardarlo en local storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //Emitir onNewTodo al manejo del formulario
    const handleNewTodo = (todo:any)=>{
       const action = {
            type:'Add',
            payload:todo,
       };
       distpach(action);
    };

    const handleToggleTodo = (id:number)=>{
        console.log(id);
        distpach({
            type:'Toggle',
            payload: id,
        });
    };

    const handleDeleteTodo = (id:number)=>{
        console.log(id);
        distpach({
            type:'Remove',
            payload:id,
        });
    };
  
    return (
    {
        todos: todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=> !todo.done).length,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
    }
  )
}
