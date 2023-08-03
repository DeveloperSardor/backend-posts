import Users from "../schemas/users.schema.js";
import { JWT } from "../utils/jwt.js";
import Posts from '../schemas/posts.schema.js'

export class UsersContr {
  constructor() {}
  static async Register(req, res) {
    try {
      const { username, name, email, password, gender, avatar } = req.body;
      if (!username) {
        throw new Error(`Username majburiy!`);
      } else if (!name) {
        throw new Error(`Ism majburiy`);
      } else if (!email) {
        throw new Error(`Email majburiy`);
      } else if (!password) {
        throw new Error(`Parol majburiy!`);
      } else if (!gender) {
        throw new Error(`Gender majburiy!`);
      }
      const checkEmail = await Users.findOne({email});
      if(checkEmail!= null){
        throw new Error(`Bu email band!`)
      }
      const checkUsername = await Users.findOne({username});
      if(checkUsername!= null){
        throw new Error(`Bu username band!`)
      }
      const newUser = await Users.create({
        username,
        name,
        email,
        password,
        gender,
        isAdmin : false,
        avatar: avatar
          ? avatar
          : gender == "male"
          ? `https://mir-cdn.behance.net/v1/rendition/project_modules/max_3840/1285eb171058963.64684abf424f8.png`
          : `https://www.clipartmax.com/png/full/287-2878229_medium-image-female-avatar-png.png`,
      });
      res.send({
        status: 201,
        message: `Muvafaqqiyatli ro'yxatdan o'tdingiz!`,
        success: true,
        token:  JWT.SIGN(newUser._id),
        data: newUser,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async Login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error(`Email majburiy!`);
      } else if (!password) {
        throw new Error(`Parol majburiy`);
      }
      const findUser = await Users.findOne({ email, password });
      if (findUser == null) {
        throw new Error(`Foydalanuvchi topilmadi!`);
      }
      res.send({
        status: 200,
        message: `Muvofaqqiyatli kirdingiz!`,
        success: true,
        data: findUser,
        token: JWT.SIGN(findUser._id),
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async Get(req, res) {
    try {
      const { id } = req.params;
      const { search, gender } = req.query;
      const keyword = search
        ? {
            $or: [
              { username: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { name: { $regex: search, $options: "i" } },
              { gender: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      if (search) {
        const searchResult = await Users.find(keyword);
        res.send({
          status: 200,
          message: `Qidiruv natijasi`,
          success: true,
          data: searchResult,
        });
      } else if (id) {
        const findById = await Users.findById(id);
        if (findById == null) {
          throw new Error(`Foydalanuvchi topilmadi!`);
        }
        res.send({
          status: 200,
          message: `Foydalanuvchi malumotlari`,
          success: true,
          data: findById,
        });
      } else {
        res.send({
          status: 200,
          message: `Barcha foydalanuvchilar`,
          success: true,
          data: await Users.find(),
        });
      }
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async GetMyProfile(req, res){
    try {
        const {token} = req.headers;
        if(!token){
            throw new Error(`Token yuboring!`)
        }
        const {user_id} = JWT.VERIFY(token);
        const findUser = await Users.findById(user_id);
        if(findUser == null){
            throw new Error(`Foydalanuvchi topilmadi!`)
        }
        res.send({
            status : 200,
            message : `Profil`,
            success : true,
            data : findUser
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message,
            success: false,
          });
    }
  }

  static async LikePost (req, res){
    try {
      const {token} = req.headers;
      const {user_id} = JWT.VERIFY(token);
      const {id} = req.params;
      const checkExists = await Posts.findById(id);
      if(checkExists == null){
        throw new Error(`Post topilmadi`)
      }
      const addedLike = await Posts.findByIdAndUpdate(id, {$push : {likedUsers : user_id}}, {new : true})
      await Users.findByIdAndUpdate(user_id, {$push : {likedPost : id}})
      res.send({
        status : 200,
        message : 'like bosildi!',
        success : true,
        data : addedLike
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async DeleteLikePost (req, res){
    try {
      const {token} = req.headers;
      const {user_id} = JWT.VERIFY(token);
      const {id} = req.params;
      const checkExists = await Posts.findById(id);
      if(checkExists == null){
        throw new Error(`Post topilmadi`)
      }
      const deletedLike = await Posts.findByIdAndUpdate(id, {$pull : {likedUsers : user_id}}, {new : true})
      await Users.findByIdAndUpdate(user_id, {$pull : {likedPost : id}})
      res.send({
        status : 200,
        message : 'like qaytarib olindi!',
        success : true,
        data : deletedLike
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async EditMyProfile(req, res){
    try {
        const {token} = req.headers;
        if(!token){
            throw new Error(`Token yuboring!`)
        }
        const {name, username, email, gender, avatar, bio} = req.body;
        if(!name && !username && !email && !gender && !avatar && !bio){
            throw new Error(`Malumot yubormadingiz!`)
        }
        const {user_id} = JWT.VERIFY(token);
        const findUser = await Users.findById(user_id);
        if(findUser == null){
            throw new Error(`Foydalanuvchi topilmadi!`)
        }
        const updatedProfile = await Users.findByIdAndUpdate(user_id, {name, username, email, gender, avatar, bio}, {new : true});
        res.send({
            status : 200,
            message : `Successfuly updated`,
            success : true,
            data : updatedProfile
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message,
            success: false,
          });
    }
}
}


