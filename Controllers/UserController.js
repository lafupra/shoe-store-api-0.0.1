import User from "../Models/UserModel.js"

// update user
export const UpdateUser = async (req,res) => {
  

    if(req.userId !== req.params.id) return res.status(401).json("unauthorised user")

    try{

        const updateduser = await User.findByIdAndUpdate(req.userId,req.body)

        if(!updateduser) return res.status(404).json("user not found")

        res.status(200).json("user has been updated")


    }catch(err){
        res.status(500).json(err)
    }
}


// delete user

export const DeleteUser = async (req,res) => {
  

    if(req.userId !== req.params.id  && req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const deleteduser = await User.findByIdAndDelete(req.userId)

        if(!deleteduser) return res.status(404).json("user not found")

        res.status(200).json("user has been deleted")


    }catch(err){
        res.status(500).json(err)
    }
}


// get user by id


export const GetUserById = async (req,res) => {
  
  
    if(req.role !== "admin" ) return res.status(401).json("unauthorised user")

    try{

        const users = await User.findById(req.userId)

        if(!users) return res.status(404).json("user not found")

        res.status(200).json(users)


    }catch(err){
        res.status(500).json(err)
    }
}


// get all users


export const GetUsers = async (req,res) => {
         const skipvalue = req.query.page * req.query.limit || 0
         const limitvalue = req.query.limit || 5
    
    if(req.role !== "admin") return res.status(401).json("unauthorised user")

    try{

        const users = await User.find().skip(skipvalue).limit(limitvalue)

        if(!users) return res.status(404).json("user not found")

        res.status(200).json(users)


    }catch(err){
        res.status(500).json(err)
    }
}
      