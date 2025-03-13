import { FC } from 'react';
//Hook es una simple funcion
//Hook personalizados internamente
//estan amarados a algun hooks de
//react
import  { useState } from 'react'

export const useCounter = (initialValue = 10 ) => {
    const [counter, setCounter ] = useState(initialValue);

    //TODO LA LOGICA DEL NEGOCIO SE ESTBLECE 
    //Exponer el setCounter para manipular valor counter
    //Enviar en el return los metodos
    //Metodo 1)
    const incremet = (value:number = 1 )=>{
        setCounter(counter+value);
    }

    const decrement = (value:number = 1 )=> {
        if(counter <= 0 ) return;

        setCounter(counter-value);
    }

    const reseteo = (value:number = 1 )=> {
        setCounter(value);
    }

    return {
        counter,
        incremet,
        decrement,
        reseteo
    }
}
