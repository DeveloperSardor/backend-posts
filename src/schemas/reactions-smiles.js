import {Schema, Types, model} from "mongoose";


const reactionSmilesSchema = new Schema({
reaction : {
    type : String
},
turnOn : {
    type : Boolean,
    default : true
}
}, {
    timestamps : true
})


export default model('ReactionSmiles', reactionSmilesSchema)
