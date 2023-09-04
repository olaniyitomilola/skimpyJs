const { dBInsertError } = require("../custom_errors/customErrors");
const { getAllProducts, getSingleProduct, deleteSingleProduct, createOrder, createOrderProducts, getAllSales, getThisMonthSales, getPreviousMonthSales, getTopSellingProductByQuantity, getTopBuyers } = require("./queries");
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

const getSalesInfo = async(req,res) =>{
    try{
        let allSales = await getAllSales();
        let thisMonth = await getThisMonthSales();

        let prevMonth = await getPreviousMonthSales();

        return res.status(200).json({
            success: true,
            message: {
                total : allSales[0].total_price_sum,
                current: thisMonth[0].present_month_total_price_sum,
                previous: prevMonth[0].previous_month_total_price_sum
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({success : false , message: 'Server Error'})
    }
}


const getTopSellingItem = async(req,res) =>{
    try{
        let byQuantity = await getTopSellingProductByQuantity();

        //top buyer

        let topBuyer = await getTopBuyers()

        //byPrice
       // let thisMonth = await getThisMonthSales();

        console.log(byQuantity)
        return res.status(200).json({
            success: true,
            message: {
                byQuantity,
                topBuyer
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({success : false , message: 'Server Error'})
    }
}

module.exports = { getTopSellingItem, getSalesInfo, getAllItems,processPayment,editItem,deleteItem}