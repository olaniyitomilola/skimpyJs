const { dBInsertError } = require("../custom_errors/customErrors");
const {createUser,getAllUsers} = require("../persistence/queries")



const getAllClients = async(req,res,next)=>{
    let response;

    try{
        let items = await getAllUsers();
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

const getSingleUser = async(req,res,next)=>{
    let id = req.params.id;
    if(!items[parseInt(id)]) return res.status(404).json({success: false, message : `Item with id: ${id} does not exist`})

    return res.status(200).json([items[parseInt(id)]])

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
    try{
         let id = req.params.id;
        items[parseInt(id)] = null;
        return  res.status(201).json({message: "Item has been deleted",items})
    }catch(error){
        console.error(error)
    }
   

}

module.exports = {getAllClients}