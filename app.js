'use-strict';

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const router = require('./API/ItemController')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})