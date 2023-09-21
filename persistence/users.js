const { dBInsertError } = require("../custom_errors/customErrors");
const {createUser,getAllUsers, getSingleUser, getUserOrders, getAllOrderProducts, getAllOrders, getUserOrder} = require("../persistence/queries")
const bcrypt = require('bcrypt');
const { GenerateToken } = require("../services/TokenService");



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



const findUser = async(req,res,next) =>{
    const {email} = req.params;

    if(!email) return res.status(400).json({success: false , message: "Bad request"})
    

    try {
        const user = await getSingleUser(email);
        console.log(user)
        if(user.length > 0) return res.status(200).json({success: false, message: "Account already exists, sign in"})
        return res.status(200).json({success : true, message: "No user"})
    } catch (error) {
     
            console.log(`Server error: ${error}`)
            return res.status(500).json({success : false, message: "Unable to Register, try again later"})
    }
}

const registerAccount = async(req,res,next) =>{
    const {firstName, lastName, email,password, phone,address} = req.body;
    //validate input
    if(!firstName || !lastName || !email || !password || !phone || !address){
        console.log("Account validation error")
        return res.status(400).json({success: false, message: "Registration Error"})
    }
  

    try {
        const salt = await bcrypt.genSalt(10);//saltround
        const hashedPassword = await bcrypt.hash(password,salt);

        const create = await createUser(firstName,lastName,email,hashedPassword,address,phone);

        if(create){
            //create token and send back
            console.log(`New Account registeration : ${email}`)
          return  res.status(201).json({success : true})
        }
         console.log(`Server Error: Unable to create account, Investigated... line 134`)
          return  res.status(500).json({success : false})

        
    } catch (error) {
        console.log(`Server Error: ${error}`)
          return  res.status(500).json({success : false})
    }
}



const Authenticate = async(req,res,next) =>{
    const {email,password} = req.body;



    //validate email input true regex too
    if(!email || !password) return res.status(400).json({success: false , message: "Bad request: Check Email"})
    

    try {
        var user = await getSingleUser(email);

        user = user[0];

        //no need to check unavailable user, handled in the query.
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            //generate token here and send
            const token = GenerateToken(email)
            return res.status(200).json({success : true, token})

        }else{
            console.log(`${email}: Wrong password`)
            return res.status(404).json({success : false, message: "Invalid Email or Password"})
        }

    } catch (error) {
            console.log(`${email}: ${error}`)
            return res.status(404).json({success : false, message: "Invalid Email or Password"})
     
    }
}


const myOrders = async (req,res)=>{

    if(!req.user) return res.status(400).json({success : false , message : "Unauthorized"})
    //verify user
    let userId = req.user[0];

    try {
         var myOrders = await getUserOrders(userId.id);

        return res.status(200).json({success: true, message : myOrders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Server error"})
    }
   

}


const theOrders = async (req,res)=>{

    try {
         var myOrders = await getUserOrder();

        return res.status(200).json({success: true, message : myOrders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Server error"})
    }
   

}



const AllOrders = async (req,res)=>{


    try {
         var myOrders = await getAllOrders();

        return res.status(200).json({success: true, message : myOrders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Server error"})
    }
   

}

const myOrderProducts = async (req,res)=>{
    let orderId = req.params.id;

    console.log(req.params);


    if(!req.user) return res.status(400).json({success : false , message : "Unauthorized"})
    //verify user

    try {
         var myOrders = await getAllOrderProducts(orderId);

        return res.status(200).json({success: true, message : myOrders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Server error"})
    }
   

}



module.exports = { theOrders, AllOrders, myOrderProducts, myOrders,  getAllClients, findUser, registerAccount, Authenticate}