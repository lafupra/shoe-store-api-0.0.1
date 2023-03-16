import mongoose from "mongoose"

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
  

