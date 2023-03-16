import express from "express"
import UserRoute from "./Routes/UserRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import OrderRoute from "./Routes/OrderRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"


const app = express()









dotenv.config()
app.use(cors())
app.use(express.json())



app.get("/",(req,res) => {
  res.send("it's working")
})





app.use("/api/user",UserRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/order",OrderRoute)




mongoose.connect(process.env.MONGO_URI, function(error) {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Database connection successful');
    app.listen(process.env.PORT, function() {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  }
});




