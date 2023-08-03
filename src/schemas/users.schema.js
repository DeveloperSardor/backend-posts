import {Schema, Types, model} from "mongoose";
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
name : {
    type : String
},
username : {
    type : String,
    required : [true, 'Username majburiy!'],
    unique : [true, 'Bu username allaqchon band!']
},
password : {
    type : String,
    required : [true, 'Parol majburiy!']
},
isAdmin : {
    type : Boolean,
    default : false
},
email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'Bu email allaqachon band!'],
    required: 'Email majburiy',
    validate: [validateEmail, `Iltimos to'g'ri email kiriting!`],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Iltimos to'g'ri email kiriting!`]
},
gender : {
type : String,
enum : ['erkak', 'ayol']
},
avatar : {
    type : String
},
bio : {
    type : String,
    default : `Bio mavjud emas hali! 😐`
},
online : {
    type : Boolean,
    default : false
},
likedPost : [{
    type : Types.ObjectId,
    ref : 'Posts'
}]
}, {
    timestamps : true
})


export default  model('Users', userSchema)
