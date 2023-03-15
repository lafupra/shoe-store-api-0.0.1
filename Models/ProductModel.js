import mongoose from  "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['men', 'women', 'kids'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  thumbnailimageUrl: {
    type: String,
    required: true,
  },
},
{ 
  timestamps: true
 });

const Product = mongoose.model('Product', productSchema);

export default Product;