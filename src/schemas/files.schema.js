import {Schema, Types, model} from "mongoose";

const filesSchema = new Schema({
path_file : {
    type : String,
    required : true
},
type_file : {
type : String,
enum : ['audio', 'video','image']
},
// post : {
//     type : Types.ObjectId,
//     ref : 'Posts'
// }
}, {
    timestamps : true
})


export default model('Files', filesSchema)
