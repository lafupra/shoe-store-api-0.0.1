import mongoose from  "mongoose"

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  upiRefNo: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
     default:false
  },
  deliveryStatus: {
    type: Boolean,
    default:false,
  },
  products: {
    type: [],
    required: true,
    default:false,
  },
  total: {
    type: Number,
    required: true,
  },
  razorpay_order_id:{
      type: String,
      required: false,
    },
    razorpay_payment_id:{
      type: String,
      required: false,
    },
    razorpay_signature:{
      type: String,
      required: false,
    }
  

},
{ 
  timestamps: true
 });

const Order = mongoose.model('Order', orderSchema);

export default Order;