const { dBInsertError } = require("../custom_errors/customErrors");
const { getAllProducts, getSingleProduct, deleteSingleProduct } = require("./queries");

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

const addItem = async(req,res,next)=>{
    const item = req.body;

    if(!item.name || !item.price || !item.unit || !item.img) return res.status(400).json({success : false, message : "Invalid Input"})
    items.push(item);
    return res.status(201).json(items);

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

module.exports = {getAllItems,getSingleItem,addItem,editItem,deleteItem}