import {Schema, Types, model} from "mongoose";


const gifsSchema = new Schema({
video_link : {
    type : String
}
}, {
    timestamps : true
})


export default model('Gifs', gifsSchema)
