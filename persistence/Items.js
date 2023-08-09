



let items = [
        {name: "Amala", price: 5, unit: "Scoop", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Amala.jpg/1024px-Amala.jpg"}
        ,{name: "White Rice", price: 2.80, unit: "Spoon", img: "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-superJumbo.jpg"}
        ,{name: "Nigerian Jollof Rice", price: 3, unit: "Spoon", img: "https://i.etsystatic.com/43736205/r/il/7a1cd7/5083482431/il_794xN.5083482431_aj9p.jpg"}
        ,{name: "Stirred Fried Rice", price: 3.5, unit: "Spoon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6F4LyczKxY_dkTpu6byAPDuxJqPHrWq4Zw&usqp=CAU"}
        ,{name: "Another Rice", price: 3.5, unit: "Spoon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6F4LyczKxY_dkTpu6byAPDuxJqPHrWq4Zw&usqp=CAU"}
        ,{name: "Another Rice", price: 3.5, unit: "Spoon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6F4LyczKxY_dkTpu6byAPDuxJqPHrWq4Zw&usqp=CAU"}
        ,null




    ]

const getAllItems = async(req,res,next)=>{
    if(!items) return res.status(404).json({success : false, message : "Not Found"});
    //testing os
   
   

    return res.status(200).json(items)

}

const getSingleItem = async(req,res,next)=>{
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
    let id = req.params.id;
    items[parseInt(id)] = null;
    return  res.status(201).json({message: "Item has been deleted",items})

}

module.exports = {getAllItems,getSingleItem,addItem,editItem,deleteItem}