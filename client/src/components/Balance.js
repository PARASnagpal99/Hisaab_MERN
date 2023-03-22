import React , {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import { numberWithCommas } from '../utils/format';


const Balance = () => {
  const {transactions} = useContext(GlobalContext)
  // Amounts is a array which stores the amount of each item in transaction 
  // Now using reduce method in JS we will find sum of all the amount 
  // toFixed is used to deal with precision errors 
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  let message = "" ;
  if(total >= 0){
    message = `You have $${numberWithCommas(total)} money left in your Wallet`
  }else{
    message = `Oops you are in debt of $${numberWithCommas(total)}`
  }
  return (
    <div>
        <h2>{message}</h2>
    </div>
  )
}

export default Balance