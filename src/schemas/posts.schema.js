import {Schema, Types, model} from "mongoose";


const postsSchema = new Schema({
title : {
    type : String,
    index : true
},
files : [
    {
        type : Types.ObjectId,
        ref : 'Files'
    }
],
gif : {
    type : Types.ObjectId,
    ref : 'Gifs',
    default : null
},
likedUsers : [{
    type : Types.ObjectId,
    ref : 'Users'
}],
hashtag : [{type : String}],
}, {
    timestamps : true
})


export default  model('Posts', postsSchema)
