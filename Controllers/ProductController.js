import Product from "../Models/ProductModel.js"



export const GetQueryProducts = async (req,res) => {
    const skipvalue = req.query.page * req.query.limit || 0
    const limitvalue = req.query.limit || 5

    //  if query is in category
      
      if(req.query.category && req.query.color){

        // if category and color both are in query


const cat = req.query.category.split(",")
const color = req.query.color.split(",")



try{

     


    const foundproduct = await Product.find({category:{$in:cat},color:{$in:color}}).skip(skipvalue).limit(limitvalue)
 

   if(!foundproduct) return res.status(404).json("product not found")

   res.status(200).json(foundproduct)



}catch(err){
   res.status(500).json(err)
}



       
       

      }else if(req.query.category){
      

        console.log(req.query.category)


        const cat = req.query.category.split(",")

        
    try{

     


        const foundproduct = await Product.find({category:{$in:cat}}).skip(skipvalue).limit(limitvalue)
        console.log(foundproduct)

       if(!foundproduct) return res.status(404).json("product not found")

       res.status(200).json(foundproduct)



   }catch(err){
       res.status(500).json(err)
   }


      }else {
        // if only color is in query
        const color = req.query.color.split(",")

        try{

     


            const foundproduct = await Product.find({color:{$in:color}}).skip(skipvalue).limit(limitvalue)
        
           if(!foundproduct) return res.status(404).json("product not found")
        
           res.status(200).json(foundproduct)
        
        
        
        }catch(err){
           res.status(500).json(err)
        }
        
    }

       



  
}




export const GetAllProducts = async (req,res) => {

    const skipvalue = req.query.page * req.query.limit || 0
    const limit = req.query.limit || 10
    const gte = req.query.gte || 0
    const lte = req.query.lte || 10000
 
    const price = {price : {$gte:gte,$lte:lte}}


      try{

     


        const foundproduct = await Product.find(price).skip(skipvalue).limit(limit)

       if(!foundproduct) return res.status(404).json("product not found")

       res.status(200).json(foundproduct)



   }catch(err){
       res.status(500).json(err)
   }

  }



// add product


export const AddProduct = async (req,res) => {

    if(req.role !== "admin") return res.status(401).json("unauthorised user")
  
    const product = new Product(req.body)
    

  try{


      const savedproduct = await product.save()

      if(!savedproduct) return res.status(404).json("product not saved")

      res.status(200).json(savedproduct)



  }catch(err){
      res.status(500).json(err)
  }
}



// update product

export const UpdateProduct = async (req,res) => {
  

    if(req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const updatedproduct = await Product.findByIdAndUpdate(req.params.pid,req.body)

        if(!updatedproduct) return res.status(404).json("product not found")

        res.status(200).json("product has been updated")


    }catch(err){
        res.status(500).json(err)
    }
}


// delete product

export const DeleteProduct = async (req,res) => {
  

    if(req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const deletedproduct = await Product.findByIdAndDelete(req.params.pid)

        if(!deletedproduct) return res.status(404).json("product not found")

        res.status(200).json("product has been deleted")


    }catch(err){
        res.status(500).json(err)
    }
}


// get product by id

export const GetProductById = async (req,res) => {
  

 

    try{

        const getproduct = await Product.findById(req.params.pid)

        if(!getproduct) return res.status(404).json("product not found")

        res.status(200).json(getproduct)


    }catch(err){
        res.status(500).json(err)
    }
}


// search product

export const SearchProduct = async (req,res) => {
const skipvalue = req.query.page * req.query.limit || 0
const limitvalue = req.query.limit || 5
  
if(!req.query.q) return res.status(500).json("search query empty")
 

    try{

        const searchproduct = await Product.find({ name: { $regex: req.query.q, $options: 'i' }}).skip(skipvalue).limit(limitvalue)

        if(!searchproduct) return res.status(404).json("product not found")

        res.status(200).json(searchproduct)


    }catch(err){
        res.status(500).json(err)
    }
}