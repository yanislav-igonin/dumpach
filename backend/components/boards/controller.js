const { Section, Board } = require('../../db/models');

class Controller {
  static async list(ctx) {
    try {
      const sections = await Section.findAll({
        include: [Board],
      });

      ctx.body = { data: sections };
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Controller;
