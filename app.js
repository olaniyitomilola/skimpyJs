'use-strict';
const {AddProduct,createUser, getAllProducts,getAllUsers, getNumberOfClients, getNumberOfProducts, getNumberOfOrders, getSingleUser, getAllOrders, getAllOrderProducts, getAllSales, getThisMonthSales, getPreviousMonthSales, getTopSellingProductByPrice, getTopBuyers, getUserOrder} = require('./persistence/queries');


const start = require('./dbchecks');

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors')

const router = require('./API/Controller');
const { dBInsertError } = require('./custom_errors/customErrors');
const { dropTable } = require('./persistence/connect');
require('dotenv').config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

//check that all db is set before starting server

async function startApp(){
    let allset = await start();

    if(allset){
        app.listen(port, async ()=>{
            console.log(`App is listening on port ${port}`)
            console.log(await getUserOrder())
        })
       
    }else{
        console.error('Something wrong with db')
    }
}

startApp()
 