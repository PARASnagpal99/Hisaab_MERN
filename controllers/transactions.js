const Transaction = require('../modals/Transaction') ;

// @desc : GET all Transactions 
// @route : GET /api/v1/transactions 
// @acess Public 
exports.getTransactions = async(req,res,next)=>{
    try{
        const transactions = await Transaction.find() ;
        return res.status(200).json({
            success : true ,
            count : transactions.length , 
            data : transactions 
        })
    }catch(err){
        return res.status(500).json({
            success : false ,
            error : 'Server Error' 
        })
    }
}


// @desc : Add  Transactions 
// @route : POST /api/v1/transactions 
// @acess Public 
exports.addTransactions = async(req,res,next)=>{
    try{
        const {text , amount} = req.body ;
        const transaction = await Transaction.create(req.body) ;
        return res.status(201).json({
            success : true ,
            data : transaction
        })
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success : false ,
                error : messages
            })
        }else{
            return res.status(500).json({
                success : false ,
                error : 'Server Error' 
            })
        }
    }
    
}


// @desc : Delete Transaction 
// @route : DELETE /api/v1/transactions/:id 
// @acess Public 
exports.deleteTransactions = async(req,res,next)=>{
    try {
        const transaction = await Transaction.findById(req.params.id) ;
        if(!transaction){
            return res.status(404).json({
                success : false ,
                error : 'No transaction found' 
            })
        }
       // console.log(transaction)
        await Transaction.deleteOne(transaction);
        return res.status(200).json({
            success : true ,
            data : {} 
        })
    }catch(err){
        return res.status(500).json({
            success : false ,
            error : 'Server Error' 
        })
    }
}


