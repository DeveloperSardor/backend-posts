import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export class JWT {
constructor(){};
static SIGN(payload){
    return jwt.sign({user_id : payload}, jwt_secret)
}
static VERIFY(token){
    return jwt.verify(token, jwt_secret)
}
}