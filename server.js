import express from "express"
import {Connect} from "./MongooseConnect.js"
import UserRoute from "./Routes/UserRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import OrderRoute from "./Routes/OrderRoute.js"
import cors from "cors"
import dotenv from "dotenv"


const app = express()







dotenv.config()
app.use(cors())
app.use(express.json())
Connect() 


app.use("/api/user",UserRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/order",OrderRoute)





app.get("/",(req,res) => {
    res.send("its working")


})



app.listen(process.env.PORT,() => {  
  
  console.log("server working")})