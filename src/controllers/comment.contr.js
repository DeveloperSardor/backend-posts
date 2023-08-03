import Comments from '../schemas/comments.js'
import Posts from '../schemas/posts.schema.js'
import { JWT } from '../utils/jwt.js';

export class CommentsContr{
    constructor(){}
    static async GetComments(req, res){
        try {
            const {post_id} = req.params;
            const checkPost = await Posts.findById(post_id);
            if(checkPost == null){
                throw new Error(`Post topilmadi!`)
            }
             const foundComment = await Comments.find({post : post_id}).populate('gif').populate('emoji').populate('user')
             res.send({
                status : 200,
                message : `Commentlar`,
                success : true,
                data : foundComment
             })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

    static async AddComment(req, res){
        try {
            const {token} = req.headers;
            const {user_id} = JWT.VERIFY(token)
            const {title, content_link, content_type, emoji, user, gif, post} = req.body;
            if(!post){
                throw new Error(`Post majburiy!`)
            }
            const newComment = await Comments.create({title, content_link, content_type, emoji, user : user_id, gif, post })
            res.send({
                status : 201,
                message : `Comment muvofaqqiyatli qo'shildi`,
                success : true,
                data : newComment
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

  static async PutComment(req, res){
    try {
        const {token} = req.headers;
        const {user_id} = JWT.VERIFY(token);
        const {id} = req.params;
        if(!id){
            throw new Error(`Paramsdan id jo'natishingiz kerak!`)
        }
        const check = await Comments.findById(id);
        if(check == null){
            throw new Error(`Comment topilmadi!`)
        }
        if(check.user != user_id){
            throw new Error(`Siz faqat o'zingizni commentingizni o'zgartira olasiz!`)
        }
        const {title} = req.body;
        const updatedComment = await Comments.findByIdAndUpdate(id, {title}, {new : true})
        res.send({
            status : 200,
            message : `Comment muvofaqqiyatli o'zgartirildi!`,
            success : true,
            data : updatedComment
        })        
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }

  static async deleteComment(req, res){
    try {
        const {id} = req.params;
        const {token} = req.headers;
        const {user_id} = JWT.VERIFY(token)
        if(!id){
            throw new Error(`Paramsdan id jo'natishingiz kerak!`)
        }
        const check = await Comments.findById(id);
        if(check == null){
            throw new Error(`Comment topilmadi!`)
        }
        if(check.user != user_id){
            throw new Error(`Siz faqat o'zingizning commentingizni o'chira olasiz!`)
        }
        const deleted_comment = await Comments.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Comment muvofaqqiyatli o'chirildi`,
            success : true,
            data : deleted_comment
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