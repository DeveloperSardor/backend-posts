import ReactionsSmiles from '../schemas/reactions-smiles.js'


export class ReactionSmileContr{
    constructor(){}
    static async Get(req, res){
      try {
        const FindReactionSmiles = await ReactionsSmiles.find({turnOn : true});
        res.send({
            status : 200,
            message : `Barcha Reaksiyalar`,
            success : true,
            data : FindReactionSmiles
        })
      } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
      }
    }
    static async Post(req, res){
        try {
            const {reaction} = req.body;
            if(!reaction){
                throw new Error(`Reaksiya jo'nating`)
            }
            const newReactionSmile = await ReactionsSmiles.create({reaction})
            res.send({
                status : 201,
                message : `Reaksiya muvofaqqiyatli qo'shildi`,
                success : true,
                data : newReactionSmile
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }
    static async Put(req, res){
        try {
            const {id} = req.params;
            if(!id){
                throw new Error(`Paramsdan id jonating!`)
            }
            const {reaction} = req.body;
            if(!reaction){
                throw new Error(`Reaksiya jo'nating!`)
            }
            const find = await ReactionsSmiles.findById(id);
            if(find == null){
                throw new Error(`Reaksiya topilmadi!`)
            }
            const updatedSmile = await ReactionsSmiles.findByIdAndUpdate(id, {reaction}, {new : true})
            res.send({
                status : 200,
                message : `Reaksiya muvofaqqiyatli o'zgartirildi`,
                success : true,
                data : updatedSmile
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }
    static async Delete(req, res){
        try {
            const {id} = req.params;
            if(!id){
                throw new Error(`Paramsdan id jonating!`)
            }
            const find = await ReactionsSmiles.findById(id);
            if(find == null){
                throw new Error(`Reaksiya topilmadi!`)
            }
            const deleted = await ReactionsSmiles.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : `Reaksiya muvofaqqiyatli o'chirildi`,
                success : true,
                data : deleted
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