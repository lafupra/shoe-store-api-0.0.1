import express from "express"
import {verifytoken} from "../verifytoken.js"
import {AddProduct,GetAllProducts,GetProductById,UpdateProduct,DeleteProduct,SearchProduct,GetQueryProducts} from "../Controllers/ProductController.js"


const router = express.Router()



 router.post("/",GetQueryProducts)
 router.get("/",GetAllProducts)
router.get("/:pid",GetProductById)
router.put("/update/:pid",verifytoken,UpdateProduct)
 router.delete("/delete/:pid",verifytoken,DeleteProduct)
  router.post("/search",SearchProduct)
router.post("/add",verifytoken,AddProduct)





export default router