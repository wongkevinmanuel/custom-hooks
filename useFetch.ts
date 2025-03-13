import { useEffect, useState } from "react"

/*
Almacenar peticiones de https en cache para recuperar
la informacino que ya se habia almacenado, para lo 
volver a llamar....
Almacenar un objeto como el anterior para hacerlo 
servir de cache local.
*/
/* Ejemplo
const localChache = {
    'https://pokemon/1':{name:'Bulasaur', info},
    'https://pokemon/2':{name:'Ivysaur', info},
} 
*/

//No se exporta objeto se mantiene como una variable en memoria
//que solo el hooks tiene asceso a ella
const localCache = {};

export const useFetch = (url:string)=>{

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: { code: 0, message: ''}
    });

    useEffect(()=>{
        getFetch();
    },[url]);

    const setLoadingState = () =>{
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: { code: 0, message: ''},
        });

        return;
    }

    const getFetch= async()=>{
        //Ya se tiene la data
        //Como se solicita si ya previamente se la solicito?
        //
        //Verificar el cache =
        if(localCache[url]){
            console.log('Usando caché');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: { code: 0, message: ''}
            });

            return;
        }

        setLoadingState();

        const resp = await fetch(url);
        //sleep
        await new Promise(resolve => setTimeout(resolve, 1500));

        //existe error
        if(!resp.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return;
        }
        

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error:{ code:0, message:''}
        });

        //Punto exacto donde se crea el nuevo valor de la cache
        //manejo del cache
        localCache[url] = data;

    };

    return{
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        error: state.error
    }

}