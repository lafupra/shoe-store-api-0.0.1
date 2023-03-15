import express from "express"
import { verifytoken } from "../verifytoken.js"
import {UpdateUser,DeleteUser,GetUsers,GetUserById} from "../Controllers/UserController.js"


const router = express.Router()



 router.get("/",verifytoken,GetUsers)
router.get("/:id",verifytoken,GetUserById)
router.put("/update/:id",verifytoken,UpdateUser)
router.delete("/delete/:id",verifytoken,DeleteUser)



export default router






