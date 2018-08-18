const { Section, Board } = require('../models');

module.exports = {
  async list() {
    try {
      const sections = await Section.findAll({
        include: [{ model: Board }],
      });

      return sections;
    } catch (err) {
      throw new Error(err);
    }
  },
};
