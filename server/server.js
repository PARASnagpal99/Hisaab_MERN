const express = require('express') ;
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db')
const app = express() ;

dotenv.config()
app.use(cors());


connectDB() ;
const transactions = require('./routes/transactions')


app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions' , transactions);


const PORT = process.env.PORT || 4000 ;

app.listen(PORT , () => {
    console.log(`Server is sucessfully running on port ${PORT}`.yellow.bold)
})