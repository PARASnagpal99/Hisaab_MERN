import React , {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import { numberWithCommas } from '../utils/format';

const IncomeExpenses = () => {
  const {transactions} = useContext(GlobalContext);
  // let pos = 0 , neg = 0 ;
  // const amounts = transactions.map(transaction => transaction.amount);
  // //console.log(typeof(amounts))
  
  // amounts.forEach(element => {
  //     if(element >= 0){
  //       pos += element
  //     }else{
  //       neg += element ;
  //     }
  // });
  
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
     <div>
       <h4>Income</h4>
       <p className="money plus">{numberWithCommas(income)}</p>
     </div>
       <div>
        <h4>Expense</h4>
        <p className="money minus">{numberWithCommas(expense)}</p>
        </div>
      </div>
  )
}

export default IncomeExpenses