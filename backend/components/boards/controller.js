const { Section, Board } = require('../../db/models');

class Controller {
  static async get(ctx) {
    const sections = await Section.findAll({
      include: [Board],
    });

    ctx.body = { data: sections };
  }
}

module.exports = Controller;
