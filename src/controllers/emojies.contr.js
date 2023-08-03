import Emojies from '../schemas/emojies.schema.js'



export class EmojiesContr{
    constructor(){}
    static async GetEmoji(req, res){
        try {
            res.send({
                status :200,
                message : `Barcha emojilar`,
                success : true,
                data :await Emojies.find()
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

  static async AddEmoji(req, res){
    try {
        const {emoji} = req.body;
        if(!emoji){
            throw new Error(`Emoji majburiy!`)
        }
        const newEmoji = await Emojies.create({emoji})
        res.send({
            status : 201,
            message : `Emoji muvofaqqiyatli qo'shildi`,
            success : true,
            data : newEmoji
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }

  static async deleteEmoji (req, res){
    try {
        const {id} = req.params;
        if(!id){
            throw new Error(`Paramsdan id jo'nating`)
        }
        const check = await Emojies.findById(id);
        if(check == null){
            throw new Error(`Emoji topilmadi!`)
        }
        const deletedEmoji = await Emojies.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Emoji muvofaqqiyatli o'chirildi`,
            success : true,
            data : deletedEmoji
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        }) 
    }
  }
}