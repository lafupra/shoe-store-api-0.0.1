import express from "express"
import {verifytoken} from "../verifytoken.js"
import {AddOrder,GetAllPendingOrders,GetOrderById,UpdateOrder,DeleteOrder,SearchOrder} from "../Controllers/OrderController.js"


const router = express.Router()



//  router.post("/",verifytoken,GetQueryOrders)
 router.get("/",verifytoken,GetAllPendingOrders)
router.get("/:oid",verifytoken,GetOrderById)
router.put("/update/:oid",verifytoken,UpdateOrder)
 router.delete("/delete/:oid",verifytoken,DeleteOrder)
  router.post("/search",SearchOrder)
router.post("/add",verifytoken,AddOrder)





export default router