import Posts from '../schemas/posts.schema.js'

export class PostsContr{
    constructor(){}
    static async GetPosts(req, res){
        try {
            const {id} = req.params;
            if(id){
                const check = await Posts.findById(id);
                if(check == null){
                    throw new Error(`Post topilmadi!`)
                }
                                res.send({
                    status : 200,
                    message : `${id} - post`,
                    success : true,
                    data : await Posts.findById(id).populate('files').populate('gif').populate('likedUsers')
                })
            }
            else{
         
                res.send({
                    status : 200,
                    message : `Barcha postlar`,
                    success: true,
                    data : await Posts.find().populate('files').populate('gif').populate('likedUsers').sort({createdAt : -1})
                })
            }
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
        const  {title, gif, hashtag, files} = req.body;
        const newPost = await Posts.create({title, gif, hashtag, files});
        res.send({
            status : 200,
            message : `Post muvofaqqiyatli qo'shildi`,
            success : true,
            data : newPost
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
        const {title} = req.body;
        if(!title ){
            throw new Error(`Malumot yuboring!`)
        }
        const check = await Posts.findById(id);
        if(check == null){
            throw new Error(`Post topilmadi!`)
        }
        const updated = await Posts.findByIdAndUpdate(id, {title}, {new : true})
        res.send({
            status : 200,
            message : `Post muvofaqqiyatli o'zgartirildi`,
            success : true,
            data : updated
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
        const check = await Posts.findById(id);
        if(check == null){
            throw new Error(`Post topilmadi!`)
        }
        const deletedPost = await Posts.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Post muvofaqqiyatli o'chirildi`,
            success : true,
            data : deletedPost
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