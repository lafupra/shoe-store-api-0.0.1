import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../Models/UserModel.js"



// register user

export const AddUser = async (req,res) => {

    !req.body && res.status(200).json("no data sent")


    const hash = bcrypt.hashSync(req.body.password,10)
   
try{
    const user = new User({
        ...req.body,
        password:hash
    })

    const newuser = await user.save()


    res.status(200).json("user has been registered")

}catch(err){
    res.status(500).json(err)
}
  

}


// for user login


export const LoginUser = async (req,res) => {
    
    
   
try{


    const founduser = await User.findOne({email:req.body.email})



    if(!founduser) return res.status(404).send("user not found")

      const IsCorrect =   bcrypt.compareSync(req.body.password,founduser.password)
     
     if(!IsCorrect) return res.status(401).json("password or email is incorrect")



const {password,...others} = founduser._doc

var token = jwt.sign({ userId: founduser._id,role: founduser.role },process.env.JWT_SECRET, { expiresIn : '1d' });

    res.status(200).json({...others,token})

}catch(err){
    res.status(500).json(err)
}
  

}

