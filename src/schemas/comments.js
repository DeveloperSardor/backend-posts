import {Schema, Types, model} from "mongoose";


const commentsSchema = new Schema({
title : {
    type : String
},
content_link :{
    type : String
},
content_type : {
    type : String,
    enum : ['video', 'image', 'gif', 'audio']
},
emoji : {
type : Types.ObjectId,
ref : 'Emojies',
default : null
},
user : {
type : Types.ObjectId,
ref : 'Users'
},
gif : {
    type : Types.ObjectId,
    ref : 'Gifs',
    default : null
},
post : {
    type : Types.ObjectId,
    ref : 'Posts'
}
}, {
    timestamps : true
})


export default  model('Comments',commentsSchema)
