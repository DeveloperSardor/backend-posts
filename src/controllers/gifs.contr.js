import Gifs from "../schemas/gifs.schema.js";

export class GifsContr {
  constructor() {}
  static async Get(req, res) {
    try {
      const findGifs = await Gifs.find();
      res.send({
        status: 200,
        message: `Giflar`,
        success: true,
        data: findGifs,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Post(req, res) {
    try {
      const { video_link } = req.body;
      if (!video_link) {
        throw new Error(`Video Link majburiy!`);
      }
      const newGif = await Gifs.create({ video_link });
      res.send({
        status: 200,
        message: `Gif muvofaqqiyatli qo'shildi!`,
        success: true,
        data: newGif,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Delete(req, res) {
    try {
      const { id } = req.params;
      const check = await Gifs.findById(id);
      if (check == null) {
        throw new Error(`Gif topilmadi!`);
      }
      const deletedGif = await Gifs.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Gif muvofaqqiyatli o'chirildi!`,
        success: true,
        data: deletedGif,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
}
