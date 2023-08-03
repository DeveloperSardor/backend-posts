import {Schema, Types, model} from "mongoose";


const reactionsSchema = new Schema({
user : {
    type : Types.ObjectId,
    ref : 'Users'
},
post : {
    type : Types.ObjectId,
    ref : 'Posts'
},
reaction : {
    type : Types.ObjectId,
    ref : 'ReactionSmiles'
}
}, {
    timestamps : true
})


export default model('Reactions', reactionsSchema)
