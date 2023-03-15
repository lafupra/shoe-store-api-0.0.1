import jwt from "jsonwebtoken"



export const verifytoken = async (req,res,next) => {

    const token = req.headers.token

    jwt.verify(token,process.env.JWT_SECRET,(err,result) => {
       
        if(result){
            req.userId = result.userId
            req.role = result.role
            next()
        }else if(err){
             res.status(401).json('token is invalid')
        }
    })

}