const {DB,checkIfDbExist, createSkimpyDB,checkIfTableExists,createUserTable, createProductTable, createOrderTable, createOrderProductsTable} = require('./persistence/connect');


async function start(){
    try{
        await DB.connect();
        //check skimpy db
        let res = await checkIfDbExist(DB);
        


        if(!res){
            await createSkimpyDB(DB);
            //create the tables too
            //create user table
            await createUserTable(DB);
        }else{

            //db exists, check tables
            //check users table
            let userCheck = await checkIfTableExists('users',DB)
            //if User table does not exist, create one
            if(!userCheck){
                await createUserTable(DB);
            }
            //check products table
            let productsCheck = await checkIfTableExists('products', DB)

            if(!productsCheck){
                await createProductTable(DB)
                //create product table
            }
            //check orders table

            let ordersCheck = await checkIfTableExists('orders',DB)

            if(!ordersCheck){
                await createOrderTable(DB);
            }
            let orderProductsCheck = await checkIfTableExists('order_products',DB);
            if(!orderProductsCheck){
                await createOrderProductsTable(DB)
            }

        }
       
        return true;

    }catch(error){
        console.error(error)
        return false;
    }
}

module.exports = start;