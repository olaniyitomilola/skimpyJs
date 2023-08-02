const express = require('express');
const router = express.Router();


const {getAllItems,getSingleItem,addItem,editItem,deleteItem} = require('../persistence/Items');


router.route('/').get(getAllItems).post(addItem);

router.route('/:id').get(getSingleItem);


module.exports = router