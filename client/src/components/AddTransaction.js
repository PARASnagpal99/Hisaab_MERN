import React , {useState , useContext } from 'react'
import {GlobalContext} from '../context/GlobalState'

const AddTransaction = () => {
 const [text , setText] = useState("") ;
 const [amount , setAmount] = useState("") ; 
//  const mod = 1e9 + 7 ;
 const {addTransaction} = useContext(GlobalContext);
 

 const onSubmit = (e) =>{
    e.preventDefault() ;
    const newTransaction ={
      text,
      amount : +amount
    }
   // console.log(newTransaction);
    
    addTransaction(newTransaction)
    //console.log('here')
    setText("");
    setAmount("");
    
 }

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
            <label htmlFor='text'>Text</label>
            <input type="text"
             value={text} 
             onChange={(e)=>setText(e.target.value)} 
             placeholder='Enter text ...'
            />
        </div>
        <div className='form-control'>
           <label htmlFor='amount'>
                    Amount <br/>
                    (negative - expense , positive - expense) 
           </label>
           <input 
             type="number" 
             value={amount}
             onChange={(e)=>setAmount(e.target.value)}
             placeholder='Enter amount...'>
             </input>
        </div>
       <button className='btn'> Add Transaction</button>
      </form>
    </>
  )
}

export default AddTransaction