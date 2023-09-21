const express = require('express');
const router = express.Router();


const {getAllItems,getSingleItem,addItem,editItem,deleteItem, processPayment, getSalesInfo, getTopSellingItem, getUsersInfo} = require('../persistence/Items');
const {getAllClients, registerAccount, findUser, Authenticate, myOrders, myOrderProducts, AllOrders, theOrders} = require('../persistence/users');
const { VerifyToken, homeVerify } = require('../services/TokenService');
router.route('/products').get(getAllItems);
router.route('/users').get(getAllClients).post(registerAccount)
router.route('/users/:email').get(findUser);
router.route('/login').post(Authenticate);
router.route('/products/:id').delete(deleteItem);
router.route('/').get(VerifyToken)
router.route('/cart').post(VerifyToken,processPayment);
router.route('/orders').get(VerifyToken,myOrders);
router.route('/orders/:id').get(VerifyToken, myOrderProducts);
router.route('/admin/allsales').get(getSalesInfo);
router.route('/admin/topselling').get(getTopSellingItem);
router.route('/admin/usersinfo').get(getUsersInfo)
router.route('/admin/orders').get(AllOrders);
router.route('/admin/userorders').get(theOrders);




module.exports = router;