
const Client = require('pg').Client;
require('dotenv').config();

//createdb on postgres first
const DB = new Client({
    user : 'postgres',
    host: 'localhost',
    password: "",
    port: 5430,
    
})

async function checkIfDbExist(DB){
    const query = `
    SELECT datname
    FROM pg_database
    WHERE datname = $1
    `;

    let res = await DB.query(query,['skimpy']);
    if(res.rowCount < 1){
        console.log('Skimpy db does not exist, creating a new one')
        return false;
    } else{
        console.log('skimpy db started')
        return true;
    }
}
//create new db if it doesnt exists
async function createSkimpyDB(DB){
    try{

        await DB.query('CREATE DATABASE skimpy');

        console.log('db created')

    }catch(err){console.error(err)}
}


async function dropTable(){
    

    const alterQuery = `
    DROP TABLE IF EXISTS orders CASCADE;
  `;

  try {
    await DB.query(alterQuery);
    console.log('Table "courses" deleted');
  } catch (error) {
    console.error('Error:', error);
  }

}

//check if table exists, we are going to run this on all our tables

async function checkIfTableExists(table,DB){
    try{
        let query = `
        SELECT EXISTS(
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = $1
        );
        `
        let res = await DB.query(query,[table]);
        if(res.rows[0].exists){
            console.log(`Table: ${table} exists`)
            return true
        }
        console.log(`Table: ${table} does not exist, create one`)
        return false;
    }catch(err){
        console.error(err)
    }
}
async function createUserTable(DB){
    const query = `
        CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            password VARCHAR(255),
            phone VARCHAR(20),
            email VARCHAR(255),
            address VARCHAR(255),
            dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        );
    `;
    try{
        await DB.query(query);
        console.log('Table: users created');

    }catch(err){
        console.error(`Error:`, err)
    }
    

}

async function createProductTable(DB){
    const query = `
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY NOT NULL,
            product_name VARCHAR(255),
            price NUMERIC(10,2),
            img_sources VARCHAR(255)
        );
    `;
    try{
        await DB.query(query);
        console.log('Table: products created');

    }catch(err){
        console.error(`Error:`, err)
    }
    

}
//this table relates the user and their orders
async function createOrderTable(DB){
    //SERIAL is Auto-Increment int in postgres
     const query = `
        CREATE TABLE IF NOT EXISTS orders(
            id UUID PRIMARY KEY NOT NULL,
            user_id UUID,
        
            order_status VARCHAR(255),
            total_price NUMERIC(10,2),

            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `;
    try{
        await DB.query(query);
        console.log('Table: orders created');

    }catch(err){
        console.error(`Error:`, err)
    }
    
}

//The table that relates the order with the products

async function createOrderProductsTable(DB){
    const query = `
        CREATE TABLE IF NOT EXISTS order_products(
            id SERIAL PRIMARY KEY NOT NULL,
            order_id UUID,
            product_id INT,
            quantity INT,
            FOREIGN KEY(order_id) REFERENCES orders(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        );
    `;
    try{
        await DB.query(query);
        console.log('Table: order_products created');

    }catch(err){
        console.error(`Error:`, err)
    }
    
}


module.exports = {DB, checkIfDbExist,createSkimpyDB,checkIfTableExists,createUserTable,createOrderProductsTable,createOrderTable,createProductTable, dropTable};