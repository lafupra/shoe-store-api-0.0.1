import express from "express"
import {AddUser,LoginUser} from "../Controllers/AuthController.js"


const router = express.Router()



// for registering user


router.post("/register",AddUser)
router.post("/login",LoginUser)





export default router