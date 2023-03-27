import express from "express"
import UserRoute from "./Routes/UserRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import OrderRoute from "./Routes/OrderRoute.js"
import PaymentRouter from "./Routes/PaymentRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"





dotenv.config()






const app = express()









app.use(cors())
app.use(express.json())




app.get("/",(req,res) => {
  res.send("it's working")
})





 


  




app.use("/api/user",UserRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/order",OrderRoute)
app.use("/api",PaymentRouter)





    app.listen(process.env.PORT,  () => {
      mongoose.set('strictQuery', false)
      mongoose.connect("mongodb+srv://praful:praful26297@cluster0.avjl5.mongodb.net/shoe-selling-site?retryWrites=true&w=majority", (error) => {
        if (error) {
          console.error('Error connecting to database:', error);
          mongoose.connect(process.env.MONGO_URI)
        }else{
          console.log('Database connection successful');}
        }
        )


      console.log(`Server started on port ${process.env.PORT}`);
    });





