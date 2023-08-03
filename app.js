'use-strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors')

const router = require('./API/ItemController')
require('dotenv').config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})