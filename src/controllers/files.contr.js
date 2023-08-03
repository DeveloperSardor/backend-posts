import Files from '../schemas/files.schema.js'

export class FilesContr{
    constructor(){}
  
    static async PostFile(req, res){
        try {
           const {path_file, type_file} = req.body;
           if(!path_file){
            throw new Error(`Fayl linki majburiy!`)
           }else if(!type_file){
            throw new Error(`Fayl tipi majburiy`)
           }
           const newFile = await Files.create({path_file, type_file});
           res.send({
            status : 201,
            message : `Yangi fayl muvofaqqiyatli qo'shildi`,
            success : true,
            data : newFile
           })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

    static async DeleteFile(req, res){
        try {
            const {id} = req.params;
            if(!id){
                throw new Error(`Paramsdan id jonatish kerak!`)
            }
            const findFile = Files.findById(id);
            if(findFile == null){
                throw new Error(`File topilmadi`)
            }
            const deleteFile = await Files.findByIdAndDelete(id);
            res.send({
                status:200,
                message : `Muvofaqqiyatli o'chirildi`,
                success : true,
                data : deleteFile
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