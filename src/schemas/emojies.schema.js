import {Schema, Types, model} from "mongoose";


const emojiesSchema = new Schema({
emoji : {
    type : String
}
}, {
    timestamps : true
})


export default model('Emojies', emojiesSchema)
