import React , {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';


const Transaction = ({item}) => {
   const {deleteTransaction} = useContext(GlobalContext);
   const sign = item.amount < 0 ? '-' : '+' ;
   //console.log(item);
  return (
    <li className={sign === '-' ? "minus" : "plus"}>
    {item.text} 
    <span>{sign} ${numberWithCommas(Math.abs(item.amount))}</span>
    <button onClick={() => deleteTransaction(item._id)} className='delete-btn'>x</button>
  </li>
  )
}

export default Transaction