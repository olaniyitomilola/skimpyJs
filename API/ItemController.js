const express = require('express');
const router = express.Router();


const {getAllItems,getSingleItem,addItem,editItem,deleteItem} = require('../persistence/Items');
const {getAllClients} = require('../persistence/users')
router.route('/products').get(getAllItems).post(addItem);
router.route('/users').get(getAllClients)


router.route('/products/:id').get(getSingleItem).delete(deleteItem);



module.exports = router;