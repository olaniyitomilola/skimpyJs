const {dBInsertError} = require('../custom_errors/customErrors')
const {DB} = require('./connect');
const {v4: uuidv4} = require('uuid');



async function createAccount(first_name,last_name,email,password,phone,address){
   const id = uuidv4();
    const query = `
    INSERT INTO users(id, first_name,last_name,password, phone, email, address)
    VALUES($1,$2,$3,$4,$5,$6,$7);
    `
    try{
        await DB.query(query,[id, first_name, last_name, password, phone, email, address])

    } catch(err){
        throw new dBInsertError(`Error: ${err}`)
    }
}

async function AddProduct(productName, productPrice, img_source){
    const query = `
    INSERT INTO products(product_name,price,img_sources)
    VALUES($1,$2,$3);
    `
    try{
        await DB.query(query,[productName,productPrice,img_source])

    } catch(err){
        throw new dBInsertError(`Error: ${err}`)
    }
}

async function getAllProducts(){
    const query = `
        SELECT * FROM products;
    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        console.error(err)
    }
}

async function getAllUsers(){
    const query = `
        SELECT id,first_name, last_name, email,phone, email, address FROM users;
    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch clients')
    }
}
async function getNumberOfClients(){
    const query = `
        SELECT COUNT(*) FROM users;
    `
    try{
            let result = await DB.query(query);
            return result.rows[0].count;

    } catch(err){
        console.error(err)
    }
}


async function getNumberOfProducts(){
    const query = `
        SELECT COUNT(*) FROM products;
    `
    try{
            let result = await DB.query(query);
            return result.rows[0].count;

    } catch(err){
        console.error(err)
    }
}
async function getNumberOfOrders(){
    const query = `
        SELECT COUNT(*) FROM orders;
    `
    try{
            let result = await DB.query(query);
            return result.rows[0].count;

    } catch(err){
        console.error(err)
    }
}
async function getSingleUser(user){
    const query = `
        SELECT * FROM users
        WHERE email = $1;
    `
    try{
            let result = await DB.query(query,[user]);
            return result.rows;

    } catch(err){
        console.error(err)
    }
}
async function getSingleProduct(id){
    const query = `
        SELECT * FROM products
        WHERE id = $1
    `
    try{
            let result = await DB.query(query,[id]);
            return result.rows;

    } catch(err){
        console.error(err)
    }
}
async function createUser(first_name, last_name,email, password, address, phone){
    const guid = uuidv4();
    const query = `
        INSERT INTO users(id,first_name,last_name,password,phone,email,address)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
    `
    try{
            await DB.query(query,[guid,first_name,last_name,password,phone,email,address]);
            return true

    } catch(err){
        console.log(err)
        throw new dBInsertError('Unable to delete');
        
    }
}
async function deleteSingleProduct(itemId){
    const query = `
        DELETE FROM products 
        WHERE id = $1;
    `
    try{
            await DB.query(query,[itemId]);
            return true

    } catch(err){
        console.error(err)
    }
}


module.exports = {deleteSingleProduct, getSingleUser,getAllUsers,createUser,AddProduct,getAllProducts,getNumberOfClients,getNumberOfProducts,getNumberOfOrders, getSingleProduct}