
export const todoReducer = (initialState = [], action)=>{
    
    //Add
    //AGREGAR NUEVO ELEMENTO 
    //APARTIR DEL ARREGLO ANTERIOR
    //EXPRESS para esparcir cada elemento del arreglo
    //...initialState,
    //NUEVO TODO TAREA agregar al arreglo
    //action.payload
    //TOGGLE TODO Cambiar de estado a done
    // 
    switch (action.type) {
        case 'Add':            
               return [ ...initialState, action.payload]
        case 'Remove'://crea nuevo arreglo de TODO
            return initialState.filter(todo=> todo.id !== action.payload);
        case 'Toggle'://Regresa un nuevo arreglo de TODO por cada elemento del arreglo se tiene todo
            return initialState.map(todo => {
                    if(todo.id === action.payload){
                        return{
                            ...todo,
                            done: !todo.done,
                        }
                    }
                    return todo;
                }
            );
        case '':
            throw new Error('Action.type = ABC no esta implementada');
                
        default:
            return initialState;
    }
}