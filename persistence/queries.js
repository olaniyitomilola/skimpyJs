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


async function getMonthRegistration(){
    const query = `
        SELECT COUNT(*) FROM users
          WHERE EXTRACT(MONTH FROM dateCreated) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM dateCreated) = EXTRACT(YEAR FROM CURRENT_DATE);
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



async function createOrder(guid, user_id, order_status, total_price){
    const query = `
        INSERT INTO orders(id,user_id,order_status,total_price)
        VALUES ($1,$2,$3,$4)
    `
    try{
            await DB.query(query,[guid, user_id , order_status, total_price]);
            return true

    } catch(err){
        console.log(err)
        throw new dBInsertError('Unable to delete');
        
    }
}


async function createOrderProducts(order_id, product_id,quantity){
    const query = `
        INSERT INTO order_products(order_id,product_id , quantity)
        VALUES ($1,$2,$3)
    `
    try{
            await DB.query(query,[order_id, product_id, quantity]);
            return true

    } catch(err){
        console.log(err)
        throw new dBInsertError('Unable to add product');
        
    }
}

async function getAllOrders(){
    const query = `
       SELECT ord.*, usr.first_name, usr.last_name, usr.address
        FROM orders ord
        JOIN users usr
        ON ord.user_id = usr.id;

    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError(err)
    }
}


async function getUserOrders(user_id){
    const query = `
        SELECT * FROM orders
        WHERE user_id = $1;
    `
    try{
            let result = await DB.query(query,[user_id]);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch orders')
    }
}


async function getUserOrder(){
    const query = `
        SELECT
    u.id AS user_id,
    u.first_name,
    u.last_name,
    u.address,
    COUNT(o.id) AS order_count
    FROM  users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.first_name, u.last_name, u.address
    ORDER BY order_count DESC
    ;

    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch orders')
    }
}

async function getAllOrderProducts(order_id){
    const query = `
        SELECT p.product_name, p.img_sources, p.price
        FROM order_products op
        JOIN products p ON op.product_id = p.id
        WHERE order_id = $1;
    `;
    try{
            let result = await DB.query(query,[order_id]);
            return result.rows;

    } catch(err){
        console.log(err)
        throw new dBInsertError('unable to fetch order products')
    }
}


///BUSINESS INTELLIGENCE QUERIES
/// 
async function getAllSales(){
    const query = `
        SELECT SUM(total_price) AS total_price_sum
        FROM orders;

    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch sales')
    }
}

async function getThisMonthSales(){
    const query = `
        SELECT SUM(total_price) AS present_month_total_price_sum
        FROM orders
        WHERE EXTRACT(MONTH FROM order_date) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE);
    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch sales')
    }
}

async function getPreviousMonthSales(){
    const query = `
       SELECT SUM(total_price) AS previous_month_total_price_sum
        FROM orders
        WHERE EXTRACT(MONTH FROM order_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
        AND EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month');

    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch sales')
    }
}



async function getTopSellingProductByQuantity(){
    const query = `
       SELECT p.product_name, top_selling.total_quantity
        FROM (
            SELECT product_id, SUM(quantity) AS total_quantity
            FROM order_products
            GROUP BY product_id
            ORDER BY total_quantity DESC
            LIMIT 3
        ) top_selling
        JOIN products p ON top_selling.product_id = p.id
        ORDER BY total_quantity DESC;



    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch sales' + err)
    }
}


async function getTopBuyers(){
    const query = `
       SELECT u.first_name, u.last_name, SUM(top_users.total_price) AS total_spent
        FROM (
            SELECT user_id, SUM(total_price) AS total_price
            FROM orders
            GROUP BY user_id
            ORDER BY total_price DESC
            
        ) top_users
        JOIN users u ON top_users.user_id = u.id
        GROUP BY u.first_name, u.last_name
        ORDER BY total_spent DESC
        LIMIT 3;
    `
    try{
            let result = await DB.query(query);
            return result.rows;

    } catch(err){
        throw new dBInsertError('unable to fetch sales' + err)
    }
}




module.exports = { getUserOrder, getMonthRegistration, getTopBuyers, getTopSellingProductByQuantity, getPreviousMonthSales, getThisMonthSales, getAllSales, deleteSingleProduct, getSingleUser,getAllUsers,createUser,AddProduct,getAllProducts,getNumberOfClients,getNumberOfProducts,getNumberOfOrders, getSingleProduct , createOrder, createOrderProducts, getAllOrders, getAllOrderProducts, getUserOrders}