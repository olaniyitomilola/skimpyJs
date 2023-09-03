const { dBInsertError } = require("../custom_errors/customErrors");
const { getAllProducts, getSingleProduct, deleteSingleProduct, createOrder, createOrderProducts } = require("./queries");
const {v4: uuidv4} = require('uuid');



const getAllItems = async(req,res,next)=>{
    let response;

    try{
        let items = await getAllProducts();
        if(!items) return res.status(404).json({success : false, message : "Not Found"});
        response =  res.status(200).json(items)
    }catch(err){
        if(res instanceof dBInsertError){
            console.error(err.message)
            response = res.status(501).json({success : false, message: "Server error"})
        }else{
            response = res.status(501).json({success : false, message: "Server error"})
            console.error(err)
        }
    }finally{
        return response;
    }
    
    

}

const getSingleItem = async(req,res,next)=>{
  

}

const processPayment = async(req,res)=>{


    if(!req.user) return res.status(400).json({success : false , message : "Unauthorized"})
    //verify user
    const item = req.body;
    let totalPrice = 0.00;
    totalPrice = item.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.price), totalPrice);
    let orderId = uuidv4()

    let userId = req.user[0]

   
    var createNewOrder = await createOrder(orderId, userId.id,'Processing',totalPrice);

    if(createNewOrder){

        try {
                item.forEach((item)=>{
                createOrderProducts(orderId, item.id, 1)
                })
                return res.status(201).json({success : true , message : "Order completed successfully"})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false , message : "Server error"})

        }
        

    }

    console.log(totalPrice, orderId)



}


const editItem = async(req,res,next)=>{

}
const deleteItem = async(req,res,next)=>{
         let id = req.params.id;
         id = parseInt(id);
         let response;

         //get product before deleting

         try{
            let product = await getSingleProduct(id);
            if(!product){
                response = res.status(404).json({success: false , message: "Not found"})
            }else{
                try {
                    product = await deleteSingleProduct(id);
                    if(product){
                        response = res.status(201).json({success : true, message: "Product deleted"})
                    }else{
                        response = res.status(501).json({success : false, message: "Server Error"})

                    }                    
                } catch (error) {
                    response = res.status(501).json({success : false, message: "Server Error"})             
            }

         }
         
        }catch(error){
                response = res.status(501).json({success : false, message: "Server Error"})

        }finally{
            return response;
        }
   

}

module.exports = {getAllItems,getSingleItem,processPayment,editItem,deleteItem}