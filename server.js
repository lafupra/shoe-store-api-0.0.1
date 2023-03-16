import express from "express"
import UserRoute from "./Routes/UserRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import OrderRoute from "./Routes/OrderRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"


const app = express()


const Connect = async () =>  {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
     
    });
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to database:', err);
  }
}






dotenv.config()
app.use(cors())
app.use(express.json())

Connect()

app.get("/",(req,res) => {
  res.send("it's working")
})

app.use("/api/user",UserRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/order",OrderRoute)




app.listen(process.env.PORT,() => {  
  
  console.log("server working")})




