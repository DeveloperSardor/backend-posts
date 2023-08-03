import { JWT } from "../utils/jwt.js";
import Users from '../schemas/users.schema.js'

export const checkAdmin = async (req, res, next)=>{
try {
    const {token} = req.headers;
    if(!token){
        throw new Error(`Token yuborishingiz kerak!`)
    }
    const {user_id} =  JWT.VERIFY(token)
    const findUser = await Users.findById(user_id);
    if(findUser == null){
        throw new Error(`Foydalanuvchi topilmadi!`)
    }
   else if(findUser.isAdmin == false){
        throw new Error(`Siz admin emassiz!`)
    }
    else{
        next()
    }
} catch (error) {
    res.send({
        status : 400,
        message : error.message,
        success : false
    })
}
}