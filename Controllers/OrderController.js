import Order from "../Models/OrderModel.js"



// export const GetQueryProducts = async (req,res) => {
//     const skipvalue = req.query.page * req.query.limit || 0
//     const limitvalue = req.query.limit || 5

//     //  if query is in category
      
//       if(req.query.category && req.query.color){

//         // if category and color both are in query


// const cat = req.query.category.split(",")
// const color = req.query.color.split(",")



// try{

     


//     const foundproduct = await Order.find({category:{$in:cat},color:{$in:color}}).skip(skipvalue).limit(limitvalue)
 

//    if(!foundproduct) return res.status(404).json("product not found")

//    res.status(200).json(foundproduct)



// }catch(err){
//    res.status(500).json(err)
// }



       
       

//       }else if(req.query.category){
      

//         console.log(req.query.category)


//         const cat = req.query.category.split(",")

        
//     try{

     


//         const foundproduct = await Product.find({category:{$in:cat}}).skip(skipvalue).limit(limitvalue)
//         console.log(foundproduct)

//        if(!foundproduct) return res.status(404).json("product not found")

//        res.status(200).json(foundproduct)



//    }catch(err){
//        res.status(500).json(err)
//    }


//       }else {
//         // if only color is in query
//         const color = req.query.color.split(",")

//         try{

     


//             const foundproduct = await Product.find({color:{$in:color}}).skip(skipvalue).limit(limitvalue)
        
//            if(!foundproduct) return res.status(404).json("product not found")
        
//            res.status(200).json(foundproduct)
        
        
        
//         }catch(err){
//            res.status(500).json(err)
//         }
        
//     }

       



  
// }




export const GetAllPendingOrders = async (req,res) => {

    const skipvalue = req.query.page * req.query.limit || 0
    const limit = req.query.limit || 10

 
    


      try{

     


        const foundorder = await Order.find({paymentStatus:false}).skip(skipvalue).limit(limit)

       if(!foundorder) return res.status(404).json("order not found")

       res.status(200).json(foundorder)



   }catch(err){
       res.status(500).json(err)
   }

  }



// add product


export const AddOrder = async (req,res) => {

    if(req.role !== "admin" && req.role !== "user") return res.status(401).json("unauthorised user")
  
    const order = new Order(req.body)
    

  try{


      const savedorder = await order.save()

      if(!savedorder) return res.status(404).json("order not saved")

      res.status(200).json(savedorder)



  }catch(err){
      res.status(500).json(err)
  }
}



// update product

export const UpdateOrder = async (req,res) => {
  

    if(req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const updatedOrder = await Order.findByIdAndUpdate(req.params.oid,req.body)

        if(!updatedOrder) return res.status(404).json("Order not found")

        res.status(200).json("Order has been updated")


    }catch(err){
        res.status(500).json(err)
    }
}


// delete product

export const DeleteOrder = async (req,res) => {
  

    if(req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const deletedorder = await Order.findByIdAndDelete(req.params.oid)

        if(!deletedorder) return res.status(404).json("order not found")

        res.status(200).json("order has been deleted")


    }catch(err){
        res.status(500).json(err)
    }
}


// get product by id

export const GetOrderById = async (req,res) => {
  

 

    try{

        const getorder = await Order.findById(req.params.oid)

        if(!getorder) return res.status(404).json("order not found")

        res.status(200).json(getorder)


    }catch(err){
        res.status(500).json(err)
    }
}


// search product

export const SearchOrder = async (req,res) => {
const skipvalue = req.query.page * req.query.limit || 0
const limitvalue = req.query.limit || 5
  
if(!req.query.q) return res.status(500).json("Order query empty")
 

    try{

        const searchorder = await Order.find({ name: { $regex: req.query.q, $options: 'i' }}).skip(skipvalue).limit(limitvalue)

        if(!searchorder) return res.status(404).json("order not found")

        res.status(200).json(searchorder)


    }catch(err){
        res.status(500).json(err)
    }
}