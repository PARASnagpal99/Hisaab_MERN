import React , {useContext , useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'

const TransactionList = () => {
  const {transactions , getTransactions } = useContext(GlobalContext)
  //console.log(transactions);
  useEffect(()=>{
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
   
  return (
    <>
    <h3>History</h3>
    <ul id="list" className="list">
        {transactions.map(item =>(
          <Transaction key={item._id} item={item}/>
        ))} 
    </ul>
    </>
  )
}

export default TransactionList