const { Section, Board } = require('../../db').models;

class Repository {
  constructor() {
    this.sectionModel = Section;
    this.model = Board;
  }

  findBoards() {
    const { model, sectionModel } = this;

    return sectionModel.findAll({
      include: [model],
    });
  }

  findBoard(boardId) {
    const { model } = this;

    return model.findOne({
      where: { id: boardId },
    });
  }
}

module.exports = Repository;
