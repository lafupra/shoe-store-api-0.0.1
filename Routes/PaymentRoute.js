import express from "express"
import crypto from "crypto"
import Razorpay from "razorpay"
import Order from "../Models/OrderModel.js"


const router = express.Router()

const instance = new Razorpay({
    key_id:"rzp_test_OGZVnuLfuiNS98",
    key_secret:"0erdZN3fGpJI3bSl22zrxGlL",

})

router.post("/checkout",async (req,res) => {





    let options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
      };

     const order = await  instance.orders.create(options);
      res.status(200).json(order)
     
})


router.post("/verification/:oid", async (req,res) => {

   

   const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body
    try{
        let body= razorpay_order_id + "|" + razorpay_payment_id;

   
        const  expectedSignature = crypto.createHmac('sha256', '0erdZN3fGpJI3bSl22zrxGlL')
                                        .update(body.toString())
                                        .digest('hex');
                                        // console.log("sig received " ,razorpay_signature);
                                        // console.log("sig generated " ,expectedSignature);
       
        if(expectedSignature === razorpay_signature){
            
            const oid = req.params.oid
             

            
        try{
            const updatedorder = await Order.findByIdAndUpdate(oid,{paymentStatus:true,razorpay_order_id:razorpay_order_id,razorpay_payment_id:razorpay_payment_id,razorpay_signature:razorpay_signature},{new:true})
        
             
              if(!updatedorder) return res.status(404).json("order not saved")
        
               res.status(200).redirect("https://heroic-starburst-d59ecb.netlify.app/paymentsuccess")

            // res.status(200).json(updatedorder)
              
            
        }catch(err){
            res.status(500).redirect("https://heroic-starburst-d59ecb.netlify.app/paymentfailure")
            // console.log(err)
            // res.status(500).send(err)
        }
              
        
        
        
      
        }else{
            res.status(500).redirect("https://heroic-starburst-d59ecb.netlify.app/paymentfailure")
            // res.status(500).send("not same")
        }
         
    

    

       
        
    }catch(err){
        // console.log(err)
        // res.status(500).json(err)
        res.status(500).redirect("https://heroic-starburst-d59ecb.netlify.app/paymentfailer")
    }

})




export default router