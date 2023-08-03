import Reaction from '../schemas/reaction.schema.js'
import { JWT } from '../utils/jwt.js';


export class ReactionToPost {
    constructor(){}
    static async GetReactionToPost(req, res){
        try {
            const {post_id} = req.params;
            const datasReaction= await Reaction.find({post : post_id}).populate('user').populate('reaction');
            res.send({
                status : 200,
                message : `Reaksiya post uchun`,
                success : true,
                data : datasReaction
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }
    static async addReactionToPost(req, res){
        try{
            const {token} = req.headers;
            const {user_id} = JWT.VERIFY(token);
          const {post, reaction} = req.body;
          if(!post){
            throw new Error(`Post majburiy!`)
          }else if(!reaction){
            throw new Error(`Reaksiya majburiy`)
          }
             const newReactionToPost = await Reaction.create({user : user_id,post , reaction})
             res.send({
                status : 201,
                message : `Reaksiya qo'shildi postga`,
                success : true,
                data : newReactionToPost
             })
        }catch(error){
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

    static async editReactionToPost(req, res){
        try {
            const {token} = req.headers;
            const {user_id} = JWT.VERIFY(token);
            const {id} = req.params;
            if(!id){
                throw new Error(`Paramsdan id yuborishingiz kerak!!!`)
            }
            const check = await Reaction.findById(id);
            if(check == null){
                throw new Error(`Reaksiya topilmadi!`)
            }
            if(check.user != user_id){
                throw new Error(`Siz faqat o'zingizni reaksiyangizni o'zgartira olasiz!`)
            }
            const {reaction} = req.body;
            if(!reaction){
                throw new Error(`Reaksiya!!!`)
            }
            const updatedReaction = await Reaction.findByIdAndUpdate(id, {reaction}, {new : true})
            res.send({
                status : 200,
                message : `Reaksiya muvofaqqiyatli o'zgartirildi`,
                success : true,
                data : updatedReaction
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })   
        }
    }
    static async deleteReactionToPost(req, res){
        try {
            const {id}= req.params;
            const {token} = req.headers;
            const {user_id} = JWT.VERIFY(token);
            if(!id){
                throw new Error(`Paramsdan id yuborishingiz kerak!!!`)
            }
            const check = await Reaction.findById(id);
            if(check == null){
                throw new Error(`Reaksiya topilmadi!`)
            }
            if(check.user != user_id){
                throw new Error(`Siz faqat o'zingizni reaksiyangizni o'chira olasiz!`)
            }
            const deletedReaction = await Reaction.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : `Reaksiya muvofaqqiyatli o'chirildi`,
                success : true,
                data : deletedReaction
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