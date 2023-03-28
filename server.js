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
app.use(express.urlencoded({ extended: false }));



app.get("/",(req,res) => {
  res.send("it's working")
})





 


  




app.use("/api/user",UserRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/order",OrderRoute)
app.use("/api",PaymentRouter)





    app.listen(process.env.PORT,  () => {

      console.log(process.env.MONGO_URI)
      mongoose.set('strictQuery', false)
      mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, (error) => {
        if (error) {
          console.error('Error connecting to database:', error);
        }else{
          console.log('Database connection successful');}
        }
        )


      console.log(`Server started on port ${process.env.PORT}`);
    });





