import React , {createContext , useReducer} from 'react';
import reducer from './AppReducer' ;
import axios from 'axios'

// Intial State 
const initialState = {
    transactions : [] ,
    error : null ,
    loading : true 
}

// Create Context 
export const GlobalContext = createContext(initialState) ;


// Provider component 
export const GlobalProvider = ({children}) =>{
    const [state , dispatch] = useReducer(reducer , initialState) ;
    
    // Actions 
    const getTransactions =async()=>{
          try{
            const res = await axios.get('/api/v1/transactions');
            //console.log(res);
            dispatch({
                type : 'GET_TRANSACTIONS' ,
                payload : res.data.data 
            })
          }catch(err){
             dispatch({
                type : 'TRANSACTION_ERROR' ,
                payload : err.response.data.error 
             });
          }
    }



    const deleteTransaction =async(id)=> {
        try{
           await axios.delete(`/api/v1/transactions/${id}`);
           dispatch({
             type : 'DELETE_TRANSACTION' ,
             payload : id 
           })
        }catch(err){
           dispatch({
            type : 'TRANSACTON_ERROR' ,
            payload : err.response.data.error 
           })
        }
    }
  
    const addTransaction=async(transaction)=>{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        try{
           const res = await axios.post('/api/v1/transactions',transaction,config)
           dispatch({
            type : 'ADD_TRANSACTION' ,
            payload : res.data.data  
        })
        }catch(err){
            dispatch({
                type : 'TRANSACTON_ERROR' ,
                payload : err.response.data.error 
               })
        }
    }


    return (
        <GlobalContext.Provider value={{
            transactions : state.transactions,
            error : state.error ,
            loading : state.loading ,
            deleteTransaction ,
            addTransaction , 
            getTransactions 
        }}>
            {children}
        </GlobalContext.Provider>
    )

}