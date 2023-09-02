const express = require('express');
const router = express.Router();


const {getAllItems,getSingleItem,addItem,editItem,deleteItem} = require('../persistence/Items');
const {getAllClients, registerAccount, findUser, Authenticate} = require('../persistence/users')
router.route('/products').get(getAllItems).post(addItem);
router.route('/users').get(getAllClients).post(registerAccount)
router.route('/users/:email').get(findUser);
router.route('/login').post(Authenticate);
router.route('/products/:id').get(getSingleItem).delete(deleteItem);



module.exports = router;